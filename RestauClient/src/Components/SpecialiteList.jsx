import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const SpecialiteList = () => {
  const [nom, setNom] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:9099/api/specialites/', { nom }).then(() => {
      // Redirect to the specialite list page
      window.location.href = '/specialitelist';
    });
  };

  return (
    <div>
      <h2>Create Specialites</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Name"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </div>
  );
};

export default SpecialiteList;
