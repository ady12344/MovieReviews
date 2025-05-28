package com.unitbv.MovieReviews.model.dto;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Date;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class MovieDTO {
    @Id
    private String id;
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
    @Nonnull
    private String genre;
    @Nonnull
    private float rating;

}
