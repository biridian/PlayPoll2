package com.sds.playpoll.rest;


import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sds.playpoll.domain.entity.Question;
import com.sds.playpoll.domain.entity.Survey;
import com.sds.playpoll.domain.entity.User;
import com.sds.playpoll.service.QuestionService;
import com.sds.playpoll.service.SurveyService;
import com.sds.playpoll.service.UserService;

@Component
@Path("/join")
public class UserResource {
	
	static final Logger LOG = LoggerFactory.getLogger(SurveyResource.class);
	
	@Autowired
	private SurveyService surveyService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private QuestionService questionService;
	
	@GET
	@Path("/test")
	@Produces(MediaType.APPLICATION_JSON)
	public String test() {
		LOG.trace("This is test!!!");
		LOG.debug("This is test!!!");
		LOG.info("This is test!!!");
		LOG.warn("This is test!!!");
		LOG.error("This is test!!!");
		return "Poll Test!";
	}
	
	@POST
	@Path("/user")
//	@Produces(MediaType.APPLICATION_JSON)
	public String makeUser() {
		LOG.trace("This is test!!!");
		LOG.debug("This is test!!!");
		LOG.info("This is test!!!");
		LOG.warn("This is test!!!");
		LOG.error("This is test!!!");
		return "Poll Test!";
	}
}
	
