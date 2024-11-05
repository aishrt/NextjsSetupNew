import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';
const Step5 = () => {
    return(
        <Box>
            <Grid container >
                <Grid item lg={6}>
                    <div className="card step p-4">
                        <h5>Percentage</h5>
                        <p className="mt-3">The purpose of this parameter is to permit a slow rollout while you are enforcing the policy, so you do not inadvertently reject legitimate emails with delivery problems.</p>
                        <p>For example: if you set a policy <span className="redLight">reject</span> and percentage <span className="greyLight">40%</span>, if the receiver get 100 messages that fails DMARC check, only 40 will be rejected.</p>
                    </div>
                </Grid>
                <Grid item lg={6} className="p-4 d-flex justify-content-center align-items-centern flex-column">
                    <div>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    </div>
                    <p className="mt-3 ">
                        <span>
                            <InfoIcon className="iconBlue"/>
                            <span>This value is <strong>not relevant</strong> in case of </span>
                            <span className="greyDark">None</span>
                            <span> since all the messages are considered for reporting.</span>
                        </span>
                    </p>
                </Grid>
            </Grid>
        </Box>
    )
}
export default Step5