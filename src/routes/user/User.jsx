import React, { useState, useEffect } from 'react';
import { useUserQuery, useUserDeleteMutation } from "../../redux/api/userApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Add';
import './User.css';

const User = () => {
  const { data } = useUserQuery();
  const [likes, setLikes] = useState({});
  const [deleteUser] = useUserDeleteMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likes')) || {};
    setLikes(savedLikes);
  }, []);

  const handleDelete = (id) => {
    deleteUser(id);
    toast.success('User deleted successfully! 🥶');
  };

  const updateLocalStorage = (newLikes) => {
    localStorage.setItem('likes', JSON.stringify(newLikes));
  };

  const handleLike = (userId) => {
    const newLikes = {
      ...likes,
      [userId]: !likes[userId],
    };
    setLikes(newLikes);
    updateLocalStorage(newLikes);
    toast.success(newLikes[userId] ? 'You liked this user!' : 'You unliked this user 😒!');
  };

  const handleCreateUser = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <Button
          variant="contained"
          color="primary"
          startIcon={<CreateIcon />}
          onClick={handleCreateUser}
          className="w-full bg-indigo-500 text-white py-2 mb-6 hover:bg-indigo-600 transition-transform transform hover:scale-105"
        >
          Create User
        </Button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-lg p-6 hover:bg-gray-50 transition-transform transform hover:scale-105">
              <div className="flex flex-col items-center">
                <img
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-24 h-24 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110"
                />
                <h2 className="mt-4 text-lg font-bold text-gray-900">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div>
                  <IconButton onClick={() => handleLike(user.id)}>
                    <FavoriteIcon className={`transition-transform transform ${likes[user.id] ? 'text-red-500 scale-125' : 'text-gray-400 hover:scale-110'}`} />
                  </IconButton>
                  <span>{likes[user.id] ? 'Liked' : 'Not Liked'}</span>
                </div>
                <div className="flex space-x-2">
                  <Link to={`/single/${user.id}`}>
                    <Button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105">
                      View
                    </Button>
                  </Link>
                  <IconButton onClick={() => handleDelete(user.id)}>
                    <DeleteIcon className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-105" />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default User;
