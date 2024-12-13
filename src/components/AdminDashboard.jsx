import React, { useState } from 'react';
import profiles from '../data/profiles';
import { TextField, Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../style/AdminDashboard.css';

const AdminDashboard = () => {
  const [profileData, setProfileData] = useState({ name: '', photo: '', description: '', address: '', email: '', phone: '', interests: '' });
  const [editing, setEditing] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); // For pop-up
  const [dialogMessage, setDialogMessage] = useState(''); // Message in the pop-up
  const navigate = useNavigate();

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Add or update a profile
  const handleSave = () => {
    if (editing !== null) {
      profiles[editing] = { ...profileData, id: profiles[editing].id, details: { email: profileData.email, phone: profileData.phone, interests: profileData.interests.split(',') } };
      setDialogMessage('Profile updated successfully!');
    } else {
      const newProfile = { ...profileData, id: profiles.length + 1, details: { email: profileData.email, phone: profileData.phone, interests: profileData.interests.split(',') } };
      profiles.push(newProfile);
      setDialogMessage('New profile added successfully!');
    }
    setProfileData({ name: '', photo: '', description: '', address: '', email: '', phone: '', interests: '' });
    setEditing(null);
    setDialogOpen(true); // Open the dialog
  };

  // Edit a profile
  const handleEdit = (index) => {
    setProfileData({
      name: profiles[index].name,
      photo: profiles[index].photo,
      description: profiles[index].description,
      address: profiles[index].address,
      email: profiles[index].details.email,
      phone: profiles[index].details.phone,
      interests: profiles[index].details.interests.join(','),
    });
    setEditing(index);
  };

  // Delete a profile
  const handleDelete = (index) => {
    profiles.splice(index, 1);
    setDialogMessage('Profile deleted successfully!');
    setDialogOpen(true); // Open the dialog
  };

  // Close dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate('/'); // Optional navigation
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Admin Dashboard
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
        {/* Profile Management Form Section */}
        <Box sx={{ flex: 1, backgroundColor: '#fff', padding: 3, borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
          <Typography variant="h5" gutterBottom>
            {editing !== null ? 'Edit Profile' : 'Add Profile'}
          </Typography>
          <form>
            <TextField
              name="name"
              label="Name"
              value={profileData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="photo"
              label="Photo URL"
              value={profileData.photo}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="Description"
              value={profileData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="address"
              label="Address"
              value={profileData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              label="Email"
              value={profileData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="phone"
              label="Phone"
              value={profileData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="interests"
              label="Interests (comma separated)"
              value={profileData.interests}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button onClick={handleSave} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              {editing !== null ? 'Update Profile' : 'Add Profile'}
            </Button>
          </form>
        </Box>

        {/* Profile List Section */}
        <Box sx={{ flex: 1, backgroundColor: '#fff', padding: 3, borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
          <Typography variant="h5" gutterBottom>
            Existing Profiles
          </Typography>
          {profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 2,
                  marginBottom: 2,
                  borderRadius: '10px',
                  backgroundColor: '#f9f9f9',
                  boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="body1" noWrap>
                  {profile.name}
                </Typography>
                <div>
                  <Button variant="outlined" color="primary" onClick={() => handleEdit(index)} sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                </div>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No profiles available.
            </Typography>
          )}
        </Box>
      </Box>

      {/* Dialog for success message */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
