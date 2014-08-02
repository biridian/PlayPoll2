package com.sds.playpoll.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sds.playpoll.domain.entity.Question;
import com.sds.playpoll.domain.entity.Survey;
import com.sds.playpoll.domain.repository.QuestionRepository;
import com.sds.playpoll.domain.repository.SurveyRepository;

@Service
public class QuestionService {
	
	@Autowired
	protected QuestionRepository questionRepository;

	@Autowired
	protected SurveyRepository surveyRepository;
	
	public Question saveQuestion(String surveyId, Question question) {
		Survey survey = new Survey();
		survey.setSurveyId(surveyId);
		question.setSurvey(survey);
		
		return questionRepository.save(question);
	}
	
	public void deleteQuestion(Long id) {
		questionRepository.delete(id);
	}
	
	public Question getQuestion(Long id) {
		return questionRepository.findOne(id);
	}
	
	public List<Question> getQuestionsForSurvey(String surveyId) {
		return surveyRepository.findOne(surveyId).getQuestions();
	}
	
	public Question getQuestionForSurvey(String surveyId, Long questionId) {
		List<Question> questions = getQuestionsForSurvey(surveyId);
		
		for (Question question : questions) {
			if (question.getQuestionId() == questionId) {
				return question;
			}
		}
		
		return null;
	}
	
}
