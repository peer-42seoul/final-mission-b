package com.peer.missionpeerflow.dto.request;

import com.peer.missionpeerflow.entity.Question;
import com.peer.missionpeerflow.util.Category;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class QuestionPutDto {

    String title;
    String nickname;
    String password;
    String category;
    String content;
    LocalDateTime updatedAt = LocalDateTime.now();

    public void toQuestion(Question question) {
        question.setTitle(this.title);
        question.setContent(this.content);
        question.setCategory(Category.ofType(this.category));
        question.setUpdatedAt(this.updatedAt);
    }
}
