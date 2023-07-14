package com.peer.missionpeerflow.controller;

import com.peer.missionpeerflow.dto.request.QuestionPostDto;
import com.peer.missionpeerflow.dto.response.QuestionDetailDto;
import com.peer.missionpeerflow.dto.response.QuestionListElementDto;
import com.peer.missionpeerflow.exception.NotFoundException;
import com.peer.missionpeerflow.service.QuestionService;
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
    public Page<QuestionListElementDto> showMainPage(@RequestParam String category,
                                                    @RequestParam(defaultValue = "lastest") String sort,
                                                    @RequestParam(defaultValue = "0") int pageIndex,
                                                    @RequestParam(defaultValue = "10") int pageSize) {

        String sortAttribute = getSortAttribute(sort);
        return this.questionService.getListByCategory(category, sortAttribute, pageIndex, pageSize);
    }

    @GetMapping("/search")
    @ResponseBody
    public Page<QuestionListElementDto> search(@RequestParam String title,
                                               @RequestParam(defaultValue = "lastest") String sort) {

        String sortAttribute = getSortAttribute(sort);
        return this.questionService.searchByTitle(title, sortAttribute);
    }

    @PostMapping("/question")
    public boolean create(@RequestBody QuestionPostDto newQuestionDto) {
        this.questionService.post((newQuestionDto));
        return true;
    }

    @GetMapping("/question/{questionId}")
    @ResponseBody
    public QuestionDetailDto showDetail(@PathVariable("questionId") Long questionId) {
        return this.questionService.getDetail(questionId);
    }

    @PutMapping("/question/{questionId}")
    public boolean modify(@PathVariable("questionId") Long questionId,
                            @RequestBody QuestionPostDto newQuestion) {
        this.questionService.modify(questionId, newQuestion);
        return true;
    }

    @PostMapping("/question/{questionId}")
    public boolean delete(@PathVariable("questionId") Long questionId,
                               @RequestBody String password) {
        this.questionService.delete(questionId, password);
        return true;
    }

    @PutMapping("/question/recommend/{questionId}")
    public void like(@PathVariable("questionId") Long questionId) {
        this.questionService.like(questionId);
    }
}
