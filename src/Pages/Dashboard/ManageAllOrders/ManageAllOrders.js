import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
const ManageAllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://boiling-journey-86737.herokuapp.com/allorders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  //UPDATE ORER STATUS
  const handleUpdate = (id) => {
    const url = `https://boiling-journey-86737.herokuapp.com/allorders/${id}`;
    const newStatus = orders.find((order) => order._id === id);
    newStatus.status = "shipped";
    //sweeat alert start
    Swal.fire({
      title: "Are You want Shipped this Product?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch(url, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newStatus),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              window.location.reload(true);
              Swal.fire("Service Shipped Successfully");
            }
          });
      } else {
        Swal.fire("Service Was not Shipped Successfully");
      }
    });

    //sweet alert end
  };

  //DELETE AN ORDER
  const handleDeleteOrder = (id) => {
    const url = `https://boiling-journey-86737.herokuapp.com/allorders/${id}`;
    Swal.fire({
      title: "Are You Sure, You want to Delete this Order?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remainingOrders = orders.filter(
                (order) => order._id !== id
              );
              setOrders(remainingOrders);
              Swal.fire("Order Deleted Successfully");
            }
          });
      } else {
        Swal.fire("Order Was Not Deleted Successfully");
      }
    });
  };

  return (
    <Container>
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: "info.main", mb: 3 }}
      >
        MANAGE ALL ORDERS
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <TableContainer component={Paper}>
            <Table sx={{}} aria-label="Appoinments table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Product</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.length === 0 ? (
                  <div style={{ margin: "0 auto" }}>
                    <CircularProgress />
                  </div>
                ) : (
                  orders.map((order) => (
                    <TableRow
                      key={order._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {order.name}
                      </TableCell>
                      <TableCell align="right">{order.product}</TableCell>
                      <TableCell align="right">{order.status}</TableCell>
                      <TableCell align="right">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            flexDirection: "column",

                            bgcolor: "background.paper",
                          }}
                        >
                          <Button
                            onClick={() => handleUpdate(order._id)}
                            sx={{ my: 2 }}
                            variant="contained"
                          >
                            Confirm
                          </Button>
                          <Button
                            onClick={() => handleDeleteOrder(order._id)}
                            variant="contained"
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ManageAllOrders;
