package com.unitbv.MovieReviews.config;

import com.unitbv.MovieReviews.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final  UserService userService;

   @Bean
   public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
       http
               .csrf(csrf -> csrf.disable())
               .authorizeHttpRequests(auth -> auth
                       .requestMatchers("/api/v1/addUser", "/signup.html", "/scripts/**", "/assets/**", "/api/v1/login", "/login.html").permitAll()
                       .anyRequest().authenticated()
               )
               .formLogin(form -> form
                       .loginPage("/login.html")
                       .loginProcessingUrl("/api/v1/login")
                       .defaultSuccessUrl("/index.html", true)
                       .permitAll()
               )
               .logout(logout -> logout
                       .logoutUrl("/api/v1/logout")
                       .logoutSuccessUrl("/login.html")
                       .permitAll()
               )
               .sessionManagement(session -> session
                       .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
               );

       return http.build();
   }

   @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);

        return new ProviderManager(authenticationProvider);
    }




    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
       return this.userService;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}