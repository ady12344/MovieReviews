package com.unitbv.MovieReviews.model.dto;

import jakarta.annotation.Nonnull;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddUserDTO {
    @Nonnull
    private String email;
    @Nonnull
    private String username;
    @Nonnull
    private String password;

}
