package com.peer.missionpeerflow.dto.request;

import com.peer.missionpeerflow.entity.Question;
import com.peer.missionpeerflow.util.Category;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class QuestionPostDto {

    String title;
    String nickname;
    String password;
    String category;
    String content;
    LocalDateTime createAt = LocalDateTime.now();

    public Question toQuestion() {
        Question question = new Question();
        question.setTitle(this.getTitle());
        question.setContent(this.getContent());
        question.setNickname(this.getNickname());
        question.setPassword(this.getPassword());
        question.setCategory(Category.ofType(this.getCategory()));
        question.setCreatedAt(this.getCreateAt());
        return question;
    }
}
