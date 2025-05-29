package com.unitbv.MovieReviews.controller;

import com.unitbv.MovieReviews.model.dto.AddUserDTO;
import com.unitbv.MovieReviews.model.dto.ChangePasswordDTO;
import com.unitbv.MovieReviews.model.dto.LoginUserDTO;
import com.unitbv.MovieReviews.model.dto.UserProfilDTO;
import com.unitbv.MovieReviews.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/api/v1/getCurrentUsername")
    public String getCurrentUsername() {
        return userService.getCurrentUser();
    }
    @GetMapping("/api/v1/getUserByUsername")
    public UserProfilDTO getUserByUsername(@RequestParam String username) {
        return userService.getUserByUsername(username);
    }
    @PostMapping("/api/v1/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO dto) {
        boolean changed = userService.changePassword(dto.getOldPassword(), dto.getNewPassword());
        if (changed) {
            return ResponseEntity.ok("Password changed successfully.");
        } else {
            return ResponseEntity.badRequest().body("Old password is incorrect.");
        }
    }
    @GetMapping("/api/v1/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) throws Exception {
            request.logout();
            return ResponseEntity.ok().build();

    }

}
