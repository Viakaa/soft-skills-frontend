import React, {useState} from "react";
import {FormControl, IconButton, List, ListItem, ListItemText, MenuItem, Select} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";

export const SkillSelectorItem = ({content, index, onDelete}) => {
  const [skills, setSkills] = useState([
    "Soft skill one",
    "Soft skill one two",
    "Soft skill one two one",
    "Soft skill one hundred",
  ]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillChange = (event) => {
    if (!selectedSkills.includes(event.target.value)) {
      setSelectedSkills([...selectedSkills, event.target.value]);
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToDelete)
    );
  };

  return (
    <div className="question-item">
      <div className="fristWrapper">
        <p className="firstQuestion">{index + 1}</p>
        <span className="fristQuestionText">{content}</span>
        <button className="closeButton" onClick={() => onDelete(index)}>
          X
        </button>
      </div>
      <FormControl fullWidth>
        {/* <InputLabel id="skill-selector-label">{content}</InputLabel> */}
        <Select
          // labelId="skill-selector-label"
          id="skill-selector"
          value=""
          onChange={handleSkillChange}
          label={content}
          renderValue={() => ""}
        >
          {skills.map((skill) => (
            <MenuItem key={skill} value={skill} id="searched-item">
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <List dense>
        <h2 className="title">Selected skills:</h2>
        {selectedSkills.map((skill) => (
          <div className="item">
            <ListItem
              key={skill}
              secondaryAction={
                <section>
                  <IconButton edge="end" aria-label="delete">
                    <CheckIcon/>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteSkill(skill)}
                  >
                    <RemoveIcon sx={{color: "white"}}/>
                  </IconButton>
                </section>
              }
            >
              <ListItemText primary={skill}/>
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
};
