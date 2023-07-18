package com.peer.missionpeerflow.dto.response;

import com.peer.missionpeerflow.entity.Question;
import lombok.*;

@Getter
@Setter
public class QuestionListElementDto {

    private long questionId;
    private long recommend;
    private long view;
    private int answerCount;
    private String title;
    private String content;
    private String category;
    private String createAt;
    private String nickname;

    @Builder
    public QuestionListElementDto(Question question) {
        this.questionId  = question.getQuestionId();
        this.recommend = question.getRecommend();
        this.view = question.getView();
        this.answerCount = question.getAnswerList().size();
        this.title = question.getTitle();
        this.content = question.getContent();
        this.category = String.valueOf(question.getCategory());
        this.createAt = question.getCreatedAt().toString();
        this.nickname = question.getNickname();
    }
}
