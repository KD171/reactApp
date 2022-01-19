import React from 'react';
import { useParams } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditLaboratoryForm from './editLaboratoryForm';
import MainButton from '../../main/mainButton'

const theme = createTheme();




export default function EditLaboratory(){


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
            <MainButton/>
              <Typography variant="h6" color="inherit" noWrap>
                Edit Laboratory {id}
              </Typography>
            </Toolbar>
          </AppBar>
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 4, md: 6 }, p: { xs: 2, md: 3 } }}>
              <EditLaboratoryForm></EditLaboratoryForm>
            </Paper>
          </Container>
        </ThemeProvider>
      );

}