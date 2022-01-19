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
import API from '../main/api'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AlertDialogSlide from './AlertDialogSlide'
import { FormControlUnstyledContext } from '@mui/material';



export default function ReservationGrid() {
    const [open, setOpen] = useState(false);
    const [deviceId, setDeviceId] = useState();
    const [deviceName, setDeviceName] = useState();
    const [addressIp, setAddressIp] = useState();
    const [physicalAddress, setPhysicalAddress] = useState();

    const [laboratoryId, setLaboratoryId] = useState();
    const [description, setDescription] = useState();
    const [createdDate, setCreatedDate] = useState();
    const [status, setStatus] = useState();
    const [isReachable, setIsReachable] = useState();
    const [device, setDevice] = useState();




    useEffect(() => {
       // getReservationsFromAPI();
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







  return (
    <React.Fragment>

    </React.Fragment>
  );
}

