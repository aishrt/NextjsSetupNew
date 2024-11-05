import Box from "@mui/material/Box";
import * as React from 'react'; 
import TextField from '@mui/material/TextField';

function DkimStep2(){
    return(
        <Box>
            <div className="stepFormData dkim text-center">
                <h5>Selector</h5>
                <p className="addInfo">Give the selcetor a name you want. (e.g. s1, selector1,  google, etc.)</p>
                <div>
                <TextField style={{width:"550px"}} id="outlined-basic"  variant="outlined" />
                </div>
            </div>
        </Box>
    )
}
export default DkimStep2