package com.edu.connect.domain.shared;

import java.time.LocalDateTime;

public interface TimeProviderPort {

    LocalDateTime now();
}
