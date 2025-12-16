package com.edu.connect.application.port.out.notification;

public interface EmailSenderPort {
    void sendEmail(String to, String subject, String body);
}
