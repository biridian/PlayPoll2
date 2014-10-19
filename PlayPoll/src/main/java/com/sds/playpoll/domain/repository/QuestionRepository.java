package com.sds.playpoll.domain.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sds.playpoll.domain.entity.Question;
import com.sds.playpoll.domain.entity.Survey;

@Repository
public interface QuestionRepository extends CrudRepository<Question, Long>{

	@Modifying
	@Transactional
	@Query("delete from Question q where q.survey = ?1")
	void deleteBySurveyId(Survey survey);
}
