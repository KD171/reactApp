import React, {useState, useEffect, Component } from 'react';
import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import API from '../../main/api'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AlertDialogSlide from './AlertDialogSlide'


import { FormControlUnstyledContext } from '@mui/material';

export default function EditDeviceForm() {
    const [open, setOpen] = useState(false);
    const [deviceId, setDeviceId] = useState();
    const [deviceName, setDeviceName] = useState();
    const [addressIp, setAddressIp] = useState();
    const [physicalAddress, setPhysicalAddress] = useState();
    const [laboratoryId, setLaboratoryId] = useState();
    const [description, setDescription] = useState();
    const [createdDate, setCreatedDate] = useState();
    const [createdDate2, setCreatedDate2] = useState();
    const [status, setStatus] = useState();
    const [isReachable, setIsReachable] = useState();
    const [device, setDevice] = useState();
    const [laboratory, setLaboratory] = useState();

    useEffect(() => {
        getDeviceFromApi();
        getLaboratoryFromApi();
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

    const handleSubmit = () => {
        API.post('/device/updateDevice/' + id, {
          "deviceId": deviceId,
          "deviceName": deviceName,
          "addressIp": addressIp,
          "physicalAddress": physicalAddress,
          "laboratoryId": laboratoryId,
          "description": description,
          "createdDate": createdDate2,
          "status": status,
          "isReachable": isReachable
      }).then(response => {
          if (response.status === 200) {
              setOpen(true);
              console.info(open);
              console.info(response.status)
          }
        }).catch(error => console.error(error))
    };

    const getDeviceFromApi = () => {
    console.info(id)
        API.get('/device/getDevice/' + id, {
        }).then(response => {
            setDeviceId(response.data.deviceId);
            setDeviceName(response.data.deviceName);
            setAddressIp(response.data.addressIp);
            setPhysicalAddress(response.data.physicalAddress);
            setLaboratoryId(response.data.laboratoryId);
            setDescription(response.data.description);
            setCreatedDate(new Intl.DateTimeFormat('pl-PL',
            { year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(response.data.createdDate))
            setCreatedDate2(response.data.createdDate);
            setStatus(response.data.status);
            setIsReachable(response.data.isReachable);
            setDevice(response.data);
        }).catch(error => console.error(error));
    };
    const getLaboratoryFromApi = () => {
        API.get('/laboratory/getAll', {
        }).then(response => {
            setLaboratory(response.data)
        }).catch(error => console.error(error));
    }

    if((!device) || (!laboratory))
    return <React.Fragment>
            <Box sx={{ display: 'center' , 'justify-content': 'center'}}>
              <CircularProgress />
            </Box>
           </React.Fragment>



  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center" white-space='post-wrap'>
        Edit device details
      </Typography>
      { open && <AlertDialogSlide/>}


        <Grid item xs={12} sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
          <TextField
            required
            id="deviceName"
            name="deviceName"
            label="Device Name"
            fullWidth
            value={deviceName}
            onChange={handleChangeDeviceName}
          />
        </Grid>
        <Grid item xs={12} sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
          <TextField
            required
            id="addressIp"
            disabled
            name="addressIp"
            label="Address Ip"
            fullWidth
            value={addressIp}
          />
        </Grid>
        <Grid item xs={12} sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
          <TextField
            required
            id="physicalAddress"
            name="physicalAddress"
            disabled
            label="Physical Address"
            fullWidth
            value={physicalAddress}
          />
        </Grid>
        <Grid item xs={12} sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
        <FormControl fullWidth>
            <InputLabel id="laboratoryId" required>Laboratory</InputLabel>
            <Select
                labelId="laboratoryId"
                id="laboratoryId"
                value={laboratoryId}
                rules={{ required: true }}
                label="Laboratory"
                onChange={handleChangeLaboratoryId}
            >
               {laboratory.map(laboratoryDetails => (
                    <MenuItem value={laboratoryDetails.laboratoryId}> {laboratoryDetails.roomNumber} </MenuItem>
                ))}
            </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
          <TextField
            id="description"
            name="description"
            label="Description"
            multiline
            rows={2}
            maxRows={4}
            fullWidth
            value={description}
            onChange={handleChangeDescription}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex' , 'justify-content': 'left', 'align-items': 'center'}}>
            <Button
            variant="contained"
            onClick={handleSubmit}
            >
            {'Update'}
            </Button>
        </Grid>



    </React.Fragment>
  );
}