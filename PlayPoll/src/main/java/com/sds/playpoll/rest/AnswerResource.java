package com.sds.playpoll.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sds.playpoll.domain.entity.Answer;
import com.sds.playpoll.service.AnswerService;
import com.sds.playpoll.service.QuestionService;
import com.sds.playpoll.service.SurveyService;

@Component
@Path("/answer")
public class AnswerResource {

	static final Logger LOG = LoggerFactory.getLogger(AnswerResource.class);

	static final ObjectMapper MAPPER = new ObjectMapper();

	@Autowired
	private SurveyService surveyService;

	@Autowired
	private QuestionService questionService;

	@Autowired
	private AnswerService answerService;

	@GET
	@Path("{surveyId}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Map<String, Object>> getAnswersBySurvey(@PathParam("surveyId") String surveyId) throws IOException {
		List<Map<String, Object>> answers = new ArrayList<>();

		for (Answer answer : answerService.getAnswersBySurvey(surveyId)) {
			Map<String, Object> answerMap = new HashMap<>();
			answerMap.put("answerId", answer.getAnswerId());
			answerMap.put("createdDate", answer.getCreatedDate());

			String resultString = answer.getResult();
			answerMap.put("result", resultString != null ? MAPPER.readValue(resultString, new TypeReference<HashMap<String, Object>>() {}) : null);
			answers.add(answerMap);
		}

		return answers;
	}

}
