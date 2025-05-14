package com.unitbv.MovieReviews.model.dto;

import jakarta.annotation.Nonnull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class EditMovieDTO {
    @Nonnull
    private String currentTitle;
    @Nonnull
    private String currentAuthor;
    @Nonnull
    private String newTitle;
    @Nonnull
    private String newDescription;
    @Nonnull
    private String newAuthor;
    @Nonnull
    private String newRelease_date;
    @Nonnull
    private String newCover_url;

}
