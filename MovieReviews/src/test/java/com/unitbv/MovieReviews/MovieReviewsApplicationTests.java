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
		String filePath = "src/test/resources/Movies_with_Random_Directors.csv";
		try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
			List<String[]> rows = reader.readAll();
			List<Movie> movies = new ArrayList<>();

			for (int i = 1; i <= 1000 && i < rows.size(); i++) {
				String[] row = rows.get(i);

				Movie movie = new Movie();
				movie.setTitle(row[1]);
				movie.setDescription(row[2]);
				movie.setAuthor(row[9]);
				movie.setRelease_date(row[0]);
				movie.setCover_url(row[8]);
				movie.setRating(Float.parseFloat(row[5]));
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
