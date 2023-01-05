package com.desafioneki.domain.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.desafioneki.domain.model.User;
import com.desafioneki.domain.repository.UserRepository;



@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Transactional
	public List<User> getAll() {
		return userRepository.findAll();
	}

	@Transactional
	public User getById(Integer id) {
		User user = userRepository.findById(id).orElse(null);
		return user;
	}
	
	@Transactional
	public User saveUser(User user) {
	    return userRepository.save(user);
	  }
	
	 @Transactional
	  public User findByLogin(String login) {
	    return userRepository.findByLogin(login).get();
	  }
}
