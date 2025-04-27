import { Box } from "@mui/material";

import TopBar from "../components/BOTopBar";
import SideBar from "../components/BOSideBar";

import { Toaster } from "react-hot-toast";

interface Props {
  children?: React.ReactNode;
}

const BackOfficeLayout = ({ children }: Props) => {
  return (
    <Box>
      <TopBar />
      <Box sx={{ display: "flex", height: "100vh" }}>
        {<SideBar />}
        <Box sx={{ bgcolor: "#FFF0D1", width: "100%", p: 2 }}>{children}</Box>
      </Box>
      <Toaster position="bottom-right" reverseOrder={false} />
    </Box>
  );
};
export default BackOfficeLayout;
