import { Box } from "@mui/material";

import TopBar from "../components/BOTopBar";
import SideBar from "../components/BOSideBar";
import { useRouter } from "next/navigation";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  /* const { data } = useSession(); */
  return (
    <Box>
      <TopBar />
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* data &&  */ <SideBar />}
        <Box sx={{ bgcolor: "#FFF0D1", width: "100%", p: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
};
export default Layout;
