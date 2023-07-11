"use client"
import QuestionList from "@/components/Main/QusetionList";
import CategoryDrawer from "@/components/Main/CategoryDrawer";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Question, Pageable, Data } from "@/components/Main/types";

import mainData from './main.json';
import categoryData from './category.json';

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
      nickname:  "test123",
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
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  //데이터 로드 함수
  async function getData(url: string) {
    try {
      const urlPath = 'http://localhost:8080/v1/';
      // const urlPath = 'https://peerflow-finalmission-default-rtdb.firebaseio.com/'

      const response = await fetch(urlPath + url);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const loadeddata = await response.json();
      // if (url === "") {
      //   setData(mainData);
      // }
      // else {
      //   setData(categoryData[selectedCategory]);
      // }
      setData(loadeddata);
    } catch (error: any) {
      setError(error.message);
    }
  }
  //첫 데이터 로드
  useEffect(() => {
    getData(selectedCategory);
    console.log(data);
  }, [selectedCategory]);

  
  ///v1?category=${category}&sort=&pageIndex=&pageSize=


  const handleCategorySelect = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
  }
  

  return (
    <Box sx={{ display:"flex"}}>
      <CssBaseline /> 
      <CategoryDrawer onCategorySelect={handleCategorySelect}/>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
      >
        <Toolbar/>
        <QuestionList items={data?.content ?? []}/>
      </Box>
    </Box>
  );
}
