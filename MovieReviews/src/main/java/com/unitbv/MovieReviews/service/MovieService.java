package com.unitbv.MovieReviews.service;

import com.unitbv.MovieReviews.model.dto.AddMovieDTO;
import com.unitbv.MovieReviews.model.dto.EditMovieDTO;
import com.unitbv.MovieReviews.model.dto.MovieDTO;
import com.unitbv.MovieReviews.model.dto.RemoveMovieDTO;
import com.unitbv.MovieReviews.model.entities.Movie;
import com.unitbv.MovieReviews.repositories.MovieRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
@Log4j2
public class MovieService {
    private final MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public ResponseEntity<EditMovieDTO> editMovie(EditMovieDTO editMovieDTO) {
        Optional<Movie> movie = movieRepository.findByTitleAndAuthor(editMovieDTO.getCurrentTitle(), editMovieDTO.getCurrentAuthor());
        if (movie.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        movie.get().setTitle(editMovieDTO.getNewTitle());
        movie.get().setDescription(editMovieDTO.getNewDescription());
        movie.get().setAuthor(editMovieDTO.getNewAuthor());
        movie.get().setRelease_date(editMovieDTO.getNewRelease_date());
        movie.get().setCover_url(editMovieDTO.getNewCover_url());
        movieRepository.save(movie.get());
        return new ResponseEntity<>(editMovieDTO, HttpStatus.OK);
    }

    public ResponseEntity<AddMovieDTO> addMovie(AddMovieDTO addMovieDTO) {
        Movie movie = Movie.builder().title(addMovieDTO.getTitle()).
                description(addMovieDTO.getDescription())
                .author(addMovieDTO.getAuthor())
                .release_date(addMovieDTO.getRelease_date())
                .cover_url(addMovieDTO.getCover_url())
                .build();
        if(movieRepository.findByAuthor(movie.getAuthor()).isPresent() && movieRepository.findByTitle(movie.getTitle()).isPresent()) {
            return new ResponseEntity<>(addMovieDTO, HttpStatus.FOUND);
        }
        if(movie.getTitle().isEmpty() || movie.getAuthor().isEmpty() || movie.getRelease_date().isEmpty() || movie.getCover_url().isEmpty()) {
            return new ResponseEntity<>(addMovieDTO, HttpStatus.BAD_REQUEST);
        }
        movieRepository.save(movie);
        return new ResponseEntity<>(addMovieDTO, HttpStatus.CREATED);
    }

    public ResponseEntity<RemoveMovieDTO> deleteMovieByTitleAndAuthor(RemoveMovieDTO removeMovieDTO) {
        Optional<Movie> movie = movieRepository.findByTitleAndAuthor(
                removeMovieDTO.getTitle(),
                removeMovieDTO.getAuthor()
        );
        if (movie.isEmpty()) {
            return new ResponseEntity<>(removeMovieDTO, HttpStatus.BAD_REQUEST);
        }

        movieRepository.delete(movie.get());

        return new ResponseEntity<>(removeMovieDTO, HttpStatus.OK);
    }

    public List<MovieDTO> getMoviesByGenre(String genre) {
        List<Movie> movies = movieRepository.findByGenre(genre);
        return movies.stream().map(this::convertToDTO).toList(); // convertToDTO should map Movie to MovieDTO
    }

    private MovieDTO convertToDTO(Movie movie) {
        return new MovieDTO(movie.getTitle(), movie.getAuthor(), movie.getDescription(), movie.getRelease_date(), movie.getCover_url());
    }

}
