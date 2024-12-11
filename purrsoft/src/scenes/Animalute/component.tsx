import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export const Animalute = () => {
  return (
    <Container>
        <Outlet />
    </Container>
  );
};
