package com.sds.playpoll.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sds.playpoll.domain.entity.User;
import com.sds.playpoll.domain.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {
	
	static final Logger LOG = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	protected UserRepository userRepository;
	
	@Override
	public User loadUserByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findByUsername(username);
	}

	public User makeUser(User user) {
		LOG.debug("UserService makeUser");
		System.out.println("UserService makeUser : "+user.toString());
		
		return userRepository.save(user);
	}

}
