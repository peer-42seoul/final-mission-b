"use client"
import { AppBar, Divider, List, ListItem, ListItemText, Toolbar, Drawer, Box, Typography, ListItemButton, ListItemIcon, IconButton, Menu } from "@mui/material";
import { useState } from "react";
import { Numbers } from "@mui/icons-material";
import  MenuIcon from "@mui/icons-material/Menu";


const drawerWidth = 240;



function CategoryDrawer({ onCategorySelect }: {onCategorySelect: (selectedCategory: string) => void}) {
	const [mobileOpen, setMobileOpen] = useState(false);
  //const [selectedCategory, setSelectedCategory] = useState('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategorySelect = (category: string) => {
    onCategorySelect(category);
  }

  const drawer = (
    <div>
      <Toolbar>

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
              <ListItemText>{category}</ListItemText>
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
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            전체보기
          </Typography>
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