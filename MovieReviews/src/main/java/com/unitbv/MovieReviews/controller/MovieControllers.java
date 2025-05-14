package com.unitbv.MovieReviews.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unitbv.MovieReviews.model.dto.AddMovieDTO;
import com.unitbv.MovieReviews.model.dto.EditMovieDTO;
import com.unitbv.MovieReviews.model.dto.MovieDTO;
import com.unitbv.MovieReviews.model.dto.RemoveMovieDTO;
import com.unitbv.MovieReviews.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/")

public class MovieControllers {
    private final MovieService movieService;
    private final ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/getAllMovies")
    public List<MovieDTO> getMovies() {
        return movieService.getAllMovies().stream().map(movie -> mapper.convertValue(movie, MovieDTO.class)).collect(Collectors.toList());
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
}
