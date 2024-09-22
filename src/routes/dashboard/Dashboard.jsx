import React, { useState } from 'react';
import { useUserCreateMutation } from '../../redux/api/userApi';
import { Container, TextField, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; 
  import {notification } from 'antd';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [createUser] = useUserCreateMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({ name, job }).unwrap();
      notification.success({
        message: "Successfully created user! Go ahead 😊",
      });
      navigate("/");
    } catch (error) {
      toast.error('Failed to create user!');
    }
  };

  return (
    <Container sx={{ marginTop: 5 }} className="form-container">
      <Typography variant="h4" gutterBottom>Create User</Typography>
      <form onSubmit={handleSubmit} className="form">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
        <TextField
          label="Job"
          variant="outlined"
          fullWidth
          margin="normal"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
          className="input-field"
        />
        <Button type="submit" variant="contained" className="create-button">
          Create
        </Button>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default Dashboard;
