// import * as React from 'react';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router';
import BuildingHistoryList from './buildingHistoryList'
import BuildingDetailsBox from './buildingDetailsBox'
import MainButton from '../../main/mainButton'
const theme = createTheme();


export default function BuildingDetail(){

    const navigate = useNavigate();

    const { id } = useParams();

    return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar
            position="absolute"
            color="default"
            elevation={0}
            sx={{
              position: 'relative',
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Toolbar>
            <MainButton></MainButton>
              <Typography variant="h6" color="inherit" noWrap>
                Building {id}
              </Typography>
            </Toolbar>
          </AppBar>
          <Container component="main" style={{ maxWidth: 'fit-content',  }}  >
            <Paper variant="outlined" sx={{ my: { xs: 8, md: 6 }, p: { xs: 2, md: 3 } }} maxWidth="fit-content" >
              <BuildingDetailsBox></BuildingDetailsBox>
              <BuildingHistoryList></BuildingHistoryList>
            </Paper>
          </Container>
        </ThemeProvider>
      );

}