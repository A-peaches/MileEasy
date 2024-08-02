package com.kbstar.mileEasy.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8090", "http://localhost:8080", "http://digicampus01.cafe24.com"
                ,"http://210.114.18.177:8090")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 정적 리소스 처리
        registry.addResourceHandler(
                        "/img/**",
                        "/notice/**",
                        "/document/**",
                        "/miledetail/**",
                        "/badge/**",
                        "/mileScore/**",
                        "/profile/**"
                )
                .addResourceLocations(
                        "classpath:/static/img/",
                        "classpath:/static/notice/",
                        "classpath:/static/document/",
                        "classpath:/static/miledetail/",
                        "classpath:/static/badge/",
                        "classpath:/static/mileScore/",
                        "classpath:/static/profile/"
                )
                .setCachePeriod(3600)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());

        // 기타 모든 요청에 대한 처리 (SPA 라우팅을 위함)
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(resourcePath);
                        return requestedResource.exists() && requestedResource.isReadable() ? requestedResource
                                : new ClassPathResource("/static/index.html");
                    }
                });
    }





    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
    }

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.setUseTrailingSlashMatch(true);
    }
}