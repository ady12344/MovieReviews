package com.unitbv.MovieReviews.service;

import com.unitbv.MovieReviews.model.dto.ChangePasswordDTO;
import com.unitbv.MovieReviews.model.dto.UserProfilDTO;
import com.unitbv.MovieReviews.model.entities.User;
import com.unitbv.MovieReviews.model.dto.AddUserDTO;
import com.unitbv.MovieReviews.model.dto.LoginUserDTO;
import com.unitbv.MovieReviews.model.entities.UserSecurity;
import com.unitbv.MovieReviews.repositories.UserRepository;
import lombok.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.Authenticator;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
@Log4j2
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;
    @Autowired
    @Lazy
    private AuthenticationManager authenticationManager;
    public ResponseEntity<AddUserDTO> addUser(AddUserDTO addUserDTO) {
        User user = User.builder().username(addUserDTO.getUsername())
                .password(passwordEncoder.encode(addUserDTO.getPassword()))
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
    public ResponseEntity<Void> loginUser(LoginUserDTO loginUserDTO) {
        try{
            Authentication authenticationRequest = new UsernamePasswordAuthenticationToken(loginUserDTO.getUsername(), loginUserDTO.getPassword());
            Authentication authenticationResponse = authenticationManager.authenticate(authenticationRequest);
            SecurityContextHolder.getContext().setAuthentication(authenticationResponse);
            return ResponseEntity.ok().build();

        }
        catch(AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    public String getCurrentUser() {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            return authentication.getName();

        }catch (Exception e) {
            return null;
        }

    }

    public UserProfilDTO getUserByUsername(String username){
        User user = userRepository.findUserByUsername(username).get();
        if(userRepository.findByUsername(username).isPresent()) {
            UserProfilDTO userProfilDTO = UserProfilDTO.builder().username(user.getUsername()).email(user.getEmail()).build();
            return userProfilDTO;
        }else
            return null;
    }

    public boolean changePassword(String oldPassword, String newPassword) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
        if(!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return false;
        }
        userRepository.updatePassword(passwordEncoder.encode(newPassword), username);
        return true;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return new UserSecurity(user);

    }
}
