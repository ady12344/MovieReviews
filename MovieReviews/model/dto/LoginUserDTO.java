package com.unitbv.MovieReviews.model.dto;

import jakarta.annotation.Nonnull;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginUserDTO {
    @Nonnull
    private String username;
    @Nonnull
    private String password;
}
