package com.unitbv.MovieReviews.repositories;

import com.unitbv.MovieReviews.model.entities.Review;
import com.unitbv.MovieReviews.model.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByMovieId(Long movieId);
    Page<Review> findByUser(User user, Pageable pageable);
    @Transactional
    @Modifying
    @Query("DELETE FROM Review r WHERE r.id = :reviewId AND r.user.username = :username")
    int deleteByIdAndUsername(Long reviewId, String username);
}
