"use client"
import { Box, CssBaseline, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, TextField, Button } from "@mui/material";
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
  const [passwordError, setPasswordError] = useState(false);

  //데이터 받기
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

  //question 삭제하기
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
    .then((response) => response.json())
    .then((data) => {
      if (data.error === "비밀번호가 일치하지 않습니다.") {
        setPasswordError(true);
        setPassword("");
      }
      else {
        router.push("/");
      }
    })
  }

  const handleAlertClose = () => {
    setOpenAlert(false);
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (passwordError) {
      setPasswordError(false);
    }
  };

  const handleCategorySearch = (category: string, search: string) => {
    let query = "";
    query = '?category=' + category;
    
    router.push("/"+ query);
  };

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  return (
    <div>
      <Box sx={{display : "flex", position: "relative"}}>
        <CssBaseline /> 
        <CategoryDrawer onCategorySearch={handleCategorySearch} />
        <DetailBox item={data} onDeleteControl={handleOpenAlert}/>
      </Box>
      <Dialog open={openAlert} onClose={handleAlertClose}>
        <DialogTitle>글 삭제</DialogTitle>
        <DialogContent >
          <DialogContentText>
            본인이 작성한 글만 삭제하실 수 있습니다. 작성 당시 사용한 비밀번호를 입력해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="비밀번호"
            type="password"
            value={password}
            fullWidth
            variant="standard"
            onChange={handlePassword}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleDelete();
              }
            }}
            error={passwordError}
            helperText={passwordError ? "비밀번호가 틀렸습니다." : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} type="submit">확인</Button>
          <Button onClick={handleAlertClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};