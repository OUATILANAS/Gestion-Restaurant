import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

const SerieList = () => {
  const [nom, setNom] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:9099/api/series/', { nom }).then(() => {
      // Navigate to "/serielist" after successful creation
      // using Link component from react-router-dom
    });
  };

  return (
    <div>
      <h2>Create Serie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">Name:</label>
          <TextField
            id="nom"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </div>
  );
};

export default SerieList;
