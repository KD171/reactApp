import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import API from '../../main/api'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AlertDialogSlide from './AlertDialogSlide'

export default function EditLaboratoryForm() {
    const [open, setOpen] = useState(false);

    const [laboratoryId, setLaboratoryId] = useState();
    const [buildingId, setBuildingId] = useState();
    const [floor, setFloor] = useState();
    const [roomNumber, setRoomNumber] = useState();
    const [numberOfLaboratoryStation, setNumberOfLaboratoryStation] = useState();
    const [description, setDescription] = useState();
    const [createdDate, setCreatedDate] = useState();
    const [status, setStatus] = useState();
    const [laboratory, setLaboratory] = useState();
    const [buildings, setBuildings] = useState();


    useEffect(() => {
        getBuildingFromApi();
        getLaboratoryFromApi();
    }, []);

    const { id } = useParams();

    const handleChangeBuilding = (event) => {
        setBuildingId(event.target.value);
    };
    const handleChangeFloor = (event) => {
        setFloor(event.target.value);
    }

    const handleChangeRoomNumber = (event) => {
        setRoomNumber(event.target.value);
    };

    const handleChangeNumberOfLaboratoryStation = (event) => {
      setNumberOfLaboratoryStation(event.target.value);
    };

    const handleChangeDescription = (event) => {
      setDescription(event.target.value);
    };

    const handleSubmit = () => {
        console.info(description)
        API.post('/laboratory/updateLaboratory', {
          "laboratoryId": laboratoryId,
          "buildingId": buildingId,
          "floor": floor,
          "roomNumber": roomNumber,
          "numberOfLaboratoryStation": numberOfLaboratoryStation,
          "description": description,
          "createdDate": createdDate,
          "status": status
      }).then(response => {
          if (response.status === 202) {
              setOpen(true);
          }
        }).catch(error => console.error(error))
    };

    const getLaboratoryFromApi = () => {
    console.info(id)
        API.get('/laboratory/' + id, {
        }).then(response => {
        console.info(response.data)
            setLaboratoryId(response.data.laboratoryId);
            setBuildingId(response.data.buildingId);
            setFloor(response.data.floor);
            setRoomNumber(response.data.roomNumber);
            setNumberOfLaboratoryStation(response.data.numberOfLaboratoryStation);
            setDescription(response.data.description);
            setCreatedDate(response.data.createdDate);
            setStatus(response.data.status);
            setLaboratory(response.data);
        }).catch(error => console.error(error));
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



    if(!laboratory)
    return <React.Fragment>
            <Box sx={{ display: 'center' , 'justify-content': 'center'}}>
              <CircularProgress />
            </Box>
           </React.Fragment>


  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center" white-space='post-wrap'>
        Edit laboratory details
      </Typography>
      <Grid container spacing={3}>
      { open && <AlertDialogSlide/>}
        <Grid item xs={12}>
        <FormControl fullWidth>
            <InputLabel id="buildingId">Building</InputLabel>
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
            onClick={handleSubmit}
            >
            {'Update'}
            </Button>
        </Grid>

      </Grid>

    </React.Fragment>
  );
}