import React, {useState} from "react";

export const TextAreaItem = ({item, index, onDelete, onEdit}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.content);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(index, editedText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="text-area-item">
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <textarea disabled>{item.content}</textarea>
      )}
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
      <button onClick={() => onDelete(index)}>Delete</button>
    </div>
  );
};