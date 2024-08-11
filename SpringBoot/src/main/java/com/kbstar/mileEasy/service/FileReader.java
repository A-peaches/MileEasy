package com.kbstar.mileEasy.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class FileReader {

    // 지정된 경로의 파일 내용을 문자열로 읽어 반환합니다.
    public String readFileContent(String filePath) throws IOException {
        File file = new File(filePath);
        if (file.exists()) {
            return new String(Files.readAllBytes(Paths.get(filePath)));
        } else {
            throw new IOException("File not found: " + filePath);
        }
    }
}
