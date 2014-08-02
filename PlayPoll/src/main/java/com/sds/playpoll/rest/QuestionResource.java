package com.sds.playpoll.rest;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sds.playpoll.domain.entity.Survey;
import com.sds.playpoll.service.QuestionService;
import com.sds.playpoll.service.SurveyService;

@Component
@Path("/question")
public class QuestionResource {
	
	static final Logger LOG = LoggerFactory.getLogger(QuestionResource.class);
	
	@Autowired
	private SurveyService surveyService;
	
	@Autowired
	private QuestionService questionService;
	
	@GET
	@Path("/populate")
	@Produces(MediaType.APPLICATION_JSON)
	public String populate() {
		surveyService.populatePoll();
		return "Done!";
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Survey> polls() {
		return (List<Survey>) surveyService.getSurveys();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Survey getPoll(@PathParam("id") String id) {
		return surveyService.getSurvey(id);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Survey postPoll(Survey poll) {
		return surveyService.saveSurvey(poll);
	}
	
	@PUT
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Survey putPoll(Survey poll) {
		return surveyService.saveSurvey(poll);
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteQuestion(@PathParam("id") Long id) {
		questionService.deleteQuestion(id);;
	}
	
}
