package com.peer.missionpeerflow.service;

import com.peer.missionpeerflow.dto.request.NewQuestionDto;
import com.peer.missionpeerflow.dto.response.QuestionDetailDto;
import com.peer.missionpeerflow.dto.response.QuestionDto;
import com.peer.missionpeerflow.entity.Question;
import com.peer.missionpeerflow.repository.QuestionRepository;
import com.peer.missionpeerflow.util.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    private Specification<Question> search(String keyword) {
        return new Specification<Question>() {
            @Override
            public Predicate toPredicate(Root<Question> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                return criteriaBuilder.like(root.get("title"), "%" + keyword + "%");
            }
        };
    }

    public Question findQuestion(Long questionId) {
        Optional<Question> questionOptional = this.questionRepository.findById(questionId);
        if (questionOptional.isEmpty()) {
            throw new RuntimeException();
        }
        return questionOptional.get();
    }

    public Page<QuestionDto> getAllByCategory(String category, String sortAttribute, int pageIndex, int pageSize) {

        Pageable pageable = PageRequest.of(pageIndex, pageSize, Sort.by(Sort.Direction.DESC, sortAttribute));
        Page<Question> questions;
        if (category.isEmpty()) {
            questions = this.questionRepository.findAll(pageable);
        } else {
            Category categoryType = Category.ofType(category);
            questions = this.questionRepository.findAllByCategory(pageable, categoryType);
        }
        return questions.map(QuestionDto::new);
    }

    public Page<QuestionDto> searchByTitle(String title, String sortAttribute) {

        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, sortAttribute));
        Specification<Question> specification = search(title);
        Page<Question> questions = this.questionRepository.findAll(specification, pageable);
        return questions.map(QuestionDto::new);
    }

    public void postQuestion(NewQuestionDto newQuestion) {
        Question question = newQuestion.toQuestion();
        this.questionRepository.save(question);
    }

    @Transactional
    public QuestionDetailDto getQuestionDetail(Long questionId) {
        Question question = findQuestion(questionId);
        question.setRecommend(question.getRecommend() + 1L);
        return new QuestionDetailDto(question);
    }

    @Transactional
    public void putQuestion(Long questionId, NewQuestionDto newQuestion) {
        Question question = findQuestion(questionId);
        newQuestion.updateQuestion(question);
        this.questionRepository.save(question);
    }

    @Transactional
    public void deleteQuestion(Long questionId, String password) {
        Question question = findQuestion(questionId);
        if (!password.equals(question.getPassword())) {
            throw new RuntimeException("패스워드가 일치하지 않습니다.");
        }
        this.questionRepository.delete(question);
    }
}