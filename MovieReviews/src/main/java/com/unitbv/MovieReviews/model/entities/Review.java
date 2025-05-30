package com.unitbv.MovieReviews.model.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "review_table")
public class Review {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Movie movie;

    @Column(columnDefinition = "TEXT")
    private String comment;

    private int rating;

    private LocalDateTime createdAt;

    @ManyToOne
    private User user;
}
