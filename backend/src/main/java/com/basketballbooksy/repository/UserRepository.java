package com.basketballbooksy.repository;

import com.basketballbooksy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByGoogleId(String googleId);
}
