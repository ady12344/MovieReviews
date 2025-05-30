package com.unitbv.MovieReviews.repositories;

import com.unitbv.MovieReviews.model.entities.Review;
import com.unitbv.MovieReviews.model.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByMovieId(Long movieId);
    //List<Review> findByUser(User user);\
    Page<Review> findByUser(User user, Pageable pageable);
}
