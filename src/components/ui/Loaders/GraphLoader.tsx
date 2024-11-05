import { Box, Skeleton } from "@mui/material";

export default function GraphLoader() {
  return (
    <>
      <>
        <Box className="rounded-bars sourceHead">
          <div className="row">
            <div className="col-lg-8">
              <h4>Emails</h4>
              <p>How many emails per category?</p>
            </div>
            <div className="py-2">
              <Skeleton animation="wave" variant="text" height={60} />
              <Skeleton animation="wave" variant="text" height={60} />
            </div>
          </div>
        </Box>
      </>
    </>
  );
}
