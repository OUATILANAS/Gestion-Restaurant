import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

const SerieForm = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9099/api/series/all').then((response) => {
      setSeries(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this serie?')) {
      axios.delete(`http://localhost:9099/api/series/${id}`).then(() => {
        setSeries(series.filter((serie) => serie.id !== id));
      });
    }
  };

  const handleEdit = (id) => {
    const newName = window.prompt('Enter the new name for this serie:');
    if (newName) {
      axios.put(`http://localhost:9099/api/series/${id}`, { nom: newName }).then(() => {
        setSeries(series.map((serie) => {
          if (serie.id === id) {
            return { ...serie, nom: newName };
          }
          return serie;
        }));
      });
    }
  };

  return (
    <div>
      <h2>Serie List</h2>
      <Link to="/serielist" component={Button} variant="contained" color="primary">
        Create Serie
      </Link>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {series.map((serie) => (
            <TableRow key={serie.id}>
              <TableCell>{serie.id}</TableCell>
              <TableCell>{serie.nom}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(serie.id)}>
                  Delete
                </Button>
                <Button variant="contained" color="primary" onClick={() => handleEdit(serie.id)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SerieForm;
