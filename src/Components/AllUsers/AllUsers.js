import React, { useState, useEffect } from "react";
import "./AllUsers.css";

const UserGrid = () => {
  const [users, setUsers] = useState([]); // All users
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const token = "your_token_here"; // Replace with actual token

    fetch("http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Corrected the Authorization header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data); 
        } else {
          console.error("Unexpected API response:", data);
          setError("Failed to load users");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Error fetching users"); 
      });
  }, []);

  return (
    <div className="user-grid-container">
      <h1>All Users</h1>
      {error && <p className="error">{error}</p>} 
      <div className="user-grid">
        {users.length === 0 ? (
          <p>No users found</p> 
        ) : (
          users.map((user, index) => (
            <div key={index} className="user-card">
              <img
                src={user.avatar || "default-avatar.jpg"}
                alt={`${user.firstName} ${user.lastName}`}
                className="user-avatar"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserGrid;
