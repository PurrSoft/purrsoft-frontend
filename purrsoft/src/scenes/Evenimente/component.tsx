import { Container } from '@mui/material';
import { Outlet } from "react-router-dom";


export const Evenimente = () => {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
