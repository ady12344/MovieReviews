package com.unitbv.MovieReviews.repositories;

import com.unitbv.MovieReviews.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
     Optional<User> findByUsername(String username);
     Optional<User> findByEmail(String email);
     Optional<User> findUserByUsernameAndPassword(String username, String password);
     Optional<User> findUserByUsername(String username);
     @Modifying
     @Transactional
     @Query("UPDATE User u SET u.password = :newPassword WHERE u.username = :username")
     void updatePassword(@Param("newPassword") String password , @Param("username") String username);

}
