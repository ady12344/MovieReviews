package com.unitbv.MovieReviews.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unitbv.MovieReviews.model.dto.AddMovieDTO;
import com.unitbv.MovieReviews.model.dto.EditMovieDTO;
import com.unitbv.MovieReviews.model.dto.MovieDTO;
import com.unitbv.MovieReviews.model.dto.RemoveMovieDTO;
import com.unitbv.MovieReviews.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.ok(moviePage);  // Return the page with pagination data
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
        return ResponseEntity.ok(moviePage);  // Spring will automatically return totalPages, totalElements, etc.
    }

    @GetMapping("/getMovieById")
    public ResponseEntity<MovieDTO> getMoviesById(@Param("id") Long id) {
        return movieService.getMovieById(id);
    }
}
