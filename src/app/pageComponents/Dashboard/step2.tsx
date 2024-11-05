import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InfoIcon from '@mui/icons-material/Info';
import { grey } from '@mui/material/colors';
const Step2 =()=>{
    return(
        <Box>
            <Grid container>
                <Grid item xl={6} lg={6} sm={12}>
                    <div className="card step p-4">
                        <h5 className="text-center">Domain Policy</h5>
                        <p style={{color:"#3d3d3d"}}>With this option you tell the receiver the behavior the receiver should adopt for messages that fail the check.</p>
                        <div className="list">
                            <Grid container className="mb-2">
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3} className="text-start">
                                    <span className="greyDark">None</span></Grid>
                                <Grid item xl={9} lg={9} md={9} sm={9} xs={9} style={{fontSize:"14px"}} className="text-start">No impact to the message delivery but allow to receive DMARC report.</Grid>
                            </Grid>
                            <Grid container className="mb-2">
                                <Grid item xl={3} lg={3}  md={3} sm={3} xs={3} className="text-start">
                                    <span className="yellowDark">Quarantine</span></Grid>
                                <Grid item xl={9} lg={9}  md={9} sm={9} xs={9} style={{fontSize:"14px"}} className="text-start">Request to mark messages that fails DMARC checks as spam or suspicious messages.</Grid>
                            </Grid>
                            <Grid container className="mb-2">
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3} className="text-start">
                                    <span className="redDark">Reject</span></Grid>
                                <Grid item xl={9} lg={9}  md={9} sm={9} xs={9} style={{fontSize:"14px"}} className="text-start">Request to reject messages that fails DMARC checks.</Grid>
                            </Grid>
                        </div>
                    </div>
                </Grid>
                <Grid item xl={6} lg={6} className="flex p-5">
                    <div >
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel className="radioBlue" value="None" control={<Radio style={{ color: grey[600] }} />}  label="None(monitoring only)" />
                            <FormControlLabel value="quarantine" control={<Radio style={{ color: grey[600] }} />} label="Quarantine" />
                            <FormControlLabel value="reject" control={<Radio style={{ color: grey[600] }} />} label="Reject" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                    <p className="mt-3">
                        <span>
                            <InfoIcon className="iconBlue"/>
                            <span className="greyDark">None</span>
                            <span> is recommended policy for initial deployment.</span>
                        </span>
                    </p>
                </Grid>
            </Grid>
        </Box>
    )
}
export default Step2