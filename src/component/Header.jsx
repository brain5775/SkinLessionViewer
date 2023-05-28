import { Menu } from "@mui/icons-material";
import { IconButton, Button, Typography, Container, Box } from "@mui/material";

export default function Header() {
  return (
    <Box className="bg-gray-800 py-3">
      <Container maxWidth="lg">
        <div className="flex justify-between">
          <div className="inline-flex gap-3 items-center title">
            <IconButton sx={iconButtonHover}>
              <Menu sx={whiteColor} />
            </IconButton>
            <Typography variant="h6" sx={whiteColor}>
              Skin Lession Viewer
            </Typography>
          </div>
          <div className="inline-flex gap-3">
            <Button variant="outlined" sx={buttonStyle}>
              ENGLISH
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
              中文
            </Button>
          </div>
        </div>
      </Container>
    </Box>
  );
}

const buttonStyle = {
  borderColor: "rgba(0, 168, 232, 0.7)",
  color: "rgba(0, 168, 232, 0.7)",
  ":hover": {
    borderColor: "rgb(0, 168, 232)",
    color: "rgb(0, 168, 232)",
  },
};

const whiteColor = { color: "#fff" };

const iconButtonHover = {
  ":hover": { backgroundColor: "rgba(255,255,255,0.1)" },
};
