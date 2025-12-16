package com.edu.connect.application.port.out.vacancy;

import org.springframework.web.multipart.MultipartFile;

public interface FileStoragePort {

        String uploadPdf(MultipartFile file);
}
