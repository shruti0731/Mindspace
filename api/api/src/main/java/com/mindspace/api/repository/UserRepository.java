package com.mindspace.api.repository;

import com.mindspace.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Custom method to find a user by their email
    Optional<User> findByEmail(String email);
}
