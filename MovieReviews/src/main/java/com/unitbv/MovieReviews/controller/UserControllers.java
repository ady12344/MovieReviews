package com.unitbv.MovieReviews.controller;

import com.unitbv.MovieReviews.model.dto.AddUserDTO;
import com.unitbv.MovieReviews.model.dto.LoginUserDTO;
import com.unitbv.MovieReviews.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
@Log4j2
@RequiredArgsConstructor
@RestController

public class UserControllers {
    private final UserService userService;

    @PostMapping("/api/v1/addUser")
    public ResponseEntity<AddUserDTO> addUser(@RequestBody AddUserDTO userDTO) {
        return userService.addUser(userDTO);
    }
    @PostMapping("/api/v1/login")
    public ResponseEntity<Void> login(@RequestBody LoginUserDTO loginUserDTO) {

        return userService.loginUser(loginUserDTO);
    }
}
