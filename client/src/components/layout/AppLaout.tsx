import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router";

const AppLaout = () => {
    return (
        <Box>
          <Typography variant="h4" >
            Header
          </Typography>
          <Typography variant="h4">
            Sidebar
          </Typography>
          <Outlet />
        </Box>
    );
}

export default AppLaout;
