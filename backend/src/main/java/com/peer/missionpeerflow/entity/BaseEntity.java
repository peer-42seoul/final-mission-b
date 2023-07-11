package com.peer.missionpeerflow.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.Lob;
import javax.persistence.MappedSuperclass;

@Data
@MappedSuperclass
@EnableJpaAuditing
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {
	@Column(nullable = false, columnDefinition = "VARCHAR(10)")
	protected String nickname;

	@Column(nullable = false, columnDefinition = "VARCHAR(10)")
	protected String password;

	@Column(nullable = false)
	protected String content;

	@CreatedDate
	@Column(nullable = false)
	protected LocalDateTime createdAt;

	@LastModifiedDate
	protected LocalDateTime updatedAt;
}
