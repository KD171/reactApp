import React, {useState, useEffect, Component } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useParams } from 'react-router';
import API from '../../main/api'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AlertDialogSlide from './AlertDialogSlide'
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

import { FormControlUnstyledContext } from '@mui/material';

export default function NewAccessFrom() {
    const [devices, setDevices] = useState();
    const [dayOfWeek, setDayOfWeek] = useState();
    const [deviceId, setDeviceId] = useState();
    const [studentId, setStudentId] = useState();
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [day, setDay] = React.useState(new Date());
    const [from, setFrom] = React.useState(new Date());
    const [to, setTo] = React.useState(new Date());
    const [activeDevice, setActiveDevice] = useState(false);

    const { id } = useParams();


    const handleChangeDay = (event) => {
    console.info(event.target.value)
      setDayOfWeek(event.target.value);
    };
     const handleChangeFrom = (event) => {
      setFrom(event);
    };
    const handleChangeTo = (event) => {
      setTo(event);
    };
    const handleChangeDevice = (event) => {
        setDeviceId(event.target.value);
    };
    const handleChangeStudentId = (event) => {
        setStudentId(event.target.value);
    };

    const handleSubmit = () => {
        API.post('/device/newAccessRole', {
                "deviceId": id,
                "dayOfWeek": dayOfWeek,
                "timeStart": from.toLocaleTimeString(),
                "timeEnd": to.toLocaleTimeString()
        }).then(response => {
          console.log(open)
            if (response.status === 200) {
                setOpen(true)
                setErrorOpen(false)
            }
        }).catch(error => {console.error(error)
              console.log(error.response.data);
            setErrorMessage(error.response.data);
            setErrorOpen(true)})
    };




  return (
    <React.Fragment>
      { open && <AlertDialogSlide/>}
      <Box sx={{ width: '100%' }}>
            <Collapse in={errorOpen}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setErrorOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                severity="error"
                sx={{ mb: 2 }}
              >
                {errorMessage}
              </Alert>
            </Collapse>
          </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <FormControl fullWidth state={{ disabled: true}}>
            <InputLabel id="dayOfWeek">day Of Week</InputLabel>
            <Select
                labelId="dayOfWeek"
                id="dayOfWeek"
                value={dayOfWeek}
                rules={{ required: true }}
                label="Day of week"
                onChange={handleChangeDay}
            >
              <MenuItem value={2}>Monday</MenuItem>
              <MenuItem value={3}>Tuesday</MenuItem>
              <MenuItem value={4}>Wednesday</MenuItem>
              <MenuItem value={5}>Thursday</MenuItem>
              <MenuItem value={6}>Friday</MenuItem>
              <MenuItem value={7}>Saturday</MenuItem>
              <MenuItem value={1}>Sunday</MenuItem>
            </Select>
        </FormControl>
        </Grid>


        <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
          <TimePicker
            label="From:"
            value={from}
            ampm={false}
            onChange={handleChangeFrom}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            label="To:"
            ampm={false}
            value={to}
          onChange={handleChangeTo}
            renderInput={(params) => <TextField {...params} />}
          />
          </Stack>
        </LocalizationProvider>

        </Grid>




        <Grid item xs={12} sx={{ display: 'flex' , 'justify-content': 'left', 'align-items': 'center'}}>
            <Button
            variant="contained"
            onClick={handleSubmit}
            >
            {'Create'}
            </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}