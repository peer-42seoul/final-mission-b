"use client"
import { Box, CssBaseline, Toolbar, Stack, FormControl, InputLabel, TextField, Select, MenuItem, Button } from "@mui/material";
import CategoryDrawer from "@/components/Main/CategoryDrawer";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Write() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    
    const url = "http://localhost:8080/v1/question";

    const data = {
      title: title,
      category: category,
      nickname: nickname,
      password: password,
      content: content,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("POST 요청 성공:", result);

        setTitle("");
        setCategory("");
        setNickname("");
        setPassword("");
        setContent("");
      })
      .catch((error) => {
        console.error(error);
      });

  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [pageIndex , setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleCategorySearch = (category: string, search: string) => {
    setSelectedCategory(category);
    setSearchContent(search);
    let query = "";
    if (searchContent !== "") {
      query = 'search?title=' + searchContent;
    }
    else {
      query = '?category=' + selectedCategory;
    }
    query += '&sort=' + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize;
    router.push("/"+ query);
  };

  return (
    <Box sx={{display : "flex"}}>
      <CssBaseline /> 
      <CategoryDrawer onCategorySearch={handleCategorySearch} />
      <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }}}>
        <Toolbar/>
        <Stack spacing={2} sx={{display: "flex", flexDirection: "column", position: "relative"}}>

          <TextField
            label="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <FormControl required>
            <InputLabel>게시판 타입</InputLabel>
            <Select
              value={category}
              label="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={"minishell"}>minishell</MenuItem>
              <MenuItem value={"minirt"}>minirt</MenuItem>
              <MenuItem value={"ft_irc"}>ft_irc</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <TextField
              label="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              sx={{width: "45%"}}
            />
            <TextField
              label="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{width: "45%"}}
            />
          </Box>
          <TextField
            placeholder="내용을 입력해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
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
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     placeholder="제목"
    //     value={title}
    //     onChange={(e) => setTitle(e.target.value)}
    //     required
    //   />
    //   <select
    //     value={category}
    //     onChange={(e) => setCategory(e.target.value)}
    //     required
    //   >
    //     <option value="">게시판 타입 선택</option>
    //     <option value="minishell">minishell</option>
    //     <option value="minirt">minirt</option>
    //     <option value="ft_irc">ft_irc</option>
    //   </select>
    //   <input
    //     type="text"
    //     placeholder="닉네임"
    //     value={nickname}
    //     onChange={(e) => setNickname(e.target.value)}
    //     required
    //   />
    //   <input
    //     type="password"
    //     placeholder="비밀번호"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     required
    //   />
    //   <textarea
    //     placeholder="내용"
    //     value={content}
    //     onChange={(e) => setContent(e.target.value)}
    //     required
    //   ></textarea>
    //   <button type="submit">게시물 작성</button>
    // </form>
  );
};