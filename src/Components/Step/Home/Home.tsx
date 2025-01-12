
import Box from '@mui/joy/Box';
import Suggested from './Suggested';
import Category from './Category';
import { SxProps } from '@mui/material';

const boxStyle: SxProps = {
  margin: '20px auto',
  padding: ' 0 10px',
}

const Home = () => {
  return (
    <>
      <Box
        sx={boxStyle}
      >
        <Suggested />
      </Box>
      <Box
        sx={boxStyle}
      >
        <Category />
      </Box>

    </>

  );
};

export default Home;

