package com.unitbv.MovieReviews.model.dto;

import jakarta.annotation.Nonnull;
import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfilDTO {
    @Nonnull
    private String username;
    @Nonnull
    private String email;
}
