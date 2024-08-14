package com.kbstar.mileEasy.service;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import net.nurigo.sdk.message.model.MessageType;
import net.nurigo.sdk.message.model.StorageType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class SmsService {

    private static final Logger logger = LoggerFactory.getLogger(SmsService.class);
    private static final int SMS_KOREAN_LIMIT = 45;
    private static final int SMS_ENGLISH_LIMIT = 90;

    private final DefaultMessageService messageService;

    @Value("${coolsms.from.number}")
    private String fromNumber;

    @Value("${project.uploadpath.root}")
    private String uploadPathRoot;

    @Value("${sms.default.image}")
    private String defaultImagePath;

    public SmsService(@Value("${coolsms.api.key}") String apiKey,
                      @Value("${coolsms.api.secret}") String apiSecret) {
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
    }

    public void sendSms(List<String> to, String text, String mile) {
        for (String recipient : to) {
            Message message = new Message();
            message.setFrom(fromNumber);
            message.setTo(recipient);

            String encodedText = new String(text.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);
            message.setText(encodedText);

            String fullImagePath = getFullImagePath(defaultImagePath);
            determineMessageType(message, encodedText, mile, fullImagePath);

            try {
                SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
                logger.info("Sent to {}: {}", recipient, response.toString());
            } catch (Exception e) {
                logger.error("Error sending to {}: {}", recipient, e.getMessage());
                throw new RuntimeException("Failed to send message", e);
            }
        }
    }

    private String getFullImagePath(String imageName) {
        return uploadPathRoot + File.separator + imageName;
    }

    private void determineMessageType(Message message, String text, String mile, String imagePath) {
        int textLength = text.length();
        boolean isOverSmsLimit = textLength > SMS_KOREAN_LIMIT ||
                (textLength > SMS_ENGLISH_LIMIT && text.matches("\\A\\p{ASCII}*\\z"));

        if (imagePath != null && !imagePath.isEmpty()) {
            setMmsProperties(message, mile, imagePath);
        } else if (isOverSmsLimit) {
            setLmsProperties(message, mile);
        } else {
            message.setType(MessageType.SMS);
        }
    }

    private void setMmsProperties(Message message, String mile, String imagePath) {
        try {
            FileSystemResource resource = new FileSystemResource(imagePath);
            File imageFile = resource.getFile();
            String imageId = messageService.uploadFile(imageFile, StorageType.MMS, null);
            message.setImageId(imageId);
            message.setType(MessageType.MMS);
            if(mile.equals("site")) {
                message.setSubject("MileEasy 운영자 알림");
            } else {
                message.setSubject(mile + " 마일리지 알림");
            }

        } catch (Exception e) {
            logger.error("Error uploading image file: {}", e.getMessage());
            setLmsProperties(message, mile);
        }
    }

    private void setLmsProperties(Message message, String mile) {
        message.setType(MessageType.LMS);
        message.setSubject(mile + "마일리지 알림");
    }
}