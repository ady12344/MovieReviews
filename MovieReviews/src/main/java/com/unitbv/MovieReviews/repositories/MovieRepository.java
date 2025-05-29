package com.unitbv.MovieReviews.repositories;

import com.unitbv.MovieReviews.model.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNullApi;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    Optional<Movie> findByTitle(String title);
    Optional<Movie> findById(Long id);
    Optional<Movie> findByAuthor(String author);
    Optional<Movie> findByTitleAndAuthor(String title, String author);
    Optional<List<Movie>> findAllByGenreContaining(String genre);
}
