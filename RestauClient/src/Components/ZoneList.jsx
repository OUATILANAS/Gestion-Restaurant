import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  addButton: {
    textDecoration: "none",
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "0.5rem",
    padding: "0.5rem 1rem",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  table: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  actionButton: {
    marginRight: theme.spacing(1),
  },
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "300px",
    padding: theme.spacing(2),
    borderRadius: "0.5rem",
    backgroundColor: theme.palette.background.default,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  modalInput: {
    marginBottom: theme.spacing(2),
  },
  modalButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  cancelButton: {
    marginRight: theme.spacing(1),
  },
}));

const ZoneList = ({ cityId }) => {
  const classes = useStyles();
  const [zones, setZones] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [cities, setCities] = useState([]);
  const [zoneName, setZoneName] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:9099/api/zones`);
      setZones(result.data);
    };
    fetchData();
  }, [cityId]);

  useEffect(() => {
    const fetchCities = async () => {
      const result = await axios(`http://localhost:9099/api/cities`);
      setCities(result.data);
    };
    fetchCities();
  }, []);

  const handleDelete = (zoneId) => {
    if (window.confirm("Are you sure you want to delete this zone?")) {
      axios.delete(`http://localhost:9099/api/zones/${zoneId}`).then(() => {
        setZones(zones.filter((zone) => zone.id !== zoneId));
      });
    }
  };

  const handleOpenModal = (zone) => {
    setSelectedZone(zone);
    setZoneName(zone.name);
    setSelectedCityId(zone.city && zone.city.id);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedZone(null);
    setZoneName("");
    setSelectedCityId("");
    setModalIsOpen(false);
  };

  const handleSave = () => {
    if (!selectedZone) return;

    const updatedZone = {
      ...selectedZone,
      name: zoneName,
      city: { id: selectedCityId },
    };

    axios
      .put(`http://localhost:9099/api/zones/${selectedZone.id}`, updatedZone)
      .then((response) => {
        setZones(zones.map((zone) => (zone.id === selectedZone.id ? response.data : zone)));
        handleCloseModal();
      })
      .catch((error) => {
        // Handle error
        // Display an error message or perform any necessary error handling
      });
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>Zones</h2>
      <Link to={`/create-zone`} className={`btn btn-primary ${classes.addButton}`}>
        Add Zone
      </Link>
      <table className={`table ${classes.table}`}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone) => (
            <tr key={zone.id}>
              <td>{zone.id}</td>
              <td>{zone.name}</td>
              <td>{zone.city && zone.city.name}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(zone.id)}
                  className={classes.actionButton}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenModal(zone)}
                  className={classes.actionButton}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal open={modalIsOpen} onClose={handleCloseModal}>
        <div className={classes.modalContainer}>
          <h3>Modification de la zone</h3>
          <div className={classes.modalContent}>
            <TextField
              label="Nom de la zone"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
              className={classes.modalInput}
            />
            <Select
              label="Ville"
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className={classes.modalInput}
            >
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
            <div className={classes.modalButtonContainer}>
              <Button
                variant="contained"
                color="default"
                onClick={handleCloseModal}
                className={classes.cancelButton}
              >
                Annuler
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ZoneList;
