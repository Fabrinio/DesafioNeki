package com.desafioneki.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.desafioneki.domain.model.User;



@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	List<User> findAllByLoginContainingIgnoreCase(String login);
	Optional<User> findByLogin(String login);
}
