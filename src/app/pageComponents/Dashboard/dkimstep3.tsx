import Box from "@mui/material/Box";
import * as React from 'react'; 
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { grey } from '@mui/material/colors';

function DkimStep3(){
    return(
        <Box>
            <div className="stepFormData dkim text-center">
                <h5>Key Type</h5>
                <p className="addInfo">Which algorithm have you used to create the key?</p>
                <div style={{textAlign:"left"}}>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel className="radioBlue" value="relaxed" control={<Radio style={{ color: grey[600] }} />} label="Relaxed (default)" />
                            <FormControlLabel value="strict" control={<Radio style={{ color: grey[600] }} />} label="ed25519" />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </Box>
    )
}
export default DkimStep3