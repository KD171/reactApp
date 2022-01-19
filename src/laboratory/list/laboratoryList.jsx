import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainButton from '../../main/mainButton'
import LaboratoryComponent from './listComponent'

const theme = createTheme();




export default function LaboratoryList(){

    const handleSubmitCreate = () => {
      window.open("/laboratory/create/", "_self");
    };

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
                Laboratories

              </Typography>
            <Button
            variant="contained"
            onClick={handleSubmitCreate}
            style={{ margin: '0 0 0 25px'}}
            >
            {'Create new'}
            </Button>
            </Toolbar>
          </AppBar>
          <Container component="main" maxWidth="100%" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 4, md: 6 }, p: { xs: 2, md: 3 } }}>
              <LaboratoryComponent></LaboratoryComponent>
            </Paper>
          </Container>
        </ThemeProvider>
      );

}