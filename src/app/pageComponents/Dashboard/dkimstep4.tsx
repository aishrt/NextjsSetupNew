import Box from "@mui/material/Box";
import * as React from 'react'; 
import { TextareaAutosize } from '@mui/base';

function DkimStep4(){
    return(
        <Box>
            <div className="stepFormData dkim text-center">
                <h5>Public Key</h5>
                <p className="addInfo">Insert below the public part of the key you want to publish.</p>
                <div className="stepArea">
                    <TextareaAutosize/>
                </div>
            </div>
        </Box>
    )
}
export default DkimStep4