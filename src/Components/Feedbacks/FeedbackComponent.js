import React from "react";
import "./Feedback.css";

const FeedbackCard = ({ feedback }) => {
  return (
    <div className="feedback-card">
      <div className="feedback-header">
        <div className="feedback-user">
          <div className="user-avatar"></div>
          <span className="user-name">{feedback.name}</span>
        </div>
        <span className="feedback-time">{feedback.time} {feedback.date}</span>
      </div>
      <div className="feedback-message">
        {feedback.message}
      </div>
    </div>
  );
};

const FeedbackList = () => {
  const fakeFeedbacks = [
    {
      name: "John Doe",
      time: "2 hours ago",
      date: "March 18, 2025",
      message: "This is a great platform! I love the user interface and the features provided. Keep up the good work!"
    },
    {
      name: "Jane Smith",
      time: "1 day ago",
      date: "March 17, 2025",
      message: "Had a wonderful experience using the service. The process is smooth and easy to follow. Highly recommended!"
    },
    {
      name: "Alice Johnson",
      time: "3 days ago",
      date: "March 15, 2025",
      message: "Good service overall, but I'd like to see more options for customization. A minor update would really improve the experience."
    },
    {
      name: "Bob Lee",
      time: "5 days ago",
      date: "March 13, 2025",
      message: "I encountered some bugs, but the support team was very helpful and fixed the issue quickly. Great customer service!"
    }
  ];

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Відгуки</h2>
      {fakeFeedbacks.length > 0 ? (
        fakeFeedbacks.map((feedback, index) => (
          <FeedbackCard key={index} feedback={feedback} />
        ))
      ) : (
        <div className="coming-soon">Скоро буде...</div>
      )}
    </div>
  );
};

export default FeedbackList;
