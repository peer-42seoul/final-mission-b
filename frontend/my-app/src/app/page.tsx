"use client"
import QuestionList from "@/components/Main/QusetionList";
import CategoryDrawer from "@/components/Main/CategoryDrawer";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Question, Pageable, Data } from "@/components/Main/types";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import mainData from './main.json';
import categoryData from './category.json';


export default function Home() {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [pageIndex , setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  //데이터 로드 함수
  async function getData() {
    try {
      const urlPath = 'http://localhost:8080/v1/';
      let query = "";
      if (searchContent !== "") {
        query = '?search=' + searchContent;
      }
      else {
        query = '?category=' + selectedCategory;
      }
      
      // const response = await fetch(urlPath + query);

      // if (!response.ok) {
      //   throw new Error("something went wrong!");
      // }

      query += '&sort=' + sortBy + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize;
      console.log(query);

      // const loadeddata = await response.json();
      if (selectedCategory === "") {
        setData(mainData);
      }
      else {
        setData(categoryData[selectedCategory]);
      }

      // const loadeddata = await response.json();
      // if (url === "") {
      //   setData(mainData);
      // }
      // else {
      //   setData(categoryData[selectedCategory]);
      // }
      // setData(loadeddata);
    } catch (error: any) {
      setError(error.message);
    }
  }
  //첫 데이터 로드
  useEffect(() => {
    getData();
    console.log("useeffect");
  }, [selectedCategory, searchContent, pageIndex]);

  
  ///v1?category=${category}&sort=&pageIndex=&pageSize=


  const handleCategorySearch = (category: string, search: string) => {
    console.log("handlecategorysearch");
    setSelectedCategory(category);
    setSearchContent(search);
  }
  

  return (
    <Box sx={{ display:"flex"}}>
      <CssBaseline /> 
      <CategoryDrawer onCategorySearch={handleCategorySearch}/>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
      >
        <Toolbar/>
        <QuestionList items={data?.content ?? []}/>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={2} >
            <Pagination count={data?.totalPages} onChange={(e, page) => {setPageIndex(page - 1);}}/>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
