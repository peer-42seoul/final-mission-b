"use client"
import { AppBar, Divider, List, ListItem, ListItemText, Toolbar, Drawer, Box, Typography, ListItemButton, ListItemIcon, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { Numbers } from "@mui/icons-material";
import  MenuIcon from "@mui/icons-material/Menu";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from "next/link";
import SearchInput from "./SearchInput";
import { useSearchParams } from 'next/navigation';
import { usePathname } from "next/navigation";


const drawerWidth = 240;


function CategoryDrawer({ onCategorySearch }: {onCategorySearch: (category: string, search: string) => void}) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
	const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "");
  const [searchContent, setSearchContent] = useState("")
  const [showSearchInput, setShowSearchInput] = useState(false);
  const currentPage = usePathname();

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

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

  const handleBlur = () => {
    if(showSearchInput) {
      console.log("blur");
      setShowSearchInput(false);
    }
  }

  const drawer = (
    <div>
      <Toolbar style={{ backgroundColor: "rgba(25, 117, 210, 0.8)"}}>
        <Link href="/" onClick={() => handleCategorySelect("")} style={{ textDecoration: 'none', color: '#fff'}}>
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
        {currentPage !== "/" ? (
          <Toolbar sx={{ display: "flex"}}>
            <a href="/" style={{ textDecoration: "none", color: "#fff", position: "relative", left: "-10px"}}>
              <IconButton color="inherit"><ArrowBackIosNewIcon/></IconButton></a>
          </Toolbar>
        ) : (
          <Toolbar sx={{ justifyContent: "space-between"}}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: {xs: "flex", sm: "none"}, width: "100%", justifyContent: "space-between", alignItems: "center"}}>
              {!showSearchInput ? (
                <Typography variant="h6" sx={{ fontSize: "18px" }}>
                  {selectedCategory ? selectedCategory : '전체보기'}
                </Typography>
              ): null}
              {showSearchInput ? (
                <SearchInput onSearch={handleSearch} onBlur={handleBlur}/>
              ) : (
                <IconButton color="inherit" onClick={toggleSearchInput}>
                  <SearchIcon />
                </IconButton>
              )}
            </Box>
            <Box sx={{ display: {xs: "none", sm: "flex"}, width: "100%", justifyContent: "space-between", alignItems: "center"}}>
              <Typography variant="h6" sx={{ fontSize: "18px" }}>
                {selectedCategory ? selectedCategory : '전체보기'}
              </Typography>
              <SearchInput onSearch={handleSearch} onBlur={handleBlur}/>
            </Box>
            <a href="/write" style={{ textDecoration: 'none', color: '#fff' }}>
              <IconButton color="inherit">
                <AddIcon />
              </IconButton>
            </a>
          </Toolbar>
        )}
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


