package com.unitbv.MovieReviews.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponseDTO {
    private String comment;
    private int rating;
    private LocalDateTime createdAt;
    private String username;
}
