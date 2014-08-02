package com.sds.playpoll.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sds.playpoll.domain.entity.Survey;
import com.sds.playpoll.domain.entity.Answer;
import com.sds.playpoll.domain.repository.AnswerRepository;

@Service
public class AnswerService {
	
	static final Logger LOG = LoggerFactory.getLogger(AnswerService.class);
	
	@Autowired
	protected AnswerRepository surveyAnswerRepository;
	
	public Iterable<Answer> getAnswersBySurvey(String surveyId) {
		return surveyAnswerRepository.findBySurvey(new Survey(surveyId));
	}

	public Answer saveSurvey(Answer answer) {
		return surveyAnswerRepository.save(answer);
	}
	
}
