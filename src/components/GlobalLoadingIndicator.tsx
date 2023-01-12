import { Box, CircularProgress } from '@mui/material';

function GlobalLoadingIndicator(){
    return (
        <Box sx={{ position: 'absolute', top: '5px', left: '5px' }}>
          <CircularProgress size={20} />
        </Box>
    )
}

export default GlobalLoadingIndicator;