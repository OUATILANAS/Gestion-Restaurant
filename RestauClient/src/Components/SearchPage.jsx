import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header/Header';
import { Card, CardContent, CardMedia, Typography, Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const SearchPage = () => {
  const [villes, setVilles] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [restos, setRestos] = useState([]);

  useEffect(() => {
    getVilles();
  }, []);

  const getVilles = async () => {
    try {
      const response = await axios.get('http://localhost:9099/api/cities');
      setVilles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getZonesByVille = async (cityId) => {
    try {
      const response = await axios.get(`http://localhost:9099/api/zones/city/${cityId}`);
      setZones(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRestaurantsByVilleZones = () => {
    axios
      .get(`http://localhost:9099/api/cities/${selectedValue}/zones/${selectedZone}/restaurants`)
      .then((response) => {
        setRestos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (selectedValue) {
      getZonesByVille(selectedValue);
    }
  }, [selectedValue]);

  const handleChange = (event) => {
    const selectedCityId = event.target.value;
    setSelectedValue(selectedCityId);
    setSelectedZone('');
    if (selectedCityId) {
      getZonesByVille(selectedCityId);
    } else {
      setZones([]);
    }
  };

  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };

  const handleFindClick = () => {
    getRestaurantsByVilleZones();
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Search Restaurants
      </Typography>
      <FormControl variant="outlined" fullWidth style={{ marginBottom: '16px' }}>
        <InputLabel>City</InputLabel>
        <Select value={selectedValue} onChange={handleChange} label="City">
          <MenuItem value="">
            <em>Select a city</em>
          </MenuItem>
          {villes.map((ville) => (
            <MenuItem key={ville.id} value={ville.id}>
              {ville.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth style={{ marginBottom: '16px' }}>
        <InputLabel>Zone</InputLabel>
        <Select value={selectedZone} onChange={handleZoneChange} label="Zone">
          <MenuItem value="">
            <em>Select a zone</em>
          </MenuItem>
          {zones.map((zone) => (
            <MenuItem key={zone.id} value={zone.id}>
              {zone.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleFindClick}>
        Search
      </Button>

      {restos.length > 0 ? (
        <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap' }}>
          {restos.map((resto) => (
            <Card key={resto.id} style={{ width: 300, margin: '10px' }}>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:9099/${resto.photo}`} // Assuming `photo` contains the image URL
                alt={resto.nom} // Assuming `nom` contains the restaurant name
              />
                 <div className='col-md-5 py-3'>
                    <iframe
                        className='rounded-3 justify-content-center'
                        title="Google Maps"
                        width="100%"
                        height="100%"
                        src={"https://maps.google.com/maps?q=" + resto.lattitude + "," + resto.longitude + "&hl=es;&output=embed"}
                        allowFullScreen
                    ></iframe>
                </div>
              <CardContent>
                <Typography variant="h5" component="div">
                  {resto.nom}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {resto.adresse}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Opening Hours: {resto.open_hour} - {resto.close_hour}
                </Typography>
                {/* Add more details as needed */}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchPage;
