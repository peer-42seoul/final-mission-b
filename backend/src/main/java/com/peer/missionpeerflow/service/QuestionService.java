package com.peer.missionpeerflow.service;

import com.peer.missionpeerflow.dto.request.NewQuestionDto;
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

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

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

    public Page<QuestionDto> getAllByCategory(Category category, String sortAttribute, int pageIndex, int pageSize) {

        Pageable pageable = PageRequest.of(pageIndex, pageSize, Sort.by(Sort.Direction.DESC, sortAttribute));
        Page<Question> questions = this.questionRepository.findAllByCategory(pageable, category);
        return questions.map(QuestionDto::new);
    }

    public Page<QuestionDto> searchByTitle(String title, String sortAttribute) {

        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, sortAttribute));
        Specification<Question> specification = search(title);
        Page<Question> questions = this.questionRepository.findAll(specification, pageable);
        return questions.map(QuestionDto::new);
    }

    public void postQuestion(NewQuestionDto newQuestion) {
        Question question = new Question();
        question.setTitle(newQuestion.getTitle());
        question.setContent(newQuestion.getContent());
        question.setNickname(newQuestion.getNickname());
        question.setPassword(newQuestion.getPassword());
        question.setCategory(Category.ofType(newQuestion.getCategory()));
        question.setCreatedAt(newQuestion.getCreateAt());
        this.questionRepository.save(question);
    }
}