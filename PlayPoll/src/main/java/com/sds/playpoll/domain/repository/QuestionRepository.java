package com.sds.playpoll.domain.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sds.playpoll.domain.entity.Question;

@Repository
public interface QuestionRepository extends CrudRepository<Question, Long>{

}
