import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

const SpecialiteForm = () => {
  const [specialites, setSpecialites] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9099/api/specialites/').then((response) => {
      setSpecialites(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this specialite?')) {
      axios.delete(`http://localhost:9099/api/specialites/${id}`).then(() => {
        setSpecialites(specialites.filter((specialite) => specialite.id !== id));
      });
    }
  };

  const handleEdit = (id) => {
    const newName = window.prompt('Enter the new name for this specialite:');
    if (newName) {
      axios.put(`http://localhost:9099/api/specialites/${id}`, { nom: newName }).then(() => {
        setSpecialites(specialites.map((specialite) => {
          if (specialite.id === id) {
            return { ...specialite, nom: newName };
          }
          return specialite;
        }));
      });
    }
  };

  return (
    <div>
      <h2>Specialite List</h2>
      <Link to="/specialitelist" component={Button} variant="contained" color="primary">
        Create Specialite
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
          {specialites.map((specialite) => (
            <TableRow key={specialite.id}>
              <TableCell>{specialite.id}</TableCell>
              <TableCell>{specialite.nom}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(specialite.id)}>
                  Delete
                </Button>
                <Button variant="contained" color="primary" onClick={() => handleEdit(specialite.id)}>
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

export default SpecialiteForm;
