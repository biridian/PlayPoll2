package com.sds.playpoll.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sds.playpoll.domain.entity.Question;
import com.sds.playpoll.domain.entity.Survey;
import com.sds.playpoll.domain.entity.Answer;
import com.sds.playpoll.domain.entity.User;
import com.sds.playpoll.service.QuestionService;
import com.sds.playpoll.service.AnswerService;
import com.sds.playpoll.service.SurveyService;
import com.sds.playpoll.service.UserService;


import org.springframework.security.authentication.encoding.Md5PasswordEncoder;


@Controller
@RequestMapping("/")
public class HomeController {

	static final Logger LOG = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	private SurveyService surveyService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private AnswerService surveyAnswerService;
	
	@Autowired
	private JavaMailSenderImpl mailSender;
	
	@RequestMapping("")
	public String main(Map<String, Object> model) {
		return "home";
	}
	
	@RequestMapping("request/{surveyId}")
	public String reqeust(Map<String, Object> model, @PathVariable String surveyId) {
		model.put("survey", surveyService.getSurvey(surveyId));
		
		ObjectMapper mapper = new ObjectMapper();
		
		List<Map<String, Object>> questions = new ArrayList<>();
		for (Question q : questionService.getQuestionsForSurvey(surveyId)) {
			Map<String, Object> m = new HashMap<>();
			m.put("createdBy", q.getCreatedBy());
			m.put("createdDate", q.getCreatedDate());
			m.put("description", q.getDescription());
			m.put("lastModifiedDate", q.getLastModifiedDate());
			m.put("questionId", q.getQuestionId());
			m.put("title", q.getTitle());
			m.put("type", q.getType());

			String options = q.getOptions();
			
			if (options != null) {
				try {
					m.put("options", mapper.readValue(options, new TypeReference<ArrayList<HashMap<String, Object>>>(){}));
				} catch (IOException e) {
					LOG.error("json read error", e);
				}
			} else {
				m.put("options", null);
			}
			
			questions.add(m);
		}
		
		model.put("questions", questions);
		
		return "request";
	}
	
	@RequestMapping(value = "response/{surveyId}", consumes = { "application/x-www-form-urlencoded" })
	public String response(Map<String, Object> model, @RequestBody MultiValueMap<String, String> param, @PathVariable String surveyId) {
		model.put("survey", surveyService.getSurvey(surveyId));
		
		Map<String, Object> resultMap = new HashMap<>();
		
		for (String key : param.keySet()) {
			resultMap.put(key, StringUtils.collectionToCommaDelimitedString(param.get(key)));
		}
		
		ObjectMapper mapper = new ObjectMapper();
		
		String result = "";
		try {
			result = mapper.writeValueAsString(resultMap);
		} catch (JsonProcessingException e) {
			LOG.error("json write error", e);
		}

		Survey survey = new Survey();
		survey.setSurveyId(surveyId);
		
		Answer answer = new Answer();
		answer.setSurvey(survey);
		answer.setResult(result);
		surveyAnswerService.saveSurvey(answer);
		
		return "response";
	}
	

	@RequestMapping("foo")
	public String foo() {
		throw new RuntimeException("Expected exception in controller");
	}
	
	@RequestMapping("login")
	public String login() {
		return "login";
	}
	
	@RequestMapping(value = "csrf", method = RequestMethod.GET)
	public String csrf() {
		return "csrf";
	}
	
	@RequestMapping("join")
	public String join(Map<String, Object> model) {
		
		return "join";
	}
	
	@RequestMapping("samples/email")
	@ResponseBody
	public String email(@RequestParam String to) {
		LOG.info("{}", mailSender);
		
	    // Prepare message using a Spring helper
	    final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
	    MimeMessageHelper message;
		try {
			message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
		    message.setSubject("PlayPoll에서 설문 요청이 도착했습니다.");
		    message.setFrom("ssa.ajp7@gmail.com");
		    message.setTo(to);
		 
		    // Create the HTML body using Thymeleaf
//		    final String htmlContent = this.templateEngine.process("email-inlineimage.html", ctx);
		    message.setText("test!!!!!!", true); // true = isHtml
		 
		    // Add the inline image, referenced from the HTML code as "cid:${imageResourceName}"
//		    final InputStreamSource imageSource = new ByteArrayResource(imageBytes);
//		    message.addInline(imageResourceName, imageSource, imageContentType);
			
		    mailSender.send(mimeMessage);
		} catch (MessagingException e) {
			e.printStackTrace();
		} // true = multipart
	
		return "Done";
	}
	
	@RequestMapping(value="join/user", method = RequestMethod.POST)
	public String joinUser(@RequestParam String email, @RequestParam String password , Map<String, Object> model) {
		
		User user = new User();
		user.setUsername(email);
		Md5PasswordEncoder encoder = new Md5PasswordEncoder();
	    String hashedPass = encoder.encodePassword(password, null);
		
		user.setPassword(hashedPass);
		
		System.out.println(user.toString());
		
		userService.makeUser(user);
		
		return "redirect:/";
	}

}
