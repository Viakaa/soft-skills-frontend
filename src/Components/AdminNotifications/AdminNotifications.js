import React, { useState, useEffect } from "react";
import "./AdminNotifications.css";

const NotificationForm = () => {
  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [tests, setTests] = useState([]);
  const [formData, setFormData] = useState({
    type: "Test Invitation",
    nameOrArticle: "",
    dateOfEvent: "",
    role: "Web-Programming",
    selectedTest: "",
    additionalDescription: "",
    picture: null,
  });
  const [error, setError] = useState(null);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzY4MmIwYjEyYmM0MjgxMGI0NzA3ZWYiLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM2OTU1MTk3LCJleHAiOjE3MzcwNDE1OTd9.Gs2IXC6i5WJWED9rJiBLGMHpkENDPkZHsoktxf7AYpk"; 

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
          throw new Error("Unexpected API response for users");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to load users");
      });

    fetch("http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com/tests", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tests");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTests(data);
        } else {
          throw new Error("Unexpected API response for tests");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to load tests");
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
      selectedTest: "",
      additionalDescription: "",
      picture: null,
    });
    setSearch("");
    setAddedUsers([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendNotification = () => {
    if (!formData.nameOrArticle) {
      setError("Title is required.");
      return;
    }

    if (addedUsers.length === 0) {
      setError("At least one recipient must be added.");
      return;
    }

    let apiData;

    if (formData.type === "Test Invitation") {
      if (!formData.selectedTest) {
        setError("Please select a test for the invitation.");
        return;
      }

      apiData = {
        studentIds: addedUsers.map((user) => user._id),
        type: "testInvitation",
        title: formData.nameOrArticle,
        meta: {
          dueDate: formData.dateOfEvent,
          testId: formData.selectedTest,
          message: formData.additionalDescription || "No additional message provided.",
        },
      };
    } else {
      apiData = {
        studentIds: addedUsers.map((user) => user._id),
        title: formData.nameOrArticle,
        type: "event",
        meta: {
          date: formData.dateOfEvent,
          role: formData.role,
          description: formData.additionalDescription || "No description provided.",
          shortDescription: formData.nameOrArticle,
        },
      };
    }

    fetch("http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com/notifications", {
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
        <label>Name</label>
        <input
          type="text"
          name="nameOrArticle"
          placeholder="Enter name or article"
          value={formData.nameOrArticle}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>{formData.type === "Test Invitation" ? "Due Date:" : "Event Date:"}</label>
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
      .filter(
        (user) =>
          !addedUsers.some((addedUser) => addedUser._id === user._id) &&
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

      {formData.type === "Test Invitation" ? (
        <div className="form-group">
        <label>Choose Test:</label>
        {tests.length === 0 ? (
          <p>Loading tests...</p>
        ) : (
          <select
            name="selectedTest"
            value={formData.selectedTest}
            onChange={handleInputChange}
          >
            <option value="">Select a test</option>
            {tests
              .filter(
                (test) => typeof test.title === "string" && test.title.trim() !== ""
              )
              .map((test, index) => (
                <option key={test._id} value={test._id}>
                  {test.title}
                </option>
              ))}
          </select>
        )}
      </div>
      
      
      
      ) : (
        <div className="form-group">
          <label>Additional Description:</label>
          <textarea
            name="additionalDescription"
            rows="5"
            value={formData.additionalDescription}
            onChange={handleInputChange}
          />
        </div>
      )}

      <div className="form-actions">
        <button onClick={handleClearForm}>Clear Form</button>
        <button onClick={handleSendNotification}>Send</button>
      </div>
    </div>
  );
};

export default NotificationForm;
