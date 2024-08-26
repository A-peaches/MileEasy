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

    @Value("target.jpg")
    private String ImagePath;

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

    // 각 수신자에게 맞춤형 메시지를 발송하는 메서드
    public void sendSmsAction(String to, String text, String mile) {
        try {

            // mile 값 로그로 출력
            logger.info("Mile value: {}", mile);


            // 메시지 생성
            Message message = new Message();
            message.setFrom(fromNumber); // 발신자 번호 설정
            message.setTo(to);           // 수신자 번호 설정
            message.setText(new String(text.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8)); // 메시지 내용 설정

            // 메시지 유형 설정 (SMS, LMS, MMS)
            if (text.length() > 90) {
                message.setType(MessageType.LMS); // LMS로 설정
                message.setSubject(mile + "마일리지 알림");
            } else {
                message.setType(MessageType.SMS); // SMS로 설정
            }

            // 이미지 경로 설정 (target_sms.PNG가 uploadPathRoot 디렉토리에 있다고 가정)
            String fullImagePath = getFullImagePath(ImagePath);
            logger.info("Full image path: {}", fullImagePath); // 이미지 경로 확인 로그

            // 이미지가 첨부될 경우, MMS로 처리
            File imageFile = new File(fullImagePath);
            if (imageFile.exists()) {
                message.setType(MessageType.MMS); // MMS로 설정
                String encodedText = new String(text.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);
                determineType(message, encodedText, mile, fullImagePath); // 이미지가 포함된 메시지로 처리
                logger.info("Image attached: {}", fullImagePath);
            } else {
                logger.warn("Image not found at path: {}", fullImagePath); // 이미지가 없을 경우 경고 출력
            }

            // 메시지 발송
            SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
            logger.info("Sent to {}: {}", to, response.toString());
        } catch (Exception e) {
            logger.error("Error sending to {}: {}", to, e.getMessage());
            throw new RuntimeException("Failed to send message to " + to, e);
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

    private void determineType(Message message, String text, String mile, String imagePath) {
        int textLength = text.length();
        boolean isOverSmsLimit = textLength > SMS_KOREAN_LIMIT ||
                (textLength > SMS_ENGLISH_LIMIT && text.matches("\\A\\p{ASCII}*\\z"));

        if (imagePath != null && !imagePath.isEmpty()) {
            Properties(message, mile, imagePath);
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

    private void Properties(Message message, String mile, String imagePath) {
        logger.debug("Mile value: {}", mile);  // mile 값이 제대로 전달되는지 확인
        try {
            FileSystemResource resource = new FileSystemResource(imagePath);
            File imageFile = resource.getFile();
            String imageId = messageService.uploadFile(imageFile, StorageType.MMS, null);
            message.setImageId(imageId);
            message.setType(MessageType.MMS);
            if(mile != null && mile.equals("site")) {
                message.setSubject(mile + " 마일리지 알림");
            } else {
                logger.warn("Mile is null or does not match 'site'");
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