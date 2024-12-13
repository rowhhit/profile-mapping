import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "../style/ProfileCard.css";

const ProfileCard = ({ profile, onViewDetails, onShowMap }) => (
  <Card className="profile-card">
    <CardMedia
      component="img"
      height="240"
      image={profile.photo}
      alt={profile.name}
      className="profile-image"
    />
    <CardContent className="profile-content">
      <Typography variant="h6" className="profile-name">
        {profile.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="profile-description">
        {profile.description}
      </Typography>
    </CardContent>
    <div className="profile-buttons">
      <button className="custom-button primary" onClick={() => onShowMap(profile)}>
        View on Map
      </button>
      <button className="custom-button secondary" onClick={() => onViewDetails(profile)}>
        Details
      </button>
    </div>
  </Card>
);

const ProfileList = ({ profiles, onViewDetails, onShowMap }) => {
  const [visibleProfiles, setVisibleProfiles] = useState(profiles.slice(0, 4)); // Display first 3 profiles
  const [currentIndex, setCurrentIndex] = useState(4); // Start from the 5th profile

  const handleLoadMore = () => {
    const nextProfiles = profiles.slice(currentIndex, currentIndex + 4);
    setVisibleProfiles((prev) => [...prev, ...nextProfiles]);
    setCurrentIndex((prev) => prev + 4);
  };

  return (
    <div>
      <div className="profile-list">
        {visibleProfiles.map((profile) => (
          <ProfileCard
            key={profile.id} // Use unique key from profile.id
            profile={profile}
            onViewDetails={onViewDetails}
            onShowMap={onShowMap}
          />
        ))}
      </div>
      {currentIndex < profiles.length && (
        <button className="load-more" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default ProfileList;
