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
    <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
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

function DkimStep1() {
  return (
    <Box>
      <div className="stepFormData dkim text-center">
        <h5>Domain</h5>
        <p className="addInfo">
          For which domain you want to create the DKIM record?
        </p>
        <div>
          <SelectSmall />
        </div>
        <p className="addInfo mt-3">Discover values from published record?</p>
        <Switch defaultChecked />
      </div>
    </Box>
  );
}
export default DkimStep1;
