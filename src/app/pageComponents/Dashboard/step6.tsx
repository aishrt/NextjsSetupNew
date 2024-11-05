import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
const Step6 = () => {
    return(
        <Box>
            <Grid container>
                <Grid item lg={12}>
                    <div className="card step">
                        <h4>YOUR DMARC Policy</h4>
                    <div className="summary">
                        <p>With the selected options, the created policy will request your receivers to send you periodic aggregate reports about all received messages with your domain in the From: address.</p>
                        <p>The same policy will apply to all subdomains.</p>
                        <p>About DKIM alignment, the relaxed mode selected does not require the domain of the sender is From: address to exactly match the DKIM record, but it must onlu contain the organizational domain.</p>
                        <p>About the SPF alignment, the relaxed mode does not require the domain of the sender is From: address to exactly match the SPF record, but it  must only contain the organizational domain.</p>
                    </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}
export default Step6