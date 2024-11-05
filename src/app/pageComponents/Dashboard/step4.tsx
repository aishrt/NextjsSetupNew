import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InfoIcon from '@mui/icons-material/Info';
import { grey } from '@mui/material/colors';
const Step4 = () => {
    return(
        <Box>
            <Grid container>
                <Grid item lg={6}>
                <div className="card step p-4">
                        <h5>Subdomain Policy</h5>
                        <p className="mt-3">It is possible to specify different policy for subdomains in respect of the policy of the main domain</p>
                        <p>
                        For example, if only <i>example.com</i> is allowed to send emails, you can set <span className="redLight">reject</span> policy on all while the main domain can have <span className="yellowLight">quarantine</span> or <span className="greyLight">none</span> policy.</p>
                    </div>
                </Grid>
                <Grid item lg={6} className="p-4">
                    <div className="d-flex justify-content-start align-items-center">
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel className="radioBlue" value="not set" control={<Radio style={{ color: grey[600] }} />} label="Not set (use the same policy of same domain)" />
                                <FormControlLabel value="None" control={<Radio style={{ color: grey[600] }} />} label="None (monitoring only)" />
                                <FormControlLabel value="Quarantine" control={<Radio style={{ color: grey[600] }} />} label="Quarantine" />
                                <FormControlLabel value="Reject" control={<Radio style={{ color: grey[600] }} />} label="Reject" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <p className="mt-3 text-start">
                        <span>
                            <InfoIcon className="iconBlue"/>
                            <span>If <strong>not set</strong> selected, the main domain policy will be used.</span>
                        </span>
                    </p>
                </Grid>
            </Grid>
        </Box>
    )
}
export default Step4