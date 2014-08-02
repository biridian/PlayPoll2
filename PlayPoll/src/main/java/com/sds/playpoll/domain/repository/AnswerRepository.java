package com.sds.playpoll.domain.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sds.playpoll.domain.entity.Survey;
import com.sds.playpoll.domain.entity.Answer;

@Repository
public interface AnswerRepository extends CrudRepository<Answer, Long>{
	
	List<Answer> findBySurvey(Survey surveyId);

}
