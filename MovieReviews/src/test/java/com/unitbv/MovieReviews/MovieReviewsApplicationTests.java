package com.unitbv.MovieReviews;

import com.opencsv.CSVReader;
import com.unitbv.MovieReviews.model.entities.Movie;
import com.unitbv.MovieReviews.repositories.MovieRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class MovieReviewsApplicationTests {
	@Autowired
	private MovieRepository movieRepository;

	@Test
	void importFirst20MoviesFromCSV() {
		String filePath = "src/test/resources/Movies_with_Random_Directors.csv"; // move your CSV here
		try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
			List<String[]> rows = reader.readAll();
			List<Movie> movies = new ArrayList<>();

			for (int i = 1; i <= 1000 && i < rows.size(); i++) {
				String[] row = rows.get(i);

				Movie movie = new Movie();
				movie.setTitle(row[1]);         // Series_Title
				movie.setDescription(row[2]);   // Overview
				movie.setAuthor(row[9]);        // Director
				movie.setRelease_date(row[0]);  // Released_Year
				movie.setCover_url(row[8]);     // Poster_Link
				movie.setRating(Float.parseFloat(row[5])); // IMDB_Rating
				movie.setGenre(row[7]);

				movies.add(movie);
			}

			movieRepository.saveAll(movies);
		} catch (Exception e) {
			e.printStackTrace();
			assert false : "Import failed with exception: " + e.getMessage();
		}
	}
}
