package com.sds.playpoll.domain.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sds.playpoll.domain.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{
	
	public User findByUsername(String username);

}
