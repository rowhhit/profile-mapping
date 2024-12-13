import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import profilesData from "../data/profiles";
import ProfileList from "../components/ProfileCard"; // Import ProfileList
import "../style/home.css";

const Home = ({ setSelectedProfile }) => {
  const navigate = useNavigate();
  const sliderRef = useRef();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  const handleViewDetails = (profile) => {
    setSelectedProfile(profile);
    navigate(`/profile-details/${profile.id}`); // Pass the id to the route
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterLocation(event.target.value);
  };

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300; // Adjust scroll distance
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleAdminPanelClick = () => {
    navigate("/admin"); // Navigate to Admin Dashboard
  };

  // Filter profiles based on search term and location
  const filteredProfiles = profilesData.filter((profile) => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation === "" || profile.location === filterLocation;
    return matchesSearch && matchesLocation;
  });

  // Get unique locations for the filter dropdown
  const uniqueLocations = [...new Set(profilesData.map((profile) => profile.location))];

  return (
    <div className="home-container">
      <div className="admin-panel-button">
        <button onClick={handleAdminPanelClick} className="admin-panel-btn">
          Admin Panel
        </button>
      </div>

      <div className="heading">
        <h1>
          Profile <span className="highlight">Explorer</span>
        </h1>
        <p>Discover profiles and their locations in style!</p>
      </div>

      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />

        <select
          value={filterLocation}
          onChange={handleFilterChange}
          className="filter-dropdown"
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="slider-section">
        <button
          className="nav-button left"
          onClick={() => handleScroll("left")}
        >
          &lt;
        </button>
        <div className="slider-container" ref={sliderRef}>
          <div className="slider">
            <ProfileList
              profiles={filteredProfiles}
              onViewDetails={handleViewDetails}
              onShowMap={(profile) => console.log("Show Map:", profile)}
            />
          </div>
        </div>
        <button
          className="nav-button right"
          onClick={() => handleScroll("right")}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Home;
