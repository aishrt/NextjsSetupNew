import Box from "@mui/material/Box";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";

function SelectSmall() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <FormControl
      className="step1Input"
      sx={{ m: 1, minWidth: 400 }}
      size="small"
    >
      <InputLabel id="demo-select-small-label">Age</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}

function Step1() {
  return (
    <Box>
      <div className="stepFormData text-center">
        <h5>Domain</h5>
        <p className="addInfo">
          Select the domain to create a DMARC record for.
        </p>
        <div>
          <SelectSmall />
        </div>
        <p className="addInfo mt-3">
          Discover existing record from published record?
        </p>
        <Switch defaultChecked />
      </div>
    </Box>
  );
}
export default Step1;
