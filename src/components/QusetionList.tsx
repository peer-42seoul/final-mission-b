"use client"
import { Box, List, ListItem, Link, Typography } from "@mui/material";
import { Recommend, Pageview } from "@mui/icons-material";

interface Question {
  questionId: number;
  recommend: number;
  view: number;
  answerCount: number;
  title: string;
  content: string;
  category: string;
  createAt: string;
  nickname: string;
}

const QuestionList: React.FC<{ items: Question[] }> = (props) => {
  return (
    <List>
      {props.items.map((question) => (
        <ListItem key={question.questionId}>
          <Box>
            <Box>
              <Typography>{question.category}</Typography>
            </Box>
            <Typography>
              <Link href={`/detail/${question.questionId}`}>
                {question.title}
              </Link>
            </Typography>
            <Box>
              <Typography>{question.nickname}</Typography>
              <Typography>{question.createAt}</Typography>
            </Box>
            <Typography>{question.content}</Typography>
            <Typography>
              <Recommend/><span>{question.recommend}</span>
              <Pageview/><span>{question.view}</span>
            </Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default QuestionList;
