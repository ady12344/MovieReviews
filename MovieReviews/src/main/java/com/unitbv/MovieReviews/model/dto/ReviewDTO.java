package com.unitbv.MovieReviews.model.dto;

import lombok.Data;

@Data
public class ReviewDTO {
    private Long movieId;
    private String comment;
    private int rating;
}
