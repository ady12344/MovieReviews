package com.unitbv.MovieReviews.model.dto;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class RemoveMovieDTO {
    @Nonnull
    private String title;
    @Nonnull
    private String author;
}
