"use client"
import { Box, CssBaseline, Toolbar, Stack, FormControl, FormHelperText, InputLabel, TextField, Select, MenuItem, Button, Modal, CircularProgress} from "@mui/material";
import CategoryDrawer from "@/components/Main/CategoryDrawer";
import { useState } from "react";
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
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<FormData>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const onSubmit = async(data: FormData) => {
    setIsLoading(true);
    console.log("로딩시작");
    try {
      const url = "http://localhost:8080/v1/question";
      console.log("submitting");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        router.push("/");
      }
      else {
        throw new Error("질문 등록에 실패했습니다.");
      }
    }
    catch (error) {
      console.log("에러발생");
      console.error(error);
    }
    finally {
      console.log("로딩끝");
      setIsLoading(false);
    }
    
  };


  const handleCategorySearch = (category: string, search: string) => {
    let query = "";
    if (search !== "") {
      query = 'search?title=' + search;
    }
    else {
      query = '?category=' + category;
    }
    query += '&sort=' + '&pageIndex=0&pageSize=10';
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
            error={!!errors.title}
            helperText={errors.title && "제목을 입력해주세요."}
            onChange={() => clearErrors("title")}
          />
          <FormControl error={!!errors.category}>
            <InputLabel>게시판 타입</InputLabel>
            <Select
              label="category"
              {...register("category", {required: true})}
              defaultValue={''}
              onChange={() => clearErrors("category")}
            >
              <MenuItem value={"minishell"}>minishell</MenuItem>
              <MenuItem value={"minirt"}>minirt</MenuItem>
              <MenuItem value={"ft_irc"}>ft_irc</MenuItem>
            </Select>
            {errors.category && <FormHelperText>카테고리를 선택해주세요.</FormHelperText>}
          </FormControl>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <TextField
              label="닉네임"
              {...register("nickname", {required: true})}
              sx={{width: "45%"}}
              error={!!errors.nickname}
              helperText={errors.nickname && "닉네임을 입력해주세요."}
              onChange={() => clearErrors("nickname")}
            />
            <TextField
              label="비밀번호"
              {...register("password", {required: true})}
              sx={{width: "45%"}}
              error={!!errors.password}
              helperText={errors.password && "비밀번호를 입력해주세요."}
              onChange={() => clearErrors("password")}
            />
          </Box>
          <TextField
            label="내용"
            placeholder="내용을 입력해주세요."
            {...register("content", {required: true})}
            multiline={true}
            sx={{
              "& .MuiInputBase-root": {
                minHeight: 100,
              }
            }}
            error={!!errors.content}
            helperText={errors.content && "텍스트를 입력해주세요."}
            onChange={() => clearErrors("content")}
          />
          <Button type="submit" variant="outlined" sx={{position: "relative", top: "auto", left: "calc(100% - 95px)", width: "95px"}}>작성하기</Button>

          <Modal
            open={isLoading}
          >
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <CircularProgress />
            </Box>
          </Modal>
        </Stack>
      </Box>
    </Box>
    
  );
};