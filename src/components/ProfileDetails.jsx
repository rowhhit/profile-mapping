import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import "../style/profile-details.css";

const ProfileDetails = ({ profiles }) => {
  const { id } = useParams(); // Get profile id from the URL
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Find the profile that matches the id
    const selectedProfile = profiles.find((profile) => profile.id === Number(id)); // Convert id to number
    setProfile(selectedProfile);
  }, [id, profiles]);

  if (!profile) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6">Profile Not Found!</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
          className="back-button"
        >
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box className="profile-details-container">
      <Typography variant="h4" gutterBottom>
        {profile.name}
      </Typography>
      <Typography className="description" variant="body1" color="text.secondary" gutterBottom>
        {profile.description}
      </Typography>
      <div className="contact-section">
        <Typography variant="h6" gutterBottom>
          Contact Information:
        </Typography>
        <List className="contact-list">
          <ListItem>
            <ListItemText primary="Email" secondary={profile.details.email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Phone" secondary={profile.details.phone} />
          </ListItem>
        </List>
      </div>
      <div className="interests-section">
        <Typography variant="h6" gutterBottom>
          Interests:
        </Typography>
        <List className="interests-list">
          {profile.details.interests.map((interest, index) => (
            <ListItem key={index}>
              <ListItemText primary={interest} />
            </ListItem>
          ))}
        </List>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ mt: 2 }}
        className="back-button"
      >
        Back to Profiles
      </Button>
    </Box>
  );
};

export default ProfileDetails;
