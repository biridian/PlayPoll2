package com.sds.playpoll.domain.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.CreatedDate;

@Entity
public class Answer implements Serializable {

	private static final long serialVersionUID = -2658832873055581322L;

	@Id
	@GeneratedValue
	private Long answerId;

	/**
	 * 설문 답변에 해당하는 설문 식별자
	 */
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "survey_id", nullable = false)
	private Survey survey;
	
	/**
	 * 설문 답변 결과 (JSON string 형태로 저장)
	 */
	private String result;
	
    @CreatedDate
    @Column(updatable = false)
    private Date createdDate;

	public Long getAnswerId() {
		return answerId;
	}

	public void setAnswerId(Long answerId) {
		this.answerId = answerId;
	}
	
	public Survey getSurvey() {
		return survey;
	}

	public void setSurvey(Survey survey) {
		this.survey = survey;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	@Override
	public String toString() {
		return "SurveyAnswer [answerId=" + answerId + ", survey=" + survey + ", result=" + result + ", createdDate=" + createdDate + "]";
	}
	
}
