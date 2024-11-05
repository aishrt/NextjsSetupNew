import Box from "@mui/material/Box";
import * as React from "react";
import TextField from "@mui/material/TextField";

function DomainStep1() {
  return (
    <Box>
      <div className="stepFormData text-center">
        <h5>Domain</h5>
        <p className="addInfo">
          Enter your domain: the existing records will be automatically
          discovered.
        </p>
        <div></div>
        <TextField
          style={{ width: "450px" }}
          id="outlined-basic"
          variant="outlined"
        />
      </div>
    </Box>
  );
}
export default DomainStep1;
