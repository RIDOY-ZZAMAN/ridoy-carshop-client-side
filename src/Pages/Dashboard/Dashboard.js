import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AdminRoute from "../Login/AdminRoute/AdminRoute";
import AddAProduct from "./AddAProduct/AddAProduct";
import "./Dashboard.css";
import DashboardHome from "./DashboardHome/DashboardHome";
import MakeAdmin from "./MakeAdmin/MakeAdmin";
import ManageAllOrders from "./ManageAllOrders/ManageAllOrders";
import ManageProducts from "./ManageProducts/ManageProducts";
import MyOrders from "./MyOrders/MyOrders";
import MyReview from "./MyReview/MyReview";
import Payment from "./Payment/Payment";

const drawerWidth = 200;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let { path, url } = useRouteMatch();
  const { admin, logOut } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="dashboard">
      <Typography
        align="left"
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          fontWeight: "bold",
          fontSize: "2rem",
          padding: "6px 0px",
          margin: "0 auto",
        }}
      >
        <span style={{ color: "#2C90B9", padding: "0 0 0 20px" }}>CAR</span>{" "}
        <span style={{ color: "#e3376e" }}>SHOP</span>
      </Typography>
      {/* <Divider /> */}
      {/* <Toolbar /> */}
      <Divider />
      <Link to="/home">
        <Button color="inherit">Home</Button>
      </Link>{" "}
      <br /> <Divider />
      <Link to={`${url}`}>
        <Button color="inherit">Dashboard</Button>
      </Link>{" "}
      <br />
      <Divider />
      {!admin && (
        <Box>
          <Link to={`${path}/myorders`}>
            <Button color="inherit">My Orders</Button>
          </Link>
          <br />
          <Divider />
          <Link to={`${path}/myreview`}>
            <Button color="inherit">Review</Button>
          </Link>
          <br />
          <Divider />
          <Link to={`${path}/payment`}>
            <Button color="inherit">Pay</Button>
          </Link>
        </Box>
      )}
      {admin && (
        <Box>
          <Link to={`${path}/manageallorders`}>
            <Button color="inherit">Manage All Orders</Button>
          </Link>
          <Divider />
          <Link to={`${path}/addaproduct`}>
            <Button color="inherit">Add A Product</Button>
          </Link>
          <Divider />
          <Link to={`${path}/makeadmin`}>
            <Button color="inherit">Make Admin</Button>
          </Link>
          <Divider />
          <Link to={`${path}/manageproducts`}>
            <Button color="inherit">Manage Products</Button>
          </Link>
        </Box>
      )}
      <Divider />
      <Button onClick={logOut} sx={{ color: "blue" }}>
        Logout
      </Button>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"></Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Switch>
          <Route exact path={path}>
            <DashboardHome></DashboardHome>
          </Route>
          <Route exact path={`${path}/myorders`}>
            <MyOrders></MyOrders>
          </Route>
          <Route exact path={`${path}/myreview`}>
            <MyReview></MyReview>
          </Route>
          <Route exact path={`${path}/payment`}>
            <Payment></Payment>
          </Route>
          <AdminRoute exact path={`${path}/manageallorders`}>
            <ManageAllOrders></ManageAllOrders>
          </AdminRoute>
          <AdminRoute exact path={`${path}/addaproduct`}>
            <AddAProduct></AddAProduct>
          </AdminRoute>
          <AdminRoute exact path={`${path}/makeadmin`}>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
          <AdminRoute exact path={`${path}/manageproducts`}>
            <ManageProducts></ManageProducts>
          </AdminRoute>
        </Switch>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
