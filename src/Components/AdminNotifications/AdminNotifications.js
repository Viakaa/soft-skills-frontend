import React, { useState, useEffect } from "react";
import "./AdminNotifications.css";

const NotificationForm = () => {
  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    type: "Test Invitation",
    nameOrArticle: "",
    dateOfEvent: "",
    role: "Web-Programming",
    shortDescription: {
      title: "",
      content: "",
    },
    fullDescription: "",
    picture: null,
  });
  const [error, setError] = useState(null);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzY4MmIwYjEyYmM0MjgxMGI0NzA3ZWYiLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM2NTQ4MjA0LCJleHAiOjE3MzY2MzQ2MDR9.FrZYxRjsrhngwhz94cA9Vs4_lFOU33kS9rUuHz_5zTw"; 

  useEffect(() => {
    fetch("http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          throw new Error("Unexpected API response");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to load users");
      });
  }, [token]);

  const handleAddUser = (user) => {
    if (!addedUsers.some((u) => u._id === user._id)) {
      setAddedUsers((prevUsers) => [...prevUsers, user]);
    }
  };

  const handleRemoveUser = (user) => {
    setAddedUsers((prevUsers) =>
      prevUsers.filter((u) => u._id !== user._id)
    );
  };

  const handleClearForm = () => {
    setFormData({
      type: "Test Invitation",
      nameOrArticle: "",
      dateOfEvent: "",
      role: "Web-Programming",
      shortDescription: {
        title: "",
        content: "",
      },
      fullDescription: "",
      picture: null,
    });
    setSearch("");
    setAddedUsers([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["title", "content"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        shortDescription: {
          ...prev.shortDescription,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        picture: URL.createObjectURL(file),
      }));
    }
  };

  const handleRemovePicture = () => {
    setFormData((prev) => ({
      ...prev,
      picture: null,
    }));
  };

  const handleSendNotification = () => {
    if (!formData.nameOrArticle || !formData.shortDescription.content) {
      setError("Name or Article and Short Description Content are required.");
      return;
    }

    const apiData = {
      studentId: addedUsers[0]?._id || "default-student-id",
      ownerId: "67682b0b12bc42810b4707ef",
      title: formData.nameOrArticle,
      type: formData.type,
      meta: formData.shortDescription.content,
    };

    fetch("http://your-api-url.com/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(apiData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Failed to send notification");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Notification sent successfully:", data);
        handleClearForm();
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to send notification due to a network error.");
      });
  };

  return (
    <div className="notification-form">
      <h1>Create Notification</h1>

      <div className="form-group">
        <label>Type:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        >
          <option>Test Invitation</option>
          <option>Event Announcement</option>
        </select>
      </div>

      <div className="form-group">
        <label>Name or Article:</label>
        <input
          type="text"
          name="nameOrArticle"
          placeholder="Enter name or article"
          value={formData.nameOrArticle}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>{formData.type === "Test Invitation" ? "Due to" : "Date of event:"}</label>
        <input
          type="datetime-local"
          name="dateOfEvent"
          value={formData.dateOfEvent}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Recipients:</label>
        <input
          type="text"
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="user-list">
        <h3>Users:</h3>
        {error ? (
          <div className="error">{error}</div>
        ) : users.length === 0 ? (
          <div>Loading users...</div>
        ) : (
          users
            .filter((user) =>
              `${user.firstName} ${user.lastName}`
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((user) => (
              <div key={user._id} className="user-item">
                {user.firstName} {user.lastName}
                <button onClick={() => handleAddUser(user)}>Add</button>
              </div>
            ))
        )}
      </div>

      <div className="added-users">
        <h3>Added Users:</h3>
        {addedUsers.length > 0 ? (
          addedUsers.map((user) => (
            <div key={user._id} className="added-user">
              {user.firstName} {user.lastName}
              <button onClick={() => handleRemoveUser(user)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No users added yet.</p>
        )}
      </div>

      <div className="form-group">
        <label>Roles:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
        >
          <option>Web-Programming</option>
          <option>Designer</option>
          <option>Data Science</option>
          <option>Business Analysis</option>
          <option>Management</option>
          <option>DevOps</option>
        </select>
      </div>

      <div className="form-group">
        <label>Short Description Title:</label>
        <input
          type="text"
          name="title"
          value={formData.shortDescription.title}
          onChange={handleInputChange}
        />
      </div>



      <div className="form-group">
        <label>Full Description:</label>
        <textarea
          name="fullDescription"
          rows="5"
          value={formData.fullDescription}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Pictures:</label>
        <div className="picture-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="file-input"
          />
          <button onClick={() => document.getElementById("file-input").click()}>
            Add photo
          </button>
          {formData.picture && (
            <div
              className="picture-preview"
              style={{
                backgroundImage: `url(${formData.picture})`,
              }}
            >
              <button
                onClick={handleRemovePicture}
                className="remove-picture-btn"
              >
                X
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button onClick={handleClearForm}>Clear Form</button>
        <button onClick={handleSendNotification}>Send</button>
      </div>
    </div>
  );
};

export default NotificationForm;
