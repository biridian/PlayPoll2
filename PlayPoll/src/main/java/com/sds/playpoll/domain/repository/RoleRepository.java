package com.sds.playpoll.domain.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sds.playpoll.domain.entity.Role;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long>{

}
