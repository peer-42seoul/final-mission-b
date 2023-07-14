"use client"
import { Box, List, ListItem, Link, Typography, Stack } from "@mui/material";
import { Recommend, Pageview } from "@mui/icons-material";
import { isInterfaceDeclaration } from "typescript";
import { Question } from "../types";
import dayjs from "dayjs";


const QuestionList: React.FC<{ items: Question[] }> = (props) => {
  
  function formatDateTime (datetime: string) {
    const date = new Date(datetime);
    const formattedDate = dayjs(date).format("YY-MM-DD HH:mm")
    return formattedDate;
  }

  return (
    <List>
      {props.items.map((question, index) => (
        <ListItem key={index}>
          <Stack spacing={1} sx={{width: "100%", marginBottom: "10px", border: "1px solid rgba(0, 0, 0, 0.1)", padding: "16px 16px 24px", borderRadius: "4px"}}>
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
              <Typography>{formatDateTime(question.createAt)}</Typography>
            </Box>
            <Typography>{question.content.length > 100 ? question.content.slice(0, 130) + '...' : question.content}</Typography>
            <Stack direction="row" spacing={1}>
              <Typography sx={{display: "flex"}}>
                <Recommend/><span>&nbsp;{question.recommend}</span>
              </Typography>
              <Typography sx={{display: "flex"}}>
                <Pageview/><span>&nbsp;{question.view}</span>
              </Typography>
            </Stack>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
};

export default QuestionList;
