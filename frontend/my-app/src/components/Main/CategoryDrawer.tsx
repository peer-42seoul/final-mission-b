"use client"
import { AppBar, Divider, List, ListItem, ListItemText, Toolbar, Drawer, Box, Typography, ListItemButton, ListItemIcon, IconButton, Menu } from "@mui/material";
import { useEffect, useState } from "react";
import { Numbers } from "@mui/icons-material";
import  MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import SearchInput from "./SearchInput";


const drawerWidth = 240;



function CategoryDrawer({ onCategorySearch }: {onCategorySearch: (category: string, search: string) => void}) {
	const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchContent, setSearchContent] = useState("")

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchContent("");
    handleCategorySearch(category, "");
  };

  const handleCategorySearch = (category: string, search: string) => {
    onCategorySearch(category, search);
  };

  const handleSearch = (search: string) => {
    console.log("handlesearch");
    setSearchContent(search);
    setSelectedCategory("");
    handleCategorySearch("", search);
  };


  const drawer = (
    <div>
      <Toolbar style={{ backgroundColor: "rgba(25, 117, 210, 0.8)"}}>
        <Link href="#" onClick={() => handleCategorySelect("")} style={{ textDecoration: 'none', color: '#fff'}}>
          <strong>Peer-flow</strong>
        </Link>
      </Toolbar>
      <Divider />
      <List>
        {['minishell', 'minirt', 'ft_irc'].map((category) => (
          <ListItem
            key={category}
            onClick={() => handleCategorySelect(category)}
          >
            <ListItemButton>
              <ListItemIcon><Numbers/></ListItemIcon>
              <ListItemText sx={{ fontWeight: category === selectedCategory ? '700' : 'normal' }}>{category}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          width: {sm: `calc(100% - ${drawerWidth}px)`},
          ml: {sm: `${drawerWidth}px`},
        }}
      >
        <Toolbar sx={{ justifyContent: {sm:"space-between"}}}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontSize: "18px" }}>
            {selectedCategory ? selectedCategory : '전체보기'}
          </Typography>
          <Box sx={{width: {xs: "160px", sm: "auto"}, position: {xs:"absolute"}, right: {xs:"10px"}} }>
            <SearchInput onSearch={handleSearch}/>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: {sm: drawerWidth}, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  )
}

export default CategoryDrawer;