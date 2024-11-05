import Box from "@mui/material/Box";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

function DomainStep2() {
  return (
    <Box>
      <div className="stepFormData domain text-center">
        <p className="addInfo">Auto discovery result</p>
        <h5>
          Good! It seems that your domain already has some records configured.
        </h5>

        <p className="addInfo">
          Select which ones you want to import into YOUR Dmarc
        </p>
        <h5>DMARC Record</h5>

        <Grid container>
          <Grid
            item
            xl={11}
            style={{ padding: "15px 10px", backgroundColor: "#dedede" }}
          >
            <p style={{ marginBottom: "0px" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
              fugiat saepe, quaerat adipisci nesciunt earum nemo corrupti animi
              laboriosam ad, nulla, perferendis harum excepturi repellendus quo.
              Veniam, illum! Voluptates maxime soluta quod dolorem
            </p>
          </Grid>
          <Grid
            item
            xl={1}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Switch defaultChecked />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
export default DomainStep2;
