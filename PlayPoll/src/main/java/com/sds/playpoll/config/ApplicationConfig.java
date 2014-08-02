package com.sds.playpoll.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.filter.CharacterEncodingFilter;

@Configuration
public class ApplicationConfig {
	
    @Value("${smtp.host}")
    private String smtpHost;

    @Value("${smtp.port}")
    private Integer smtpPort;
    
    @Value("${smtp.username}")
    private String smtpUsername;
    
    @Value("${smtp.password}")
    private String smtpPassword;

    @Bean
    public CharacterEncodingFilter characterEncodingFilter() {
      final CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
      characterEncodingFilter.setEncoding("UTF-8");
      characterEncodingFilter.setForceEncoding(true);
      return characterEncodingFilter;
    }
    
    @Bean
    public JavaMailSenderImpl mailSender() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

        
        
        javaMailSender.setProtocol("smtps");
        javaMailSender.setHost(smtpHost);
        javaMailSender.setPort(smtpPort);
        javaMailSender.setUsername(smtpUsername);
        javaMailSender.setPassword(smtpPassword);

        return javaMailSender;
    }
}
