"use client"
import { Box, CssBaseline, TextField, Button } from "@mui/material";
import CategoryDrawer from "@/components/Main/CategoryDrawer";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DetailData } from "@/components/types";
import DetailBox from "@/components/Detail/DetailBox";
import detailData from "./detailData.json"

export default function Detail() {
  const [data, setData] = useState<DetailData | null>(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const pathname = usePathname();
  const questionId = pathname.split('/')[2];

  async function getData() {
    try {
      console.log(`http://localhost:8080/v1/question/${questionId}`);
      const response = await fetch(`http://localhost:8080/v1/question/${questionId}`);
      const loadeddata = await response.json();
      setData(loadeddata);
      // setData(detailData);

    } catch (error: any) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getData();
  },[]);

  const handleDelete = () => {
    const requestData = {
      type: "question",
      password: password,
    };

    fetch(`http://localhost:8080/v1/question/${questionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const handleAlert = () => {
    setOpenAlert(!openAlert);
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleCategorySearch = (category: string, search: string) => {
    let query = "";
    query = '?category=' + category;
    
    router.push("/"+ query);
  };

  return (
    <Box sx={{display : "flex"}}>
      <CssBaseline /> 
      <CategoryDrawer onCategorySearch={handleCategorySearch} />
      <DetailBox item={data}/>
      {openAlert ? 
        <Box>
          <TextField
            label="비밀번호"
            type="password"
            value={password}
            onChange={handlePassword}
          />
          <Button onClick={handleDelete} variant="contained" color="error">
            확인
          </Button>
          <Button onClick={handleAlert}>취소</Button>
        </Box>
      : null}
    </Box>
  );
};