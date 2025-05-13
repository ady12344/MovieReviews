package com.unitbv.MovieReviews.model.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "movie_table")
public class Movie {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    private String author;
    private String release_date;
}
