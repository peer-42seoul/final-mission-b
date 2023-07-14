package com.peer.missionpeerflow.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionIdentifyDto {

    private String type = "question";
    private String password;
}
