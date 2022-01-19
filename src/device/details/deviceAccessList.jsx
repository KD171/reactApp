import React, {useState, useEffect, Component } from 'react';
import { useParams } from 'react-router';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import API from '../../main/api'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AlertDialogSlide from './AlertDialogSlide'
import { FormControlUnstyledContext } from '@mui/material';



export default function DeviceAccessList() {
    const [open, setOpen] = useState(false);
    const [deviceId, setDeviceId] = useState();
    const [deviceName, setDeviceName] = useState();
    const [addressIp, setAddressIp] = useState();
    const [physicalAddress, setPhysicalAddress] = useState();
    const [rows, setRows] = useState();
    const [laboratoryId, setLaboratoryId] = useState();
    const [description, setDescription] = useState();
    const [createdDate, setCreatedDate] = useState();
    const [status, setStatus] = useState();
    const [isReachable, setIsReachable] = useState();
    const [device, setDevice] = useState();

    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'dayOfWeek',
        headerName: 'Day Of Week',
        width: 140,
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
      {
        field: "",
        renderCell: (cellValues) => {
            const handleClickShow = () => {
            API.post('/device/deleteAccessRole/' + cellValues.id).then(response => {
              if (response.status === 200) {
                  getDeviceAccessFromApi();

              }
            }).catch(error => console.error(error))
            };
          return (
            <IconButton
              variant="contained"
              color="primary"
              onClick={handleClickShow}
            >
              <DeleteIcon />
            </IconButton>
          );
        }
      },
    ];


    useEffect(() => {
        getDeviceAccessFromApi();
    }, []);

    const { id } = useParams();

    const handleChangeLaboratory = (event) => {
        setLaboratoryId(event.target.value);
    };

    const handleChangeDeviceName = (event) => {
      setDeviceName(event.target.value);
    };

    const handleChangeDescription = (event) => {
      setDescription(event.target.value);
    };

    const handleChangeLaboratoryId = (event) => {
      setLaboratoryId(event.target.value);
    };

    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
    };

    const buttonClick = (event) => {
      window.open("/device/newRole/" + id, "_self");
    }


    const getDeviceAccessFromApi = () => {
        API
          .get('/device/getAccess/' + id)
          .then((response) => response.data)
          .then((data) => {
            data.map((exam) => {
                exam['id'] = exam.accessId
                if (exam['dayOfWeek'] == '2')
                  exam['dayOfWeek'] = 'Monday'
                else if (exam['dayOfWeek'] == '3')
                  exam['dayOfWeek'] = 'Tuesday'
                else if (exam['dayOfWeek'] == '4')
                 exam['dayOfWeek'] = 'Wednesday'
                else if (exam['dayOfWeek'] == '5')
                  exam['dayOfWeek'] = 'Thursday'
                else if (exam['dayOfWeek'] == '6')
                 exam['dayOfWeek'] = 'Friday'
                else if (exam['dayOfWeek'] == '7')
                  exam['dayOfWeek'] = 'Saturday'
                else if (exam['dayOfWeek'] == '1')
                 exam['dayOfWeek'] = 'Sunday'
                 //exam['timeStart'] =
                 console.info(exam['timeStart'])
                 var date = new Date();
                 date.setHours(exam['timeStart'][0]);
                 date.setMinutes(exam['timeStart'][1]);
                 exam['timeStart'] = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                  date.setHours(exam['timeEnd'][0]);
                  date.setMinutes(exam['timeEnd'][1]);
                  exam['timeEnd'] = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            })
            setRows(data);
          });


    };




  return (
    <React.Fragment>
          <div style={{ display: 'inline-block', height: '350px', width: '670px', margin: '25px 25px 25px 25px' }}>
            <Typography component="h1" variant="h6" align="center" white-space='post-wrap'>
              Access Role
              <Button onClick={buttonClick}>New role</Button>
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
    </React.Fragment>
  );
}

