package com.peer.missionpeerflow.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NewQuestionDto {

    String type = "question";
    String title;
    String nickname;
    String password;
    String category;
    String content;
    LocalDateTime createAt = LocalDateTime.now();
}
