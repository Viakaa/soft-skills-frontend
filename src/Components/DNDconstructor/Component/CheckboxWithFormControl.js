import { Select, MenuItem, FormControl, IconButton, TextField } from "@mui/material";
import { FormControlLabel} from "@mui/material";
import Form from "react-bootstrap/Form";
import { Checkbox } from "@mui/material";
import {MenuProps} from "./MenuProps"

const CheckboxWithFormControl = ({
  option,
  handleOptionChange,
  characteristicList,
  handleDeleteOption,
}) => {
  const handleCharacteristicChange = (event) => {
    const selectedId = event.target.value;
    const selectedCharacteristic = characteristicList.find(
      (char) => char._id === selectedId
    );
    handleOptionChange(option.id, "characteristicId", selectedId);
    console.log("SELECTED", selectedCharacteristic);
  };
  return (
    <div className="checkbox-with-form-control option-container">
      <FormControlLabel
        control={
          <Checkbox
            className="checkbox_mult"
            checked={option.checked || false}
            onChange={(e) =>
              handleOptionChange(option.id, "checked", e.target.checked)
            }
            name={option.label}
          />
        }
        label={
          <TextField
            size="small"
            variant="outlined"
            style={{ border: "none !important" }}
            className="questionText"
            value={option.label}
            onChange={(e) =>
              handleOptionChange(option.id, "label", e.target.value)
            }
          />
        }
      />

      <Form.Control
        size="sm"
        type="number"
        placeholder="+/- 1"
        className="addPointsYN"
        value={option.points}
        onChange={(e) =>
          handleOptionChange(option.id, "points", Number(e.target.value))
        }
        style={{ margin: "0", width: "100px" }}
        required
      />
      <FormControl style={{ width: "200px", marginLeft: "10px" }}>
        <Select
          displayEmpty
          className="ch_mult_txt"
          value={option.characteristicId}
          onChange={handleCharacteristicChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Оберіть характеристики</em>;
            }

            const selectedChar = characteristicList.find(
              (char) => char._id === selected
            );
            return selectedChar ? (
              selectedChar.title
            ) : (
              <em>Оберіть характеристики</em>
            );
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Оберіть характеристики</em>
          </MenuItem>

          {characteristicList.map((char) => (
            <MenuItem key={char._id} value={char._id}>
              {char.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton
        onClick={() => handleDeleteOption(option.id)}
        style={{ marginLeft: "10px", marginTop: "1%" }}
      >
        X
      </IconButton>
    </div>
  );
};
export default CheckboxWithFormControl;
