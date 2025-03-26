import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import TableBarIcon from "@mui/icons-material/TableBar";
import PlaceIcon from "@mui/icons-material/Place";
import Link from "next/link";

const SideBar = () => {
  const sideBarItem = [
    {
      id: 1,
      name: "order",
      to: "backoffice/",
      icon: <LocalMallIcon sx={{ color: "#FFF0D1" }} />,
    },
    {
      id: 2,
      name: "menu-categories",
      to: "backoffice/menu_categories",
      icon: <MenuBookIcon sx={{ color: "#FFF0D1" }} />,
    },
    {
      id: 3,
      name: "menu",
      to: "./backoffice/menus",
      icon: <MenuIcon sx={{ color: "#FFF0D1" }} />,
    },

    {
      id: 4,
      name: "addons",
      to: "backoffice/addons",
      icon: <ControlPointIcon sx={{ color: "#FFF0D1" }} />,
    },
    {
      id: 5,
      name: "addon-categories",
      to: "backoffice/addon_categories",
      icon: <ControlPointDuplicateIcon sx={{ color: "#FFF0D1" }} />,
    },
    {
      id: 6,
      name: "Tables",
      to: "backoffice/tables",
      icon: <TableBarIcon sx={{ color: "#FFF0D1" }} />,
    },
    {
      id: 7,
      name: "location",
      to: "backoffice/locations",
      icon: <PlaceIcon sx={{ color: "#FFF0D1" }} />,
    },
  ];
  return (
    <Box
      sx={{ width: 250, bgcolor: "#795757", height: "100vh" }}
      role="presentation"
    >
      <List>
        {sideBarItem.map((item) => (
          <ListItem key={item.id} disablePadding>
            <Link
              href={`/${item.to}`}
              style={{
                textDecoration: "none",
                cursor: "pointer",
                width: "100%",
              }}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} sx={{ color: "#FFF0D1" }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Settings"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link
              href={"/backoffice/setting"}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {<SettingsIcon sx={{ color: "#FFF0D1" }} />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: "#FFF0D1" }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default SideBar;
