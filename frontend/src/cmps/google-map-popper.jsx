import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import RoomIcon from '@mui/icons-material/Room';

export default function GoogleMapPopper() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'marker-popper' : undefined;

    return (
        <div>
            <RoomIcon aria-describedby={id} fontSize='large' onClick={handleClick}/>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                    Call us: (123) - 456 - 7891
                </Box>
            </Popper>
        </div>
    );
}