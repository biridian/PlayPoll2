package com.sds.playpoll;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.sds.playpoll.domain.entity.Question;
import com.sds.playpoll.domain.entity.Survey;
import com.sds.playpoll.domain.repository.QuestionRepository;
import com.sds.playpoll.domain.repository.SurveyRepository;
import com.sds.playpoll.service.QuestionService;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
public class SurveyRepositoryTests {

	static final Logger LOG = LoggerFactory.getLogger(SurveyRepositoryTests.class);
	
    @Autowired
    SurveyRepository surveyRepository;
    
    @Autowired
    QuestionRepository questionRepository;
    
    @Autowired
	private QuestionService questionService;
    
    @Test
	public void testNewSurvey() throws Exception {
    	Survey survey = new Survey();
    	survey.setSurveyId("1");
    	survey.setTitle("Survey1");
    	survey.setDescription("설문 설명");
		surveyRepository.save(survey);
		
		Assert.assertEquals("Survey1", surveyRepository.findOne("1").getTitle());
	}
    
    @Test
	public void testNewQuestions() throws Exception {
    	Question q = new Question();
    	q.setQuestionId(1L);
    	q.setTitle("질문1");
    	questionRepository.save(q);
		
		Assert.assertEquals("질문1", questionRepository.findOne(1L).getTitle());
	}
    
    @Test
	public void testSurveyWithQuestions() throws Exception {
    	Survey survey = new Survey();
    	survey.setTitle("설문1");
    	survey.setDescription("설문 설명");
    	surveyRepository.save(survey);
    	
    	Survey survey1 = new Survey();
    	survey1.setSurveyId("1");
    	
    	Question q = new Question();
    	q.setQuestionId(2L);
    	q.setTitle("질문1");
//    	q.setSurvey(survey1);
    	questionRepository.save(q);
    	
    	LOG.info("" +  surveyRepository.findOne("1"));
    	
		//Assert.assertEquals("질문1", surveyRepository.findOne(1L).getQuestions(). .getTitle());
	}
    
    @Test
	public void testServiceSurveyWithQuestions() throws Exception {
    	
    	Survey survey = new Survey();
    	survey.setTitle("설문1");
    	survey.setDescription("설문 설명");
    	surveyRepository.save(survey);
		
    	
    	Question q = new Question();
    	q.setTitle("질문1");
    	questionService.saveQuestion("1", q);

    	Question q2 = new Question();
    	q2.setTitle("질문2");
    	questionService.saveQuestion("1", q2);
    	
		Assert.assertEquals(2, surveyRepository.findOne("1").getQuestions().size());
	}

}