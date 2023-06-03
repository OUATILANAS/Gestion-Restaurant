import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select, Typography, TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(4),
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: 200,
  },
  fileInput: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const RestaurantForm = ({ onRestaurantAdded }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [adresse, setAdresse] = useState("");
  const [lattitude, setLattitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [week, setWeek] = useState("");
  const [rank, setRank] = useState("");
  const [openHour, setOpenHour] = useState("");
  const [closeHour, setCloseHour] = useState("");
  const [selectedSerie, setSelectedSerie] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [series, setSeries] = useState([]);
  const [users, setUsers] = useState([]);
  const [zones, setZones] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [seriesResponse, usersResponse, zonesResponse] = await Promise.all([
        axios.get("http://localhost:9099/api/series/all"),
        axios.get("http://localhost:9099/api/users/"),
        axios.get("http://localhost:9099/api/zones/"),
      ]);

      setSeries(seriesResponse.data);
      setUsers(usersResponse.data);
      setZones(zonesResponse.data);
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("photo", imageFile);

    // Append other form data properties to the formData object
    formData.append("nom", name);
    formData.append("adresse", adresse);
    formData.append("lattitude", lattitude);
    formData.append("longitude", longitude);
    formData.append("week", week);
    formData.append("rank", rank);
    formData.append("open_hour", openHour);
    formData.append("close_hour", closeHour);
    formData.append("serie", selectedSerie);
    formData.append("user", selectedUser);
    formData.append("zone", selectedZone);

    axios
      .post("http://localhost:9099/api/restaurants/", formData)
      .then((response) => {
        // Handle response
        onRestaurantAdded(response.data);
        setName("");
        setAdresse("");
        setLattitude("");
        setLongitude("");
        setWeek("");
        setRank("");
        setOpenHour("");
        setCloseHour("");
        setSelectedSerie("");
        setSelectedUser("");
        setSelectedZone("");
        setImageFile(null); // Reset the image file state

      })
      .catch((error) => {
        console.log(error);
      });
      window.location.href = '/restaurantlist';
  };

  return (
    <form onSubmit={handleSubmit} className={classes.formContainer} encType="multipart/form-data">
      <Typography variant="h4" align="center" gutterBottom>
        Add Restaurant
      </Typography>
      <TextField
        type="text"
        label="Name"
        className={classes.formControl}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        type="text"
        label="Address"
        className={classes.formControl}
        value={adresse}
        onChange={(event) => setAdresse(event.target.value)}
      />
      <TextField
        type="text"
        label="Latitude"
        className={classes.formControl}
        value={lattitude}
        onChange={(event) => setLattitude(event.target.value)}
      />
      <TextField
        type="text"
        label="Longitude"
        className={classes.formControl}
        value={longitude}
        onChange={(event) => setLongitude(event.target.value)}
      />
      <TextField
        type="text"
        label="Week"
        className={classes.formControl}
        value={week}
        onChange={(event) => setWeek(event.target.value)}
      />
      <TextField
        type="text"
        label="Rank"
        className={classes.formControl}
        value={rank}
        onChange={(event) => setRank(event.target.value)}
      />
      <TextField
        type="text"
        label="Open Hour"
        className={classes.formControl}
        value={openHour}
        onChange={(event) => setOpenHour(event.target.value)}
      />
      <TextField
        type="text"
        label="Close Hour"
        className={classes.formControl}
        value={closeHour}
        onChange={(event) => setCloseHour(event.target.value)}
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="serie-label">Serie</InputLabel>
        <Select
          labelId="serie-label"
          id="serie"
          value={selectedSerie}
          onChange={(event) => setSelectedSerie(event.target.value)}
        >
          <MenuItem value="">
            <em>-- Select Serie --</em>
          </MenuItem>
          {series.map((serie) => (
            <MenuItem key={serie.id} value={serie.id}>
              {serie.nom}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="user-label">User</InputLabel>
        <Select
          labelId="user-label"
          id="user"
          value={selectedUser}
          onChange={(event) => setSelectedUser(event.target.value)}
        >
          <MenuItem value="">
            <em>-- Select User --</em>
          </MenuItem>
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="zone-label">Zone</InputLabel>
        <Select
          labelId="zone-label"
          id="zone"
          value={selectedZone}
          onChange={(event) => setSelectedZone(event.target.value)}
        >
          <MenuItem value="">
            <em>-- Select Zone --</em>
          </MenuItem>
          {zones.map((zone) => (
            <MenuItem key={zone.id} value={zone.id}>
              {zone.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={classes.fileInput}>
        <InputLabel htmlFor="image">Image</InputLabel>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(event) => setImageFile(event.target.files[0])}
        />
      </div>
      <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
        Add Restaurant
      </Button>
    </form>
  );
};

export default RestaurantForm;
