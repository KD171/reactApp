import React, {useState, useEffect, Component } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { DataGrid } from '@mui/x-data-grid';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import API from '../main/api'
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
import ReservationGrid from './reservationGrid'

import { FormControlUnstyledContext } from '@mui/material';

export default function ReservationForm() {
    const [devices, setDevices] = useState();
    const [deviceId, setDeviceId] = useState();
    const [studentId, setStudentId] = useState();
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [day, setDay] = React.useState(new Date());
    const [from, setFrom] = React.useState(new Date());
    const [to, setTo] = React.useState(new Date());
    const [activeDevice, setActiveDevice] = useState(false);
    const [rows, setRows] = useState();



    const columns: GridColDef[] = [
      {
        field: 'day',
        headerName: 'Day',
        width: 160,
      },
      {
        field: 'timeStart',
        headerName: 'From:',
        type: 'time',
        width: 160,
      },
      {
        field: 'timeEnd',
        headerName: 'To:',
        width: 160,
      },
    ];


    useEffect(() => {
        getDevicesFromApi();
    }, []);

    const handleChangeDay = (event) => {
      setDay(event);
    };
     const handleChangeFrom = (event) => {
      setFrom(event);
    };
    const handleChangeTo = (event) => {
      setTo(event);
    };

    const handleChangeDevice = (event) => {
        setDeviceId(event.target.value);
        getReservationsFromAPI(event.target.value);
    };
    const handleChangeStudentId = (event) => {
        setStudentId(event.target.value);
    };

    const handleSubmit = () => {
        API.post('/student/reservation', {
                "deviceId": deviceId,
                "studentId": studentId,
                "day": day,
                "timeStart": from.toLocaleTimeString(),
                "timeEnd": to.toLocaleTimeString()
        }).then(response => {
          console.log(open)
            if (response.status === 201) {
                setOpen(true)
                setErrorOpen(false)
            }
        }).catch(error => {console.error(error)

              console.log(error.response.data.error);
              console.log(error.response.data);
              if (error.response.data !== null){
                setErrorMessage(error.response.data);
                setErrorOpen(true)
              }
})
    };

    const getDevicesFromApi = () => {
        API.get('/device/getAll', {
        }).then(response => {
            setDevices(response.data)
        }).catch(error => console.error(error));
    }

    const getReservationsFromAPI = (event) => {
          API
            .get('/device/getReservations/' + event)
            .then((response) => response.data)
            .then((data) => {
              data.map((exam) => {
                  exam['id'] = exam.reservationId
                   var date = new Date();
                   date.setHours(exam['timeStart'][0]);
                   date.setMinutes(exam['timeStart'][1]);
                   exam['timeStart'] = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                    date.setHours(exam['timeEnd'][0]);
                    date.setMinutes(exam['timeEnd'][1]);
                    exam['timeEnd'] = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                    exam['day'] = new Date(exam.day).toLocaleDateString()
              })
              setRows(data);
            });
      };


    if(!devices)
    return <React.Fragment>
            <Box sx={{ display: 'center' , 'justify-content': 'center'}}>
              <CircularProgress />
            </Box>
           </React.Fragment>


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
            <InputLabel id="buildingId">Device</InputLabel>
            <Select
                labelId="device_id"
                id="deviceId"
                value={deviceId}
                rules={{ required: true }}
                label="Device"
                onChange={handleChangeDevice}
            >
               {devices.map(deviceDetails => (
                    <MenuItem value={deviceDetails.deviceId}> {deviceDetails.deviceName} </MenuItem>
                ))}
            </Select>
        </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="studentId"
            name="studentId"
            label="Student Id"
            fullWidth
            type="number"
            value={studentId}
            onChange={handleChangeStudentId}
          />
        </Grid>

        <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
          <DesktopDatePicker
            label="Date"
            inputFormat="dd-MM-yyyy"
            value={day}
            onChange={handleChangeDay}
            renderInput={(params) => <TextField {...params} />}
          />
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

        <div style={{ display: 'inline-block', height: '350px', width: '600px', margin: '25px 0px 25px 25px' }}>
          <Typography component="h1" variant="h6" align="center" white-space='post-wrap'>
            Reservations
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={4}
            rowsPerPageOptions={[20]}
            disableSelectionOnClick
          >
          </DataGrid>
        </div>
      </Grid>
    </React.Fragment>
  );
}