import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    borderRadius: "0.5rem",
    backgroundColor: theme.palette.background.default,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  input: {
    borderRadius: "0.5rem",
    padding: "0.5rem",
  },
  button: {
    borderRadius: "0.5rem",
    padding: "0.5rem 2rem",
  },
  link: {
    textDecoration: "none",
  },
}));

const CityForm = () => {
  const classes = useStyles();
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:9099/api/cities/", { name }).then(() => {
      // Redirect to the city list page
      window.location.href = "/citylist";
    });
  };

  return (
    <div className={classes.container}>
      <h2 className="my-4 text-center">Create City</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <TextField
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={classes.input}
          />
        </div>
        <div className="text-center">
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Create
          </Button>
        </div>
      </form>
      <div className="text-center mt-3">
        <Link to="/citylist" className={classes.link}>Back to City List</Link>
      </div>
    </div>
  );
};

export default CityForm;
