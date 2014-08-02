package com.sds.playpoll.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.sds.playpoll.domain.entity.User;

@Service
public class SpringSecurityAuditorAware implements AuditorAware<User> {

	static final Logger LOG = LoggerFactory.getLogger(SpringSecurityAuditorAware.class);
	
	public User getCurrentAuditor() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		if (authentication == null || !authentication.isAuthenticated()) {
			return null;
		}
		
		return (User) authentication.getPrincipal();
	}
	
}