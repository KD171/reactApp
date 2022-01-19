import React, {useState, useEffect, Component } from 'react';
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
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

import { FormControlUnstyledContext } from '@mui/material';

export default function CreateBuilding() {
    const [buildingName, setBuildingName] = useState();
    const [shortName, setShortName] = useState();
    const [city, setCity] = useState();
    const [street, setStreet] = useState();
    const [number, setNumber] = useState();
    const [postCode, setPostCode] = useState();
    const [description,setDescription] = useState();
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [responseAns, setResponseAns] = useState();

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

    const handleSubmit = () => {
        API.post('/building/newBuilding', {
                "buildingName": buildingName,
                "shortName": shortName,
                "city": city,
                "street": street,
                "number": number,
                "postCode": postCode,
                "description": description
        }).then(response => {
          console.log(open)
            if (response.status === 201) {
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
          <TextField
            required
            id="buildingName"
            name="buildingName"
            label="Name"
            fullWidth
            value={buildingName}
            onChange={handleChangeBuildingName}
          />
        </Grid>
        
        <Grid item xs={12}>
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

        <Grid item xs={12}>
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

        <Grid item xs={12}>
          <TextField
            id="street"
            required
            name="street"
            label="Street"
            fullWidth
            value={street}
            onChange={handleChangeStreet}
          />
        </Grid>

        <Grid item xs={12}>
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

        <Grid item xs={12}>
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

        <Grid item xs={12}>
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
            {'Create'}
            </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}