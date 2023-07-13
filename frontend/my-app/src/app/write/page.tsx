"use client"
import { Box, CssBaseline, Toolbar, Stack, FormControl, InputLabel, TextField, Select, MenuItem, Button } from "@mui/material";
import CategoryDrawer from "@/components/Main/CategoryDrawer";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';

type FormData = {
  title: string,
  category: string,
  nickname: string,
  password: string,
  content: string,
};

export default function Write() {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();
  
  const onSubmit = (data: FormData) => {
    
    const url = "http://localhost:8080/v1/question";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((result)=> {
      console.log(result);
      router.push("/");
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const [pageIndex , setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleCategorySearch = (category: string, search: string) => {
    let query = "";
    if (search !== "") {
      query = 'search?title=' + search;
    }
    else {
      query = '?category=' + category;
    }
    query += '&sort=' + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize;
    router.push("/"+ query);
  };

  return (
    <Box sx={{display : "flex"}}>
      <CssBaseline /> 
      <CategoryDrawer onCategorySearch={handleCategorySearch} />
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }}}>
        <Toolbar/>
        <Stack spacing={2} sx={{display: "flex", flexDirection: "column", position: "relative"}}>
          <TextField
            label="제목"
            {...register("title", {required: true})}
          />
          <FormControl>
            <InputLabel>게시판 타입</InputLabel>
            <Select
              label="category"
              {...register("category", {required: true})}
            >
              <MenuItem value={"minishell"}>minishell</MenuItem>
              <MenuItem value={"minirt"}>minirt</MenuItem>
              <MenuItem value={"ft_irc"}>ft_irc</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <TextField
              label="닉네임"
              {...register("nickname", {required: true})}
              sx={{width: "45%"}}
            />
            <TextField
              label="비밀번호"
              {...register("password", {required: true})}
              sx={{width: "45%"}}
            />
          </Box>
          <TextField
            placeholder="내용을 입력해주세요."
            {...register("content", {required: true})}
            multiline={true}
            sx={{
              "& .MuiInputBase-root": {
                minHeight: 100,
              }
            }}
          />
          <Button type="submit" variant="outlined" sx={{position: "relative", top: "auto", left: "calc(100% - 95px)", width: "95px"}}>작성하기</Button>
        </Stack>
      </Box>
    </Box>
    
  );
};