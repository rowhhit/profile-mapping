import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProfileDetails from "./components/ProfileDetails";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./components/AdminDashboard"; // Import AdminDashboard
import profiles from "./data/profiles.js";

const App = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home setSelectedProfile={setSelectedProfile} />}
        />
        <Route
          path="/profile-details/:id" // Make sure to pass the id as a parameter
          element={<ProfileDetails profiles={profiles} />}
        />
        <Route path="/admin" element={<AdminDashboard />} /> {/* Admin Dashboard Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
