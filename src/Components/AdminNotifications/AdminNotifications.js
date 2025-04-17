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

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setError("Токен не знайдено. Будь ласка, увійдіть.");
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
          throw new Error("Не вдалося завантажити користувачів");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          throw new Error("Неправильна відповідь від API для користувачів");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Не вдалося завантажити користувачів");
      });

    fetch("http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/tests", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не вдалося завантажити тести");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTests(data);
        } else {
          throw new Error("Неправильна відповідь від API для тестів");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Не вдалося завантажити тести");
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
    const token = getToken();

    if (!formData.nameOrArticle) {
      setError("Поле назви є обов’язковим.");
      return;
    }

    if (addedUsers.length === 0) {
      setError("Потрібно додати принаймні одного одержувача.");
      return;
    }

    let apiData;

    if (formData.type === "Test Invitation") {
      if (!formData.selectedTest) {
        setError("Будь ласка, виберіть тест для запрошення.");
        return;
      }
      const testLink = `/test/${formData.selectedTest}`;
      apiData = {
        studentIds: addedUsers.map((user) => user._id),
        type: "testInvitation",
        title: formData.nameOrArticle,
        meta: {
          dueDate: formData.dateOfEvent,
          testId: formData.selectedTest,
          message: `${formData.additionalDescription || "Додаткове повідомлення не надано."}\n\nПосилання на тест: ${testLink}`,
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
          description: formData.additionalDescription || "Опис не надано.",
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
            throw new Error(data.message || "Не вдалося надіслати сповіщення");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Сповіщення успішно надіслано:", data);
        handleClearForm();
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Не вдалося надіслати сповіщення через помилку мережі.");
      });
  };

  return (
    <div className="notification-form">
      <h1>Створити сповіщення</h1>

      <div className="form-group">
        <label>Тип:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        >
          <option>Запрошення на тест</option>
          <option>Оголошення події</option>
        </select>
      </div>

      <div className="form-group">
        <label>Назва</label>
        <input
          type="text"
          name="nameOrArticle"
          placeholder="Введіть назву або статтю"
          value={formData.nameOrArticle}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>{formData.type === "Запрошення на тест" ? "Термін здачі:" : "Дата події:"}</label>
        <input
          type="datetime-local"
          name="dateOfEvent"
          value={formData.dateOfEvent}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Одержувачі:</label>
        <input
          type="text"
          placeholder="Пошук за ім’ям"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="user-list">
        <h3>Користувачі:</h3>
        {error ? (
          <div className="error">{error}</div>
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
        <h3>Додані користувачі:</h3>
        {addedUsers.length > 0 ? (
          addedUsers.map((user) => (
            <div key={user._id} className="added-user">
              {user.firstName} {user.lastName}
              <button onClick={() => handleRemoveUser(user)}>Видалити</button>
            </div>
          ))
        ) : (
          <p>Ще не додано жодного користувача.</p>
        )}
      </div>

      {formData.type === "Запрошення на тест" ? (
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

      <div className="form-actions">
        <button onClick={handleClearForm}>Очистити форму</button>
        <button onClick={handleSendNotification}>Надіслати</button>
      </div>
    </div>
  );
};

export default NotificationForm;
