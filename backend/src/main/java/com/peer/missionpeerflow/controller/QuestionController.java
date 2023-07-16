package com.peer.missionpeerflow.controller;

import com.peer.missionpeerflow.dto.request.QuestionDeleteDto;
import com.peer.missionpeerflow.dto.request.QuestionPostDto;
import com.peer.missionpeerflow.dto.request.QuestionPutDto;
import com.peer.missionpeerflow.dto.response.QuestionDetailDto;
import com.peer.missionpeerflow.dto.response.QuestionListElementDto;
import com.peer.missionpeerflow.exception.NotFoundException;
import com.peer.missionpeerflow.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> create(@RequestBody QuestionPostDto newQuestion) {
        this.questionService.post(newQuestion);
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }

    @GetMapping("/question/{questionId}")
    @ResponseBody
    public QuestionDetailDto showDetail(@PathVariable("questionId") Long questionId) {
        return this.questionService.getDetail(questionId);
    }

    @PutMapping("/question/{questionId}")
    public ResponseEntity<String> modify(@PathVariable("questionId") Long questionId,
                          @RequestBody QuestionPutDto questionPut) {
        this.questionService.modify(questionId, questionPut);
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }

    @PostMapping("/question/{questionId}")
    public ResponseEntity<String> delete(@PathVariable("questionId") Long questionId,
                          @RequestBody QuestionDeleteDto questionDelete) {
        this.questionService.delete(questionId, questionDelete.getPassword());
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }

    @PutMapping("/question/recommend/{questionId}")
    public ResponseEntity<String> like(@PathVariable("questionId") Long questionId) {
        this.questionService.like(questionId);
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }
}
