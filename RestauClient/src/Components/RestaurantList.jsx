import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { Table } from "react-bootstrap";
import {
  makeStyles,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import {
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  addButton: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  cancelButton: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: 200,
  },
  fileInput: {
    marginTop: theme.spacing(2),
  },
}));

const RestaurantList = () => {
  const classes = useStyles();

  const [restaurants, setRestaurants] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const [series, setSeries] = useState([]);
  const [zones, setZones] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [
        restaurantResponse,
        seriesResponse,
        zonesResponse,
        usersResponse,
      ] = await Promise.all([
        axios.get("http://localhost:9099/api/restaurants/"),
        axios.get("http://localhost:9099/api/series/all"),
        axios.get("http://localhost:9099/api/zones/"),
        axios.get("http://localhost:9099/api/users/"),
      ]);

      setRestaurants(restaurantResponse.data);
      setSeries(seriesResponse.data);
      setZones(zonesResponse.data);
      setUsers(usersResponse.data);
    };

    fetchData();
  }, []);

  const handleDelete = (restaurantId) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      axios
        .delete(`http://localhost:9099/api/restaurants/${restaurantId}`)
        .then(() => {
          setRestaurants(restaurants.filter((restaurant) => restaurant.id !== restaurantId));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleOpenModal = (restaurant) => {
    setSelectedRestaurant({
      ...restaurant,
      serie: restaurant.serie ? restaurant.serie.id : "",
      user: restaurant.user ? restaurant.user.id : "",
      zone: restaurant.zone ? restaurant.zone.id : "",
    });
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRestaurant(null);
    setModalIsOpen(false);
  };

  const handleSave = () => {
    if (!selectedRestaurant) return;

    const updatedRestaurant = {
      ...selectedRestaurant,
      serie: { id: selectedRestaurant.serie },
      user: { id: selectedRestaurant.user },
      zone: { id: selectedRestaurant.zone },
    };

    axios
      .put(`http://localhost:9099/api/restaurants/${selectedRestaurant.id}`, updatedRestaurant)
      .then((response) => {
        setRestaurants((restaurants) =>
          restaurants.map((restaurant) =>
            restaurant.id === selectedRestaurant.id ? response.data : restaurant
          )
        );
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Restaurants</h2>
      <Link to={`/restaurant`} className={`btn btn-primary ${classes.addButton}`}>
        Add Restaurant
      </Link>
      <Table striped bordered hover>
      <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Latitude</TableCell>
            <TableCell>Longitude</TableCell>
            <TableCell>Week</TableCell>
            <TableCell>Rank</TableCell>
            <TableCell>Open Hour</TableCell>
            <TableCell>Close Hour</TableCell>
            <TableCell>Serie</TableCell>
            <TableCell>Photos</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Zone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td>{restaurant.id}</td>
              <td>{restaurant.nom}</td>
              <td>{restaurant.adresse}</td>
              <td>{restaurant.lattitude}</td>
              <td>{restaurant.longitude}</td>
              <td>{restaurant.week}</td>
              <td>{restaurant.rank}</td>
              <td>{restaurant.open_hour}</td>
              <td>{restaurant.close_hour}</td>
              <td>{restaurant.serie ? restaurant.serie.nom : ""}</td>
              <td>
                {restaurant.photo && (
                  <img
                    src={`http://localhost:9099/${restaurant.photo}`}
                    alt="Restaurant"
                    style={{ width: "100px" }}
                  />
                )}
              </td>
              <td>{restaurant.user ? restaurant.user.name : ""}</td>
              <td>{restaurant.zone ? restaurant.zone.name : ""}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleOpenModal(restaurant)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(restaurant.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
        {selectedRestaurant && (
          <div>
            <h3>Edit Restaurant</h3>
            <form>
              <TextField
                label="Name"
                value={selectedRestaurant.nom}
                onChange={(e) =>
                  setSelectedRestaurant({
                    ...selectedRestaurant,
                    nom: e.target.value,
                  })
                }
                fullWidth
                className={classes.formControl}
              />
              <TextField
                label="Address"
                value={selectedRestaurant.adresse}
                onChange={(e) =>
                  setSelectedRestaurant({
                    ...selectedRestaurant,
                    adresse: e.target.value,
                  })
                }
                fullWidth
                className={classes.formControl}
              />
              <TextField
                label="Latitude"
                value={selectedRestaurant.lattitude}
                onChange={(e) =>
                  setSelectedRestaurant({
                    ...selectedRestaurant,
                    lattitude: e.target.value,
                  })
                }
                fullWidth
                className={classes.formControl}
              />
              <TextField
                label="Longitude"
                value={selectedRestaurant.longitude}
                onChange={(e) =>
                  setSelectedRestaurant({
                    ...selectedRestaurant,
                    longitude: e.target.value,
                  })
                }
                fullWidth
                className={classes.formControl}
              />
              <TextField
                label="Week"
                value={selectedRestaurant.week}
                onChange={(e) =>
                  setSelectedRestaurant({
                    ...selectedRestaurant,
                    week: e.target.value,
                  })
                }
                fullWidth
                className={classes.formControl}
              />
              <TextField
                label="Rank"
                value={selectedRestaurant.rank}
                onChange={(e) =>
                  setSelectedRestaurant({
                    ...selectedRestaurant,
                    rank: e.target.value,
                  })
                }
                fullWidth
                className={classes.formControl}
              />
              <TextField
                label="Open Hour"
                value={selectedRestaurant.open_hour}
                onChange={(e) =>
                  setSelectedRestaurant({
                    ...selectedRestaurant,
                    open_hour: e.target.value,
                  })
                }
                fullWidth
                className={classes.formControl}
              />
              <TextField
                label="Close Hour"
                value={selectedRestaurant.close_hour}
                onChange={(e) =>
                  setSelectedRestaurant({
                    ...selectedRestaurant,
                    close_hour: e.target.value,
                  })
                }
                fullWidth
                className={classes.formControl}
              />
              <FormControl className={classes.formControl}>
                <InputLabel>Serie</InputLabel>
                <Select
                  value={selectedRestaurant.serie}
                  onChange={(e) =>
                    setSelectedRestaurant({
                      ...selectedRestaurant,
                      serie: e.target.value,
                    })
                  }
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
              <TextField
                type="file"
                label="Photo"
                onChange={(e) =>
                  setSelectedRestaurant({
                    ...selectedRestaurant,
                    photo: e.target.files[0],
                  })
                }
                fullWidth
                className={classes.formControl}
              />
              <FormControl className={classes.formControl}>
                <InputLabel>User</InputLabel>
                <Select
                  value={selectedRestaurant.user}
                  onChange={(e) =>
                    setSelectedRestaurant({
                      ...selectedRestaurant,
                      user: e.target.value,
                    })
                  }
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
                <InputLabel>Zone</InputLabel>
                <Select
                  value={selectedRestaurant.zone}
                  onChange={(e) =>
                    setSelectedRestaurant({
                      ...selectedRestaurant,
                      zone: e.target.value,
                    })
                  }
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
              <Button
                variant="primary"
                onClick={handleSave}
                className={classes.submitButton}
              >
                Save
              </Button>
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                className={classes.cancelButton}
              >
                Cancel
              </Button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RestaurantList;
