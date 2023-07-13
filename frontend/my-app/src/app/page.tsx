"use client"
import QuestionList from "@/components/Main/QusetionList";
import CategoryDrawer from "@/components/Main/CategoryDrawer";
import { Box, CssBaseline, Toolbar, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Question, Pageable, Data } from "@/components/types";
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
        query = 'search?title=' + searchContent;
      }
      else {
        query = '?category=' + selectedCategory;
      }
      

      query += '&sort=' + sortBy + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize;
      console.log(query);


      //if (selectedCategory === "") {
      //  setData(mainData);
      //}
      //else {
      //  setData(categoryData[selectedCategory]);
      //}
      const response = await fetch(urlPath + query);
      const loadeddata = await response.json();
      setData(loadeddata);
    } catch (error: any) {
      setError(error.message);
    }
  }
  //첫 데이터 로드
  useEffect(() => {
    getData();
    console.log("useeffect");
  }, [selectedCategory, searchContent, pageIndex, sortBy]);

  

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
        <Box sx={{ display: "flex", padding: "0 16px 8px 8px", alignItems:"center", justifyContent: "space-between" }}>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel>Sort</InputLabel>
            <Select
              value={sortBy}
              label="Sort"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value={"lastest"}>최신순</MenuItem>
              <MenuItem value={"views"}>조회순</MenuItem>
              <MenuItem value={"recommends"}>추천순</MenuItem>
            </Select>
          </FormControl>
          <Typography sx={{ fontSize: "13px"}}>총 {data?.totalElements}개의 글 / {data?.size}개씩 보기</Typography>
        </Box>
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
