import { Recommend, Edit, Delete } from "@mui/icons-material";
import { DetailData } from "../types";
import { Box, Toolbar, Stack, Typography, Divider, IconButton, Button } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { usePathname } from "next/navigation";


const DetailBox: React.FC<{ item: DetailData | null, onDeleteControl: () => void }> = (props) => {
  const [password, setPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const pathname = usePathname();

  function formatDateTime (datetime: string) {
    const date = new Date(datetime);
    const formattedDate = dayjs(date).format("YY-MM-DD HH:mm")
    return formattedDate;
  }
  let formattedCreatedAt = "";
  if (props.item?.createdAt) {
    formattedCreatedAt = formatDateTime(props.item.createdAt);
  }
  let formattedUpdatedAt = "";
  if (props.item?.updatedAt) {
    formattedUpdatedAt = formatDateTime(props.item.createdAt);
  }

  const handleDeleteControl = () => {
    props.onDeleteControl();
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Stack
        spacing={2}
        sx={{ display: "flex", flexDirection: "column", position: "relative" }}
      >
        <Box sx={{ width: "100%", marginBottom: "10px", border: "1px solid rgba(0, 0, 0, 0.1)", padding: "16px 16px 24px", borderRadius: "4px"}}>
          <Box sx={{ display: 'flex', width: 'fit-content', backgroundColor: '#00000014', padding: '5px 10px', borderRadius: '20px'}}>
            <Typography sx={{ fontSize: '13px' }}>{props.item?.category}</Typography>
          </Box>
          <Typography variant="h4" mt={1}>
            <strong>Q. </strong>
            {props.item?.title}
          </Typography>
          <Box mt={5} mb={2} sx={{position: "relative"}}>
            <Typography variant="h6">조회수: {props.item?.view}</Typography>
            <Typography variant="h6">작성자: {props.item?.nickname}</Typography>
            <Typography variant="h6">작성일: {formattedCreatedAt}</Typography>
            {formattedUpdatedAt ? <Typography variant="h6">수정일: {formattedUpdatedAt}</Typography>: null}
            <Box sx={{position: "absolute", right: "0", bottom: "0"}}>
              <IconButton><Edit color="action" sx={{fontSize: "20px"}}/></IconButton>
              <IconButton onClick={handleDeleteControl}><Delete color="action" sx={{fontSize: "20px"}}/></IconButton>
            </Box>
          </Box>
          <Divider />
          <Box sx={{padding: "20px 0"}}>
            {props.item?.content}
          </Box>
          <IconButton sx={{marginTop: "40px"}}>
            <Recommend sx={{fontSize: "20px"}}/><span style={{fontSize: "17px"}}>{props.item?.recommend}</span>
          </IconButton>
          <Box sx={{ width: "100%", margin: "10px 0", border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "4px"}}>
            <Button>
              댓글
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default DetailBox;
