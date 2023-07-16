import { Edit, Delete } from "@mui/icons-material";
import { DetailData } from "../types";
import { Box, Toolbar, Stack, Typography, Divider, IconButton, Button, Menu, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface DetailBoxProps {
  item: DetailData | null;
  onDeleteControl: () => void;
  onEditControl: () => void;
  onRecommendControl: () => void;
}

const DetailBox: React.FC<DetailBoxProps> = (props) => {
  

  function formatDateTime (datetime: string) {
    const date = new Date(datetime);
    const formattedDate = dayjs(date).format("YY년 MM월 DD일 HH:mm")
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
  
  const handleEditControl = () => {
    props.onEditControl();
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleRecommend = () => {
    props.onRecommendControl();
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Stack
        spacing={2}
        sx={{ display: "flex", flexDirection: "column", position: "relative" }}
      >
        <Box sx={{ width: "100%", marginBottom: "10px", border: "1px solid rgba(0, 0, 0, 0.1)", padding: "24px 20px", borderRadius: "4px"}}>
          <Typography variant="h4" mb={2}sx={{display: "flex", alignItems: "flex-start"}}>
            <strong style={{color: "#9ABCFF", display: "flex", alignItems: "center"}} ><LiveHelpIcon sx={{fontSize:"30px"}}/>&nbsp;</strong>
            <strong style={{color: "#5f5f5f"}}>{props.item?.title}</strong>
          </Typography>
          <Box sx={{ display: 'flex', width: 'fit-content', padding: '5px'}}>
            <Typography sx={{ display: "flex", fontSize: '18px', color: "#71A1FF", alignItems: "center" }}><MenuIcon sx={{fontSize: '18px'}}/>&nbsp;{props.item?.category}</Typography>
          </Box>
          <Box mt={5} mb={2} sx={{position: "relative"}}>
            <Typography mb={1} variant="body1" sx={{display: "flex", color: "#9ABCFF", fontWeight: "600"}}><PersonIcon/> {props.item?.nickname}</Typography>
            <Box sx={{display: "flex", padding: "5px"}}>
              <Typography variant="body1">조회수 {props.item?.view}</Typography>
              <Typography variant="body1">&nbsp;&#8226;  작성일: {formattedCreatedAt}</Typography>
            </Box>
            {formattedUpdatedAt ? <Typography variant="h6">&nbsp;&#8226;  수정일: {formattedUpdatedAt}</Typography>: null}
            <IconButton
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleMore}
              sx={{position: "absolute", right: "0", bottom: "0", width: "20px", color: "#5f5f5f", padding: "5px 15px"}}
            >
              <MoreVertIcon/>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMoreClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleEditControl}><Edit color="action" sx={{fontSize: "20px"}}/>&nbsp;수정하기</MenuItem>
              <MenuItem onClick={handleDeleteControl}><Delete color="action" sx={{fontSize: "20px"}}/>&nbsp;삭제하기</MenuItem>
            </Menu>
          </Box>
          <Divider />
          <Box sx={{padding: "40px 10px"}}>
            {props.item?.content}
          </Box>
          <Box sx={{display: "flex", width: "100%", padding: "10px", justifyContent: "flex-end"}}>
            <Button sx={{fontSize: "14px", color: "#71A1FF"}} endIcon={<ThumbUpIcon/>}>추천 {props.item?.recommend} onClick={handleRecommend}</Button>
          </Box>
          <Box sx={{ display: "flex", width: "100%", margin: "10px 0", justifyContent: "center"}}>
            <Button variant="outlined" sx={{width: "100%", color: "#71A1FF", borderColor: "#71A1FF"}} startIcon={<InsertCommentIcon/>}>댓글</Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default DetailBox;
