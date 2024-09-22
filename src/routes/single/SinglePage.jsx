import React from 'react';
import { useParams } from 'react-router-dom';
import { useDetailsQuery } from "../../redux/api/userApi";
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import './Details.css'; 

const Details = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useDetailsQuery(id);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading user details</Typography>;
  if (!data) return <Typography>User not found</Typography>;

  const user = data.data;

  return (
    <Container className="user-container" sx={{ marginTop: 5 }}>
      <Card className="custom-card" sx={{ maxWidth: 400, margin: 'auto' }}>
        <CardMedia
          component="img"
          className="user-avatar"
          image={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Email: {user.email}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Job: {user.job || 'Not specified'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Likes: {user.likes || 'Not specified'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Dislikes: {user.dislikes || 'Not specified'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Registration Date: {new Date(user.registration_date).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Details;
