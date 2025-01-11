import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
  return (
    <Box sx={{
      display: 'flex',
      color: 'white',
      width: '100vw',
      height: '100vh',     
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <CircularProgress color="secondary" size={35} />
    </Box>
  );
}



Loading.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default Loading;