package com.edu.connect.infrastructure.notification;

import com.edu.connect.application.port.out.notification.EmailSenderPort;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.Map;

public class AppsScriptEmailSenderAdapter implements EmailSenderPort {

    private final RestTemplate restTemplate;
    private final String scriptUrl;

    public AppsScriptEmailSenderAdapter(RestTemplate restTemplate, String scriptUrl) {
        this.restTemplate = restTemplate;
        this.scriptUrl = scriptUrl;
    }

    @Override
    public void sendEmail(String to, String subject, String body) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> payload = new HashMap<>();
            payload.put("email", to);
            payload.put("subject", subject);
            payload.put("htmlBody", body);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(payload, headers);

            restTemplate.postForEntity(scriptUrl, request, String.class);
            System.out.println("Email sent via Apps Script to: " + to);
        } catch (Exception e) {
            System.err.println("Failed to send email via Apps Script: " + e.getMessage());
        }
    }
}
