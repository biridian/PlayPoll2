package com.sds.playpoll.domain.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"survey"})
@Entity
public class Question {

	public enum QuestionType {
		TEXT, PARAGRAPH_TEXT, MULTIPLE_CHOICE, CHECKBOXES, DROPDOWN
	}
	
	@Id
	@GeneratedValue
	private Long questionId;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "survey_id", nullable = false)
	private Survey survey;
	
    private String title;
    
    private String description;
    
    @Enumerated(EnumType.STRING)
    private QuestionType type;
    
    private String options;
    
    @CreatedBy
    @ManyToOne
    @JoinColumn(name = "created_by", updatable = false)
    private User createdBy;
    
    @CreatedDate
    @Column(updatable = false)
    private Date createdDate;
    
    @LastModifiedDate
    private Date lastModifiedDate;

	public Long getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Long id) {
		this.questionId = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public QuestionType getType() {
		return type;
	}

	public void setType(QuestionType type) {
		this.type = type;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User user) {
		this.createdBy = user;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	public Survey getSurvey() {
		return survey;
	}

	public void setSurvey(Survey survey) {
		this.survey = survey;
	}

	public String getOptions() {
		return options;
	}

	public void setOptions(String options) {
		this.options = options;
	}

	@Override
	public String toString() {
		return "Question [questionId=" + questionId + ", survey=" + survey + ", title=" + title + ", description=" + description + ", type=" + type + ", options=" + options + ", createdBy=" + createdBy + ", createdDate=" + createdDate + ", lastModifiedDate=" + lastModifiedDate + "]";
	}

}
