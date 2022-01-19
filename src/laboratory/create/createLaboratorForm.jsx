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

export default function Laboratory() {
    const [buildings, setBuildings] = useState();
    const [buildingId, setBuildingId] = useState();
    const [floor, setFloor] = useState();
    const [roomNumber, setRoomNumber] = useState();
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [numberOfLaboratoryStation, setNumberOfLaboratoryStation] = useState();
    const [responseAns, setResponseAns] = useState();
    const [description,setDescription] = useState();
    const [labId,setLabId] = useState();

    useEffect(() => {
        getBuildingFromApi();
    }, []);

    const handleChangeBuilding = (event) => {
        setBuildingId(event.target.value);
    };
    const handleChangeFloor = (event) => {
        setFloor(event.target.value);
    };
    const handleChangeRoomNumber = (event) => {
        setRoomNumber(event.target.value);
    };
    const handleChangeNumberOfLaboratoryStation = (event) => {
        setNumberOfLaboratoryStation(event.target.value);
    };

    const handleChangeDescription = (event) => {
      setDescription(event.target.value);
    };



    const handleSubbmit = () => {
        API.post('/laboratory/newLaboratory', {
                "buildingId": buildingId,
                "floor": floor,
                "roomNumber": roomNumber,
                "numberOfLaboratoryStation": numberOfLaboratoryStation
        }).then(response => {
          console.log(open)
            if (response.status === 201) {
                setOpen(true)
                setErrorOpen(false)
                setLabId(response.data.laboratoryId)
            }
        }).catch(error => {console.error(error)
                      console.log(error.response.data.error);
                      console.log(error.response.data);
                      if (error.response.data.status === 400) {
                          setErrorMessage('Wrong parameters');
                          setErrorOpen(true)
                      }else if(error.response.data !== null){
                        setErrorMessage(error.response.data);
                        setErrorOpen(true)
                      }
              })

    };

    const getBuildingFromApi = () => {
        API.get('/building/getAll', {
        }).then(response => {
            setBuildings(response.data)
        }).catch(error => console.error(error));
    }
    if(!buildings)
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
        <FormControl fullWidth>
            <InputLabel id="buildingId" required>Building</InputLabel>
            <Select
                labelId="building_id"
                id="buildingId"
                value={buildingId}
                rules={{ required: true }}
                label="Building"
                onChange={handleChangeBuilding}
            >
               {buildings.map(buildingDetails => (
                    <MenuItem value={buildingDetails.buildingId}> {buildingDetails.buildingName} </MenuItem>
                ))}
            </Select>
        </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="floor"
            name="floor"
            label="Floor"
            fullWidth
            value={floor}
            onChange={handleChangeFloor}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            required
            id="roomNumber"
            name="roomNumber"
            label="Room Number"
            fullWidth
            value={roomNumber}
            onChange={handleChangeRoomNumber}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="max_laboratory_station"
            name="max_laboratory_station"
            label="Max laboratory station"
            fullWidth
            value={numberOfLaboratoryStation}
            onChange={handleChangeNumberOfLaboratoryStation}
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
            onClick={handleSubbmit}
            >
            {'Create'}
            </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}