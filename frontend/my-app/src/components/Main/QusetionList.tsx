"use client"
import { Box, List, ListItem, Link, Typography, Stack } from "@mui/material";
import { Person } from "@mui/icons-material";
import { Question } from "../types";
import dayjs from "dayjs";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';


const QuestionList: React.FC<{ items: Question[] }> = (props) => {
  
  function formatDateTime (datetime: string) {
    const date = new Date(datetime);
    const formattedDate = dayjs(date).format("YY년 MM월 DD일")
    return formattedDate;
  }

  return (
    <List>
      {props.items.map((question, index) => (
        <ListItem key={index}>
          <Link href={`/detail/${question.questionId}`} sx={{ width: "100%", textDecoration: 'none', color: '#000', fontWeight: '700'}}>
            <Stack spacing={2} sx={{
              width: "100%", marginBottom: "10px", border: "1px solid rgba(154, 188, 255, 0.5)", padding: "24px 20px", borderRadius: "4px",
              "&:hover" : {
                backgroundColor: "rgba(154, 188, 255, 0.1)"
              }
              }}>
                <Typography variant="h5" mb={2}sx={{display: "flex", alignItems: "flex-start"}}>
                  <strong style={{color: "#9ABCFF", display: "flex", alignItems: "center"}} ><LiveHelpIcon sx={{fontSize:"30px"}}/>&nbsp;</strong>
                  <strong style={{color: "#5f5f5f"}}>{question.title}</strong>
                </Typography>
                <Typography sx={{display: "flex", fontSize: "16px", fontWeight: "600",color: "#71A1FF"}}><Person/>&nbsp;{question.nickname}</Typography>
                <Typography sx={{padding: "10px 0"}}>{question.content.length > 100 ? question.content.slice(0, 130) + '...' : question.content}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: {xs: "13px", sm: "16px"}}}>
                  <Stack direction="row" spacing={1}>
                    <Typography sx={{display: "flex", color:"#3f3f3f", fontSize: "inherit"}}>
                      추천수 {question.recommend}
                    </Typography>
                    <Typography sx={{display: "flex", color:"#3f3f3f", fontSize: "inherit"}}>
                      조회수 {question.view}
                    </Typography>
                  </Stack>
                  <Box sx={{ display: 'flex', width: 'fit-content', color:"#5f5f5f"}}>
                    <Typography sx={{color: "#71A1FF", fontSize: "inherit"}}>{question.category}</Typography>
                    <span>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>
                    <Typography sx={{fontSize: "inherit"}}>{formatDateTime(question.createAt)}</Typography>
                  </Box>
                </Box>
            </Stack>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default QuestionList;
