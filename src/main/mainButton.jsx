import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


export default function MainButton(){

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleClickDevices = () => {
      window.open("/device/", "_self");
    };
    const handleClickLaboratories = () => {
      window.open("/laboratories", "_self");
    };
    const handleClickBuildings = () => {
      window.open("/buildings", "_self");
    };

    return (
      <div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              onClick={handleClose}
            >
              <MenuItem onClick={handleClickDevices}>Devices</MenuItem>
              <MenuItem onClick={handleClickLaboratories}>Laboratories</MenuItem>
              <MenuItem onClick={handleClickBuildings}>Buildings</MenuItem>
            </Menu>
            <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleClickMenu}
                  aria-expanded={open ? 'true' : undefined}
                  aria-controls={open ? 'basic-menu' : undefined}
                >
                  <MenuIcon />
                </IconButton>
            </Toolbar>
           </div>
      );
}