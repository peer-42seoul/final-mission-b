package com.peer.missionpeerflow.dto.response;

import com.peer.missionpeerflow.entity.Answer;
import com.peer.missionpeerflow.entity.Question;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class QuestionDetailDto {

    private String type = "question";
    private String category;
    private String nickname;
    private String title;
    private String contnet;
    private String createdAt;
    private String updatedAt = null;
    private Long recommend = 0L;
    private Long view = 0L;
    private List<Answer> answerList;

    public QuestionDetailDto(Question question) {
        this.category = question.getCategory().getType();
        this.nickname = question.getNickname();
        this.title = question.getTitle();
        this.contnet = question.getContent();
        this.createdAt = question.getCreatedAt().toString();
        if (question.getUpdatedAt() != null) {
            this.updatedAt = question.getUpdatedAt().toString();
        }
        this.recommend = question.getRecommend();
        this.view = question.getView();
        this.answerList = question.getAnswerList();
    }
}