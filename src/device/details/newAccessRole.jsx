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
import { useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NewAccessFrom from './newAccessRoleForm';
import API from '../../main/api'
import MainButton from '../../main/mainButton'

const theme = createTheme();


export default function NewAccess(){

    const { id } = useParams();

    const navigate = useNavigate();

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
                New Access for device {id}
              </Typography>
            </Toolbar>
          </AppBar>
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Typography component="h1" variant="h4" align="center" white-space='post-wrap'>
                New Access
              </Typography>
              <NewAccessFrom></NewAccessFrom>
            </Paper>
          </Container>
        </ThemeProvider>
      );

}