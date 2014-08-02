package com.sds.playpoll.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sds.playpoll.domain.entity.Survey;
import com.sds.playpoll.domain.entity.User;
import com.sds.playpoll.domain.repository.SurveyRepository;

@Service
public class SurveyService {
	
	static final Logger LOG = LoggerFactory.getLogger(SurveyService.class);
	
	@Autowired
	protected SurveyRepository surveyRepository;
	
	public Iterable<Survey> getSurveys() {
		return surveyRepository.findAll();
	}
	
	public Iterable<Survey> getSurveysByUser(User user) {
		return surveyRepository.findByCreatedBy(user);
	}

	public Survey getSurvey(String id) {
		return surveyRepository.findOne(id);
	}
	
	public Survey saveSurvey(Survey survey) {
		return surveyRepository.save(survey);
	}
	
	public void deleteSurvey(String id) {
		surveyRepository.delete(id);
	}
	
	public void populatePoll() {
		surveyRepository.save(new Survey("Poll-1", "It's the first poll."));
		surveyRepository.save(new Survey("Poll-2", "It's the second poll."));
		surveyRepository.save(new Survey("Poll-3", "It's the third poll."));
	}

}
