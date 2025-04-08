import React, { useState, useEffect } from "react";
import "./AdminNotifications.css";

const NotificationForm = () => {
  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [tests, setTests] = useState([]);
  const [formData, setFormData] = useState({
    type: "Запрошення на тест",
    nameOrArticle: "",
    dateOfEvent: "",
    role: "Веб-програмування",
    selectedTest: "",
    additionalDescription: "",
    picture: null,
  });
  const [error, setError] = useState(null);

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    fetch("http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/users", {
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

    fetch("http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/tests", {
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
  }, []); 

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
      type: "Запрошення на тест",
      nameOrArticle: "",
      dateOfEvent: "",
      role: "Веб-програмування",
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
    const token = getToken();

    if (!formData.nameOrArticle) {
      setError("Напишіть назву");
      return;
    }

    if (addedUsers.length === 0) {
      setError("Додайте хоча б одного отримувача");
      return;
    }

    let apiData;

    if (formData.type === "Test Invitation") {
      if (!formData.selectedTest) {
        setError("Будь ласка оберіть тест");
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

    fetch("http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/notifications", {
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
      <h1>Ствворити сповіщення</h1>

      <div className="form-group">
        <label>Тип:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        >
          <option>Запрошення на тест</option>
          <option>Запрошення на подію</option>
        </select>
      </div>

      <div className="form-group">
        <label>Назва</label>
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
        <label>Отримувачі:</label>
        <input
          type="text"
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="user-list">
        <h3>Користувачі:</h3>
        {error ? (
          <div className="error"></div>
        ) : users.length === 0 ? (
          <div>Завантаження користувачів...</div>
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
                <button onClick={() => handleAddUser(user)}>Додати</button>
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
              <button onClick={() => handleRemoveUser(user)}>Прибрати</button>
            </div>
          ))
        ) : (
          <p>Не обрано жодного отримувача.</p>
        )}
      </div>

      {formData.type === "Test Invitation" ? (
        <div className="form-group">
          <label>Оберіть тест:</label>
          {tests.length === 0 ? (
            <p>Завантаження тестів...</p>
          ) : (
            <select
              name="selectedTest"
              value={formData.selectedTest}
              onChange={handleInputChange}
            >
              <option value="">Оберіть тест</option>
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
          <label>Додатковий опис:</label>
          <textarea
            name="additionalDescription"
            rows="5"
            value={formData.additionalDescription}
            onChange={handleInputChange}
            
          />
          
        </div>
      )}
{error && <div className="error-message">{error}</div>}

      <div className="form-actions">
        <button onClick={handleClearForm}>Очистити</button>
        <button onClick={handleSendNotification}>Надіслати</button>
      </div>
    </div>
  );
};

export default NotificationForm;
