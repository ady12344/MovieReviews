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
public class AddMovieDTO {
    @Nonnull
    private String title;
    @Nonnull
    private String description;
    @Nonnull
    private String author;
    @Nonnull
    private String release_date;
    @Nonnull
    private String cover_url;
}
