package com.peer.missionpeerflow.service;

import com.peer.missionpeerflow.dto.request.QuestionPostDto;
import com.peer.missionpeerflow.dto.request.QuestionPutDto;
import com.peer.missionpeerflow.dto.response.QuestionDetailDto;
import com.peer.missionpeerflow.dto.response.QuestionListElementDto;
import com.peer.missionpeerflow.entity.Question;
import com.peer.missionpeerflow.exception.PasswordWrongException;
import com.peer.missionpeerflow.repository.QuestionRepository;
import com.peer.missionpeerflow.util.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final PasswordEncoder passwordEncoder;

    private Specification<Question> search(String keyword) {

        return (root, query, criteriaBuilder) -> {
            query.distinct(true);
            return criteriaBuilder.like(root.get("title"), "%" + keyword + "%");
        };
    }

    private Question findQuestion(Long questionId) {

        Optional<Question> questionOptional = this.questionRepository.findById(questionId);
        if (questionOptional.isEmpty()) {
            throw new RuntimeException();
        }
        return questionOptional.get();
    }

    public Page<QuestionListElementDto> getListByCategory(String category, String sortAttribute, int pageIndex, int pageSize) {

        Pageable pageable = PageRequest.of(pageIndex, pageSize, Sort.by(Sort.Direction.DESC, sortAttribute));
        Page<Question> questions;
        if (category.isEmpty()) {
            questions = this.questionRepository.findAll(pageable);
        } else {
            Category categoryType = Category.ofType(category);
            questions = this.questionRepository.findAllByCategory(pageable, categoryType);
        }
        return questions.map(QuestionListElementDto::new);
    }

    public Page<QuestionListElementDto> searchByTitle(String title, String sortAttribute) {

        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, sortAttribute));
        Specification<Question> specification = search(title);
        Page<Question> questions = this.questionRepository.findAll(specification, pageable);
        return questions.map(QuestionListElementDto::new);
    }

    public void post(QuestionPostDto questionPost) {

        String endcodePassword = passwordEncoder.encode(questionPost.getPassword());
        questionPost.setPassword(endcodePassword);
        Question question = questionPost.toQuestion();
        this.questionRepository.save(question);
    }

    public QuestionDetailDto getDetail(Long questionId) {

        Question question = findQuestion(questionId);
        question.setView(question.getView() + 1L);
        return new QuestionDetailDto(question);
    }

    public void modify(Long questionId, QuestionPutDto questionPut) {

        Question question = findQuestion(questionId);
        if (!question.getNickname().equals(questionPut.getNickname()) ||
            !passwordEncoder.matches(questionPut.getPassword(), question.getPassword())) {
            throw new PasswordWrongException();
        }
        questionPut.toQuestion(question);
        this.questionRepository.save(question);
    }

    public void delete(Long questionId, String password) {

        Question question = findQuestion(questionId);
        if (!passwordEncoder.matches(password, question.getPassword())) {
            throw new PasswordWrongException();
        }
        this.questionRepository.delete(question);
    }

    public void like(Long questoinId) {

        Question question = findQuestion(questoinId);
        question.setRecommend(question.getRecommend() + 1L);
        this.questionRepository.save(question);
    }
}