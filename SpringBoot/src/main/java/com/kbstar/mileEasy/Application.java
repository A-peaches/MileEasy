package com.kbstar.mileEasy;

import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.util.Arrays;

@SpringBootApplication
@MapperScan("com.kbstar.mileEasy.mapper")
public class Application {

    @Value("${project.uploadpath.root}")
    private String uploadPath;


    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        logger.trace("TRACE 로그 메시지");
        logger.debug("DEBUG 로그 메시지");
        logger.info("INFO 로그 메시지");
        logger.warn("WARN 로그 메시지");
        logger.error("ERROR 로그 메시지");

        ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
        String[] activeProfiles = context.getEnvironment().getActiveProfiles();
        logger.info("Active profiles: " + Arrays.toString(activeProfiles));
    }
}