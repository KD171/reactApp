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

export default function EditBuildingForm() {
    const [building, setBuilding] = useState();
    const [buildingId, setBuildingId] = useState();
    const [buildingName, setBuildingName] = useState();
    const [shortName, setShortName] = useState();
    const [city, setCity] = useState();
    const [street, setStreet] = useState();
    const [number, setNumber] = useState();
    const [postCode, setPostCode] = useState();
    const [description,setDescription] = useState();
    const [status, setStatus] = useState();
    const [open, setOpen] = useState(false);
    const [responseAns, setResponseAns] = useState();

    useEffect(() => {
        getBuildingFromApi();
    }, []);

    const { id } = useParams();

    const handleChangeBuildingId = (event) => {
        setBuildingId(event.target.value);
    };

    const handleChangeBuildingName = (event) => {
        setBuildingName(event.target.value);
    };

    const handleChangeShortName = (event) => {
        setShortName(event.target.value);
    };
    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };
    const handleChangeStreet = (event) => {
        setStreet(event.target.value);
    };
    const handleChangeNumber= (event) => {
        setNumber(event.target.value);
    };

    const handleChangePostCode = (event) => {
        setPostCode(event.target.value);
    };

    const handleChangeDescription = (event) => {
      setDescription(event.target.value);
    };

    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
    };


    const handleSubmit = () => {
        API.post('/building/update', {
                "buildingId": buildingId,
                "buildingName": buildingName,
                "shortName": shortName,
                "city": city,
                "street": street,
                "number": number,
                "postCode": postCode,
                "description": description,
                "status": status
      }).then(response => {
          if (response.status === 200) {
              setOpen(true);
              console.info(open);
              console.info(response.status)
          }
        }).catch(error => console.error(error))
    };

    const getBuildingFromApi = () => {
        API.get('/building/' + id, {
        }).then(response => {
            setBuildingId(response.data.buildingId);
            setBuildingName(response.data.buildingName);
            setShortName(response.data.shortName);
            setCity(response.data.city);
            setStreet(response.data.street);
            setNumber(response.data.number);
            setPostCode(response.data.postCode);
            setDescription(response.data.description);
            setBuilding(response.data);
        }).catch(error => console.error(error));
    };

    if(!building)
    return <React.Fragment>
            <Box sx={{ display: 'center' , 'justify-content': 'center'}}>
              <CircularProgress />
            </Box>
           </React.Fragment>


  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center" white-space='post-wrap'>
        Edit building details
      </Typography>
      { open && <AlertDialogSlide/>}


        <Grid item xs={12} sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
          <TextField
            required
            id="buildingId"
            name="buildingId"
            disabled
            label="Id"
            fullWidth
            value={buildingId}
          />
        </Grid>
        <Grid item xs={12} sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
          <TextField
            required
            id="buildingName"
            name="buildingName"
            label="Building Name"
            fullWidth
            value={buildingName}
            onChange={handleChangeBuildingName}
          />
        </Grid>
        <Grid item xs={12} sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
          <TextField
            required
            id="shortName"
            name="shortName"
            label="Short Name"
            fullWidth
            value={shortName}
            onChange={handleChangeShortName}
          />
        </Grid>
        <Grid item xs={12} sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            value={city}
            onChange={handleChangeCity}
          />
        </Grid>
        <Grid item xs={12} sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
          <TextField
            required
            id="street"
            name="street"
            label="Street"
            fullWidth
            value={street}
            onChange={handleChangeStreet}
          />
        </Grid>
        <Grid item xs={12} sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
          <TextField
            required
            id="number"
            name="number"
            label="Number"
            fullWidth
            value={number}
            onChange={handleChangeNumber}
          />
        </Grid>
        <Grid item xs={12} sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
          <TextField
            required
            id="postCode"
            name="postCode"
            label="Post Code"
            fullWidth
            value={postCode}
            onChange={handleChangePostCode}
          />
        </Grid>
        <Grid item xs={12} sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
          <TextField
            id="description"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={2}
            maxRows={4}
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