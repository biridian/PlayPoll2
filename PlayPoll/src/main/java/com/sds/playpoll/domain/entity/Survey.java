package com.sds.playpoll.domain.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"questions"})
@Entity
public class Survey {

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private String surveyId;
	
	@Column(nullable = false)
    private String title;
    
    private String description;
    
    @Column(nullable = false)
    private String status;
    
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "survey")
    @Cascade({CascadeType.SAVE_UPDATE, CascadeType.DELETE})
    private List<Question> questions;
    
    @CreatedBy
    @ManyToOne
    @JoinColumn(name = "create_by", updatable = false)
    private User createdBy;
    
    @CreatedDate
    @Column(updatable = false)
    private Date createdDate;
    
    @LastModifiedDate
    private Date lastModifiedDate;
    
    public Survey() {
    }
    
    public Survey(String surveyId) {
    	this.surveyId = surveyId;
    }
    
	public Survey(String title, String description) {
		super();
		this.title = title;
		this.description = description;
		this.status = "draft";
	}

	public String getSurveyId() {
		return surveyId;
	}

	public void setSurveyId(String surveyId) {
		this.surveyId = surveyId;
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
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdUser) {
		this.createdBy = createdUser;
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

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}
	
	public List<Question> getQuestions() {
		return questions;
	}

	@Override
	public String toString() {
		return "Survey [surveyId=" + surveyId + ", title=" + title + ", description=" + description + ", status=" + status + ", questions=" + questions + ", createdBy=" + createdBy + ", createdDate=" + createdDate + ", lastModifiedDate=" + lastModifiedDate + "]";
	}
	
}
