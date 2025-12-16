package com.edu.connect.infrastructure.adapter.storage;

import com.edu.connect.application.port.out.vacancy.FileStoragePort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Component
public class LocalFileStorageAdapter implements FileStoragePort {

    private static final String UPLOAD_DIR = "uploads/vacancies";

    public LocalFileStorageAdapter() {
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory", e);
        }
    }

    @Override
    public String uploadPdf(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        try {
            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".")
                    ? originalFilename.substring(originalFilename.lastIndexOf("."))
                    : ".pdf";
            String filename = UUID.randomUUID().toString() + extension;

            // Save file
            Path filepath = Paths.get(UPLOAD_DIR, filename);
            Files.copy(file.getInputStream(), filepath, StandardCopyOption.REPLACE_EXISTING);

            // Return URL or path
            return "/uploads/vacancies/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }
}
