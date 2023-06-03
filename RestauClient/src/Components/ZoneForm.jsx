import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const ZoneForm = ({ onZoneAdded }) => {
  const [name, setName] = useState('');
  const [cityId, setCityId] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9099/api/cities').then((response) => {
      setCities(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:9099/api/zones/save', {
        name,
        city: {
          id: cityId,
        },
      })
      .then((response) => {
        //onZoneAdded(response.data);
        setName('');
        setCityId('');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>City</InputLabel>
          <Select value={cityId} onChange={(event) => setCityId(event.target.value)} label="City">
            <MenuItem value="">
              <em>Select a city</em>
            </MenuItem>
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button type="submit" variant="contained" color="primary">
        Add Zone
      </Button>
    </form>
  );
};

export default ZoneForm;
