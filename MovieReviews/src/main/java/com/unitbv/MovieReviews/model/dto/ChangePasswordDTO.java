package com.unitbv.MovieReviews.model.dto;

import jakarta.annotation.Nonnull;
import lombok.Data;

@Data

public class ChangePasswordDTO {
    @Nonnull
    private String oldPassword;
    @Nonnull
    private String newPassword;
}
