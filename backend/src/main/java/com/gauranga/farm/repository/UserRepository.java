package com.gauranga.farm.repository;

import com.gauranga.farm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailOrMobile(String email, String mobile);
    Optional<User> findByEmailAndMobile(String email, String mobile);
    boolean existsByEmail(String email);
    boolean existsByMobile(String mobile);
}
