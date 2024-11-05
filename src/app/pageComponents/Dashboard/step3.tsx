import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { grey } from '@mui/material/colors';
const Step3 = () => {
    return(
        <Box>
            <Grid container>
                <Grid item lg={6}>
                    <div className="card step p-4">
                        <h5>Alignment</h5>
                        <p className="mt-3">It is possible to specify how strictly SPF and DKIM alignment should be evaluated.<br/>Usually released (default) option is suggested, so subdomain example would pass alignment also if record is published on example.com</p>
                    </div>
                </Grid>
                <Grid item lg={6} className="d-flex justify-content-start align-items-center">
                    <Grid container className="p-4 ">
                        <Grid item lg={6} className="text-start" >
                        <div >
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label" style={{color:"#000", fontWeight:"600"}}>DKIM Alignment</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel className="radioBlue" value="relaxed" control={<Radio style={{ color: grey[600] }} />} label="Relaxed (default)" />
                                    <FormControlLabel value="Strict" control={<Radio style={{ color: grey[600] }} />} label="Strict" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        </Grid>
                        <Grid item lg={6} className="text-start">
                        <div >
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label" style={{color:"#000", fontWeight:"600"}}>SPF Alignment</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel className="radioBlue" value="relaxed" control={<Radio style={{ color: grey[600] }} />} label="Relaxed (default)" />
                                    <FormControlLabel value="strict" control={<Radio style={{ color: grey[600] }} />} label="Strict" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
export default Step3