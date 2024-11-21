import React, { useState, MouseEvent } from "react";
import { Button, Popover, useTheme } from "@mui/material";

export const PopOver: React.FC = () => {
  // Definim tipul pentru `anchor`, care poate fi un element HTML sau `null`
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const theme = useTheme();

  // Tipăm evenimentul primit de funcție ca fiind de tip `MouseEvent`
  const pressedPopover = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchor(event.currentTarget); // Setăm elementul ancoră pentru popover
  };

  // Funcție pentru a închide Popover
  const handleClose = (): void => {
    setAnchor(null);
  };

  return (
    <div>
      {/* Buton principal */}
      <Button
        style={{ background: theme.palette.accent?.lightGreen }}
        variant="contained"
        onClick={pressedPopover}
      >
        Alătură-te!
      </Button>

      {/* Popover */}
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "bottom", // Poziționare sub butonul ancoră
          horizontal: "center", // Aliniere pe centru
        }}
        transformOrigin={{
          vertical: "top", // Originea transformării popoverului
          horizontal: "center",
        }}
        onClose={handleClose} // Închidere popover la click în afara sa
      >
        <div style={{ display: "flex", flexDirection: "column", padding: 10 }}>
          {/* Butoane din Popover */}
          <Button
            style={{
              backgroundColor: "white",
              color: "black",
              marginBottom: 10,
            }}
            onClick={() => console.log("apelează funcția Voluntar")}
          >
            Voluntariat
          </Button>
          <Button
            style={{
              backgroundColor: "white",
              color: "black",
              marginBottom: 10,
            }}
            onClick={() => console.log("apelează funcția Fostering")}
          >
            Fostering
          </Button>
          <Button
            style={{
              backgroundColor: "white",
              color: "black",
              marginBottom: 10,
            }}
            onClick={() => console.log("apelează funcția Adopție")}
          >
            Adopție
          </Button>
          <Button
            style={{
              backgroundColor: "white",
              color: "black",
              marginBottom: 10,
            }}
            onClick={() => console.log("apelează funcția Donează")}
          >
            Donează
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default PopOver;
