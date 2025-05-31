package com.unitbv.MovieReviews.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unitbv.MovieReviews.model.dto.*;
import com.unitbv.MovieReviews.service.MovieService;
import com.unitbv.MovieReviews.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.unitbv.MovieReviews.model.dto.ReviewResponseDTO;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/")

public class MovieControllers {

    private final MovieService movieService;
    private final ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/getAllMovies")
    public ResponseEntity<Page<MovieDTO>> getMovies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<MovieDTO> moviePage = movieService.getAllMovies(pageable);
        return ResponseEntity.ok(moviePage);
    }

    @PutMapping("/editMovie")
    public ResponseEntity<EditMovieDTO> editMovie(@RequestBody EditMovieDTO editMovieDTO) {
        return movieService.editMovie(editMovieDTO);
    }

    @PostMapping("/addMovie")
    public ResponseEntity<AddMovieDTO> addMovie(@RequestBody AddMovieDTO addMovieDTO){
        return movieService.addMovie(addMovieDTO);
    }

    @PostMapping("/removeMovie")
    public ResponseEntity<RemoveMovieDTO> removeMovie(@RequestBody RemoveMovieDTO removeMovieDTO){
        return movieService.deleteMovieByTitleAndAuthor(removeMovieDTO);
    }

    @GetMapping("/getMoviesByGenre")
    public ResponseEntity<Page<MovieDTO>> getMoviesByGenre(
            @RequestParam("genre") String genre,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<MovieDTO> moviePage = movieService.getMoviesByGenre(genre, pageable);
        return ResponseEntity.ok(moviePage);
    }

    @GetMapping("/getMovieById")
    public ResponseEntity<MovieDTO> getMoviesById(@RequestParam Long id) {
        return movieService.getMovieById(id);
    }

    @Autowired
    private ReviewService reviewService;
    @PostMapping("/addReview")
    public ResponseEntity<?> addReview(@RequestBody ReviewDTO review) {
        reviewService.addReview(review);
        return ResponseEntity.ok("Review submitted successfully");
    }

    @GetMapping("/getReviewsByMovie")
    public ResponseEntity<?> getReviewsByMovie(@RequestParam Long movieId) {
        return ResponseEntity.ok(reviewService.getReviewsForMovie(movieId));
    }


    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewResponseDTO>> getReviews(@RequestParam Long movieId) {
        return ResponseEntity.ok(reviewService.getReviewsForMovie(movieId));
    }

    @GetMapping("/searchMoviesByTitle")
    public ResponseEntity<Page<MovieDTO>> searchMoviesByTitle(
            @RequestParam String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {
        return ResponseEntity.ok(movieService.searchMoviesByTitle(title, page, size));
    }


    @GetMapping("/userReviewsPaged")
    public ResponseEntity<Page<ReviewResponseDTO>> getUserReviewsPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(reviewService.getReviewsByCurrentUserPaged(PageRequest.of(page, size)));
    }

    @DeleteMapping("/deleteReview/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReviewById(reviewId);
        return ResponseEntity.ok("Review deleted successfully");
    }


}
