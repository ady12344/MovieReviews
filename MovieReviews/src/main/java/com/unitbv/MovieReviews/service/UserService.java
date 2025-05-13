package com.unitbv.MovieReviews.service;

import com.unitbv.MovieReviews.model.entities.User;
import com.unitbv.MovieReviews.model.dto.AddUserDTO;
import com.unitbv.MovieReviews.model.dto.LoginUserDTO;
import com.unitbv.MovieReviews.repositories.UserRepository;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public ResponseEntity<AddUserDTO> addUser(AddUserDTO addUserDTO) {
        User user = User.builder().username(addUserDTO.getUsername())
                .password(addUserDTO.getPassword())
                .email(addUserDTO.getEmail())
                .build();
        if(userRepository.findByEmail(user.getEmail()).isPresent() ||
        userRepository.findByUsername(user.getUsername()).isPresent()) {
            return new ResponseEntity<>(addUserDTO, HttpStatus.FOUND);
        }
        if(user.getEmail().isEmpty() || user.getUsername().isEmpty() || user.getPassword().isEmpty()) {
            return new ResponseEntity<>(addUserDTO, HttpStatus.BAD_REQUEST);
        }
        userRepository.save(user);
        return new ResponseEntity<>(addUserDTO, HttpStatus.CREATED);
    }
    public ResponseEntity<LoginUserDTO> loginUser(LoginUserDTO loginUserDTO) {
        if(userRepository.findUserByUsernameAndPassword(loginUserDTO.getUsername(), loginUserDTO.getPassword()).isPresent()) {
            return new ResponseEntity<>(loginUserDTO, HttpStatus.OK);
        }
        return new ResponseEntity<>(loginUserDTO, HttpStatus.UNAUTHORIZED);
    }

}