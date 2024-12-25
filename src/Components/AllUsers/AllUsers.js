import React, { useState, useEffect } from "react";
import "./AllUsers.css";

const UserGrid = () => {
  const [users, setUsers] = useState([]); // All users
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzY4MmIwYjEyYmM0MjgxMGI0NzA3ZWYiLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM1MTQ3MzA1LCJleHAiOjE3MzUyMzM3MDV9.4G8s1xifHLuKULnUXOmpAakXzox0_YJdBhmnsPmKUnI"; // Replace with a valid JWT token

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
          setFilteredUsers(data); 
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
        {filteredUsers.length === 0 ? (
          <p>No users found</p> 
        ) : (
          filteredUsers.map((user, index) => (
            <div key={index} className="user-card">
              <img
                src={user.avatar || "default-avatar.jpg"}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <p>{`${user.firstName} ${user.lastName}`}</p>
              <p>{user.role || "Role not specified"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserGrid;
