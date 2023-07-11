"use client"
import { Box, List, ListItem, Link, Typography } from "@mui/material";
import { Recommend, Pageview } from "@mui/icons-material";
import { isInterfaceDeclaration } from "typescript";
import { Question } from "./types";


const QuestionList: React.FC<{ items: Question[] }> = (props) => {
  
  function formatDateTime (datetime: string) {
    const date = new Date(datetime);
    const formattedDate = date.toLocaleDateString('ko-KR', );
    return formattedDate;
  }

  return (
    <List>
      {props.items.map((question) => (
        <ListItem key={question.questionId}>
          <Box sx={{marginBottom: "10px", border: "1px solid rgba(0, 0, 0, 0.1)", padding: "16px 16px 24px", borderRadius: "4px"}}>
            <Box sx={{ display: 'flex', width: 'fit-content', backgroundColor: '#00000014', padding: '5px 10px', borderRadius: '20px'}}>
              <Typography sx={{ fontSize: '13px' }}>{question.category}</Typography>
            </Box>
              <Link href={`/detail/${question.questionId}`} sx={{ textDecoration: 'none', color: '#000', fontWeight: '700'}}>
                <Typography variant="h5" >
                  <strong style={{color: "skyblue"}}>Q. </strong>
                  {question.title}
                </Typography>
              </Link>
            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
              <Typography>{question.nickname}</Typography>
              <Typography>{formatDateTime(question.createdAt)}</Typography>
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
