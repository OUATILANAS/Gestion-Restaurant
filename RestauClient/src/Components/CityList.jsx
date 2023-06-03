import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  createButton: {
    marginBottom: theme.spacing(2),
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  editButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

const CityList = () => {
  const classes = useStyles();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9099/api/cities").then((response) => {
      setCities(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      axios.delete(`http://localhost:9099/api/cities/${id}`).then(() => {
        setCities(cities.filter((city) => city.id !== id));
      });
    }
  };

  const handleEdit = (id) => {
    const newName = window.prompt("Enter the new name for this city:");
    if (newName) {
      axios.put(`http://localhost:9099/api/cities/${id}`, { name: newName }).then(() => {
        setCities(cities.map((city) => {
          if (city.id === id) {
            return { ...city, name: newName };
          }
          return city;
        }));
      });
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" align="center" gutterBottom>
        City List
      </Typography>
      <Link to="/create-city" className={`btn btn-primary ${classes.createButton}`}>
        Create City
      </Link>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cities.map((city) => (
              <TableRow key={city.id}>
                <TableCell>{city.id}</TableCell>
                <TableCell>{city.name}</TableCell>
                <TableCell>
                  <Button
                    className={`${classes.deleteButton}`}
                    onClick={() => handleDelete(city.id)}
                    variant="contained"
                  >
                    Delete
                  </Button>
                  <Button
                    className={`${classes.editButton} ml-2`}
                    onClick={() => handleEdit(city.id)}
                    variant="contained"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CityList;
