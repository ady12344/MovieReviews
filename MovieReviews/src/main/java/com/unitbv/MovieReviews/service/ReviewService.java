package com.unitbv.MovieReviews.service;

import com.unitbv.MovieReviews.model.dto.ReviewDTO;
import com.unitbv.MovieReviews.model.dto.ReviewResponseDTO;
import com.unitbv.MovieReviews.model.entities.Movie;
import com.unitbv.MovieReviews.model.entities.Review;
import com.unitbv.MovieReviews.model.entities.User;
import com.unitbv.MovieReviews.repositories.MovieRepository;
import com.unitbv.MovieReviews.repositories.ReviewRepository;
import com.unitbv.MovieReviews.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MovieRepository movieRepository;
    private final UserService userService;

    @Autowired
    private UserRepository userRepository;

    public void addReview(ReviewDTO dto) {
        Movie movie = movieRepository.findById(dto.getMovieId())
                .orElseThrow(() -> new IllegalArgumentException("Movie not found"));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Review review = Review.builder()
                .movie(movie)
                .comment(dto.getComment())
                .rating(dto.getRating())
                .createdAt(LocalDateTime.now())
                .user(currentUser)
                .build();

        reviewRepository.save(review);
    }



    public List<ReviewResponseDTO> getReviewsForMovie(Long movieId) {
        return reviewRepository.findByMovieId(movieId).stream()
                .map(review -> ReviewResponseDTO.builder()
                        .comment(review.getComment())
                        .rating(review.getRating())
                        .createdAt(review.getCreatedAt())
                        .username(review.getUser() != null ? review.getUser().getUsername() : "Anonymous")
                        .build())
                .collect(Collectors.toList());
    }

  public Page<ReviewResponseDTO> getReviewsByCurrentUserPaged(Pageable pageable) {
      String username = userService.getCurrentUser();
      User user = userRepository.findByUsername(username)
              .orElseThrow(() -> new UsernameNotFoundException("User not found"));

      return reviewRepository.findByUser(user, pageable)
              .map(review -> ReviewResponseDTO.builder()
                      .reviewId(review.getId())
                      .comment(review.getComment())
                      .rating(review.getRating())
                      .createdAt(review.getCreatedAt())
                      .username(user.getUsername())
                      .movieTitle(review.getMovie().getTitle())
                      .build());

  }
    public void deleteReviewById(Long reviewId) {
        String username = userService.getCurrentUser();

        int deletedCount = reviewRepository.deleteByIdAndUsername(reviewId, username);

        if (deletedCount == 0) {
            throw new SecurityException("You are not authorized to delete this review or review does not exist.");
        }
    }



}
