package com.sds.playpoll.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sds.playpoll.domain.entity.Survey;
import com.sds.playpoll.domain.entity.Answer;

@Repository
public interface AnswerRepository extends CrudRepository<Answer, Long>{
	
	List<Answer> findBySurvey(Survey surveyId);

	@Modifying
	@Transactional
	@Query("delete from Answer a where a.survey = ?1")
	void deleteBySurveyId(Survey survey);
}
