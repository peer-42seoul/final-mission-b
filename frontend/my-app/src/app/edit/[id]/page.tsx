"use client"
import { Box, CssBaseline, Toolbar, Stack, FormControl, FormHelperText, InputLabel, TextField, Select, SelectChangeEvent, MenuItem, Button, Modal, CircularProgress} from "@mui/material";
import CategoryDrawer from "@/components/Main/CategoryDrawer";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useForm } from 'react-hook-form';
import { DetailData } from "@/components/types";
import detailData from "../../detail/[id]/detailData.json"

type FormData = {
  title: string,
  category: string,
  nickname: string,
  password: string,
  content: string,
};

export default function Edit() {
  const { register, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm<FormData>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const questionId = pathname.split('/')[2];
  const [passwordError, setPasswordError] = useState(false);
  const [data, setData] = useState<DetailData | null>(null);
  const [error, setError] = useState(null);
  const [dataCategory, setDataCategory] = useState("")

  //기존 데이터 받기
  async function getData() {
    try {
      console.log(`http://localhost:8080/v1/question/${questionId}`);
      const response = await fetch(`http://localhost:8080/v1/question/${questionId}`);
      const loadeddata = await response.json();
      setData(loadeddata);

      // setData(detailData);
    }
    catch (error: any) {
      setError(error.message);
    }
    
  }

  useEffect(() => {
    getData();
  },[]);

  useEffect(() => {
    setValue("title", data?.title as string);
    setDataCategory(data?.category as string);
    setValue("category", data?.category as string);
    setValue("nickname", data?.nickname as string);
    setValue("content", data?.content as string);
  },[data]);


  //수정 요청보내기
  const onSubmit = async(data: FormData) => {
    setIsLoading(true);
    console.log("로딩시작");
    try {
      const url = `http://localhost:8080/v1/question/${questionId}`;
      console.log("submitting");
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.push(`/detail/${questionId}`);
      }
      else {
        setPasswordError(true);
      }
    }
    catch (error) {
      // setPasswordError(true);
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


  const handleCategorySelect = (e: SelectChangeEvent) => {
    setDataCategory(e.target.value)
  }

  return (
    <Box sx={{display : "flex"}}>
      <CssBaseline /> 
      <CategoryDrawer onCategorySearch={handleCategorySearch} />
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }}}>
        <Toolbar/>
        <Stack spacing={2} sx={{display: "flex", flexDirection: "column", position: "relative"}}>
          <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "flex-end"}}>
            <TextField
              variant="standard"
              label="제목"
              InputLabelProps={{ shrink: true }}
              {...register("title", {required: true})}
              error={!!errors.title}
              helperText={errors.title && "제목을 입력해주세요."}
              onChange={() => clearErrors("title")}
              sx={{width: "75%"}}
            />
            <FormControl error={!!errors.category} sx={{width: "20%"}}>
              <InputLabel>게시판 타입</InputLabel>
              <Select
                label="category"
                {...register("category", {required: true})}
                defaultValue={''}
                onChange={() => clearErrors("category")}
                style={{height: "45px", fontSize: "14px"}}
              >
                <MenuItem value={"minishell"}>minishell</MenuItem>
                <MenuItem value={"minirt"}>minirt</MenuItem>
                <MenuItem value={"ft_irc"}>ft_irc</MenuItem>
              </Select>
              {errors.category && <FormHelperText>카테고리를 선택해주세요.</FormHelperText>}
            </FormControl>
          </Box>
          <Box sx={{display: "flex", alignItems: "center"}}>
            <span style={{display: "flex", width: "80px", alignItems: "center", padding: "15px", color: "#5f5f5f"}}>닉네임:</span>
            <TextField
              variant="standard"
              {...register("nickname", {required: true})}
              sx={{width: "175px"}}
              error={!!errors.nickname}
              helperText={errors.nickname && "닉네임을 입력해주세요."}
              onChange={() => clearErrors("nickname")}
              disabled
            />
            <span style={{display: "flex", width: "100px", alignItems: "center", padding: "15px", color: "#5f5f5f"}}>비밀번호:</span>
            <TextField
              variant="standard"
              {...register("password", {required: true})}
              sx={{width: "175px"}}
              error={!!errors.password || passwordError}
              helperText={errors.password && "비밀번호를 입력해주세요." || passwordError && "올바른 비밀번호가 아닙니다."}
              onChange={() => {
                clearErrors("password");
                setPasswordError(false);
              }
            }
            />
          </Box>
          <TextField
            label="내용"
            InputLabelProps={{ shrink: true }}
            placeholder="내용을 입력해주세요."
            {...register("content", {required: true})}
            multiline={true}
            sx={{
              "& .MuiInputBase-root": {
                minHeight: 200,
              }
            }}
            error={!!errors.content}
            helperText={errors.content && "텍스트를 입력해주세요."}
            onChange={() => clearErrors("content")}
          />
          <Button type="submit" variant="contained" sx={{position: "relative", backgroundColor: "#9ABCFF", top: "auto", left: "calc(100% - 95px)", width: "95px", "&:hover": {backgroundColor: "#71A1FF"}}}>수정하기</Button>

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