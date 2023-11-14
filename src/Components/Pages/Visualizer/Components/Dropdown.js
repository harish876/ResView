import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Default Array for before loading 
const defaultArray = [1];

const Dropdown = ({ length }) => {
  const dropdownArray = length > 0
      ? new Array(length).fill(0).map((element, index) => (element = index++))
      : defaultArray;

    const [value, setValue] = useState(length ?? 1);
 
    const handleDropdownChange = (e) =>
      setValue(e.target.value);

  return (
    <div className='flex items-center justify-center'>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={value}
          onChange={handleDropdownChange}
          defaultValue={value ?? 1}
          inputProps={{ "aria-label": "Without label" }}
        >
          {dropdownArray.map((element) => (
            <MenuItem value={element}>{element}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default Dropdown;
