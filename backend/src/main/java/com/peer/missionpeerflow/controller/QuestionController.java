package com.peer.missionpeerflow.controller;

import com.peer.missionpeerflow.dto.response.QuestionDto;
import com.peer.missionpeerflow.exception.NotFoundException;
import com.peer.missionpeerflow.service.QuestionService;
import com.peer.missionpeerflow.util.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/v1")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    private String getSortAttribute(String sort) {
        switch(sort) {
            case "lastest":
                return "createdAt";
            case "views":
                return "view";
            case "recommends":
                return "recommend";
            default:
                throw new NotFoundException("존재하지 않는 정렬방식입니다.");
        }
    }

    @GetMapping
    @ResponseBody
    public Page<QuestionDto> getMainPage(@RequestParam(defaultValue = "minishell") String category,
                                         @RequestParam(defaultValue = "lastest") String sort,
                                         @RequestParam(defaultValue = "0") int pageIndex,
                                         @RequestParam(defaultValue = "10") int pageSize) {

        Category categoryType = Category.ofType(category);
        String sortAttribute = getSortAttribute(sort);
        return this.questionService.getAllByCategory(categoryType, sortAttribute, pageIndex, pageSize);
    }

    @GetMapping("/search")
    @ResponseBody
    public Page<QuestionDto> search(@RequestParam String title,
                                    @RequestParam String sort) {

        String sortAttribute = getSortAttribute(sort);
        return this.questionService.searchByTitle(title, sortAttribute);
    }

}
