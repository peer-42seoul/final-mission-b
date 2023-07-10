"use client"
import QuestionList from "@/components/Main/QusetionList";
import CategoryDrawer from "@/components/Main/CategoryDrawer";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { useState } from "react";
import { Result } from "@/components/Main/types";


const tmpData = {
  content: [
    {
      questionId: 5,
      recommend: 3,
      view: 5,
      answerCount: 0,
      title: "this is test",
      content: "this is test",
      category: "MINISHELL",
      createAt: "2023-07-06T13:18:32.167038",
      nickname: "test123",
    },
    {
      questionId: 1,
      recommend: 2,
      view: 11,
      answerCount: 0,
      title: "Grand Theft Auto: San Andreas",
      content: "All we had to do, was follow the damn train, CJ!",
      category: "MINISHELL",
      createAt: "2023-07-06T00:48:01.132413",
      nickname: "Big Smoke",
    },
  ],
  pageable: {
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 10,
    unpaged: false,
    paged: true,
  },
  last: true,
  totalPages: 1,
  totalElements: 2,
  size: 10,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  first: true,
  numberOfElements: 2,
  empty: false,
};

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  async function getData(url: string) {
    try {
      const urlPath = 'http://localhost:8080/v1/';

      const response = await fetch(urlPath + url);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const data = await response.json();
      
    } catch (error: any) {
      setError(error.message);
    }
  };

  ///v1?category=&sort=&pageIndex=&pageSize=



  

  return (
    <Box sx={{ display:"flex"}}>
      <CssBaseline /> 
      <CategoryDrawer/>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
      >
        <Toolbar/>
        <QuestionList items={data.content}/>
      </Box>
    </Box>
  );
}
