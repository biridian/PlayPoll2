package com.sds.playpoll.rest;

import java.security.Principal;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.sds.playpoll.domain.entity.Question;
import com.sds.playpoll.domain.entity.Survey;
import com.sds.playpoll.domain.entity.User;
import com.sds.playpoll.service.QuestionService;
import com.sds.playpoll.service.SurveyService;
import com.sds.playpoll.service.UserService;

@Component
@Path("/survey")
public class SurveyResource {
	
	static final Logger LOG = LoggerFactory.getLogger(SurveyResource.class);
	
	@Autowired
	private SurveyService surveyService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private JavaMailSenderImpl mailSender;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Survey> getSurveys(Principal principal) {
		LOG.debug("{}", principal);
		
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		List<Survey> surveys = (List<Survey>) surveyService.getSurveysByUser(user);
		return surveys;
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Survey postSurvey(Survey poll) {
		return surveyService.saveSurvey(poll);
	}
	
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	public Survey putSurvey(Survey poll) {
		return surveyService.saveSurvey(poll);
	}
	
	@GET
	@Path("/{surveyId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Survey getSurvey(@PathParam("surveyId") String surveyId) {
		return surveyService.getSurvey(surveyId);
	}
	
	@DELETE
	@Path("/{surveyId}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteSurvey(@PathParam("surveyId") String surveyId) {
		surveyService.deleteSurvey(surveyId);
	}
	
	@DELETE
	@Path("/{surveyId}/question/{questionId}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteQuestion(@PathParam("surveyId") String surveyId, @PathParam("questionId") Long questionId)  {
		questionService.deleteQuestion(questionId);
	}
	
	@GET
	@Path("/user")
	@Produces(MediaType.APPLICATION_JSON)
	public User getUser(@QueryParam("username") String username) {
		return userService.loadUserByUsername(username);
	}
	
	@GET
	@Path("/{surveyId}/question")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Question> getSurveyQuestions(@PathParam("surveyId") String surveyId) {
		return questionService.getQuestionsForSurvey(surveyId);
	}
	
	@POST
	@Path("/{surveyId}/question")
	@Produces(MediaType.APPLICATION_JSON)
	public Question postSurveyQuestion(@PathParam("surveyId") String id, Question question)  {
		return questionService.saveQuestion(id, question);
	}

	@GET
	@Path("/{surveyId}/question/{questionId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Question getSurveyQuestion(@PathParam("surveyId") String surveyId, @PathParam("questionId") Long questionId)  {
		return questionService.getQuestionForSurvey(surveyId, questionId);
	}
	
	@POST
	@Path("/{surveyId}/send")
	@Consumes("application/x-www-form-urlencoded")
	public void sendSurveyByEmail(@Context HttpServletRequest request , @PathParam("surveyId") String surveyId, @FormParam("email") String email) {
	    final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
	    MimeMessageHelper message;
		try {
			message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
		    message.setSubject("PlayPoll에서 설문 요청이 도착했습니다.");
		    message.setFrom("ssa.ajp7@gmail.com");
		    message.setTo(email);
		   
		    String actionUrl = request.getScheme() + "://" + request.getServerName() +
		    	(request.getServerPort() == 80 || request.getServerPort() == 443 ? "" : ":" + request.getServerPort()) +
		    	"/request/" + surveyId;
		    // Create the HTML body using Thymeleaf
//		    final String htmlContent = this.templateEngine.process("email-inlineimage.html", ctx);
		    message.setText("<h2>PlayPoll 설문 요청에 답변해주세요!</h2><br/><a href=\"" + actionUrl + "\">" + actionUrl + "</a>", true); // true = isHtml
		 
		    // Add the inline image, referenced from the HTML code as "cid:${imageResourceName}"
//		    final InputStreamSource imageSource = new ByteArrayResource(imageBytes);
//		    message.addInline(imageResourceName, imageSource, imageContentType);
			
		    mailSender.send(mimeMessage);
		} catch (MessagingException e) {
			e.printStackTrace();
		} // true = multipart
	}
	
}
