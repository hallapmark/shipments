import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import { Box, Grid, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CssBaseline } from '@mui/material';
import DetailsIcon from '@mui/icons-material/Details';
import IconButton from "@mui/material/IconButton";

function App() {
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);


  // popover
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl); 
  // if there's an anchor set for the popover, it should open

  useEffect(() => {
    fetch("https://my.api.mockaroo.com/shipments.json?key=5e0b62d0")
      .then(res => res.json())
      .then(data => setShipments(data))
      .catch(error => toast.error("Failed to load shipment data. Error:" + error))
  }, []) // run once on mount

  return (
    <>
      <CssBaseline />
      <Box sx={{ m: 2 }}>
        <Typography variant="h1" sx={{ my: 2 }}>Shipments</Typography>
        <TableContainer component={Paper} sx={{ my: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Number</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Tracking Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Consignee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { shipments.map((shipment, index) => 
                <TableRow key={index}>
                  <TableCell>{shipment.orderNo}</TableCell>
                  <TableCell>{shipment.date}</TableCell>
                  <TableCell>{shipment.customer}</TableCell>
                  <TableCell>{shipment.trackingNo}</TableCell>
                  <TableCell>{shipment.status}</TableCell>
                  <TableCell>{shipment.consignee}</TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={(event) => {
                        setAnchorEl(event.currentTarget);
                        setSelectedShipment(shipment);
                      }}
                    >
                      <DetailsIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ 
            p: 3, 
            width: { xs: 400, sm: 600, md: 800, lg: 900 }
          }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              
              <Box sx={{ flex: '1 1 45%' }}>
                <Typography 
                  variant="subtitle2" 
                  fontWeight="bold"
                  sx={{ mb: 0.5 }}
                >
                  Order Number:
                </Typography>
                <Box sx={{ 
                  bgcolor: 'grey.100',
                  p: 1,
                  borderRadius: 1
                }}>
                  <Typography>{selectedShipment?.orderNo}</Typography>
                </Box>
              </Box>

              <Box sx={{ flex: '1 1 45%' }}>
                <Typography 
                  variant="subtitle2" 
                  fontWeight="bold"
                  sx={{ mb: 0.5 }}
                >
                  Customer:
                </Typography>
                <Box sx={{ 
                  bgcolor: 'grey.100',
                  p: 1,
                  borderRadius: 1
                }}>
                  <Typography>{selectedShipment?.customer}</Typography>
                </Box>
              </Box>

              <Box sx={{ flex: '1 1 45%' }}>
                <Typography 
                  variant="subtitle2" 
                  fontWeight="bold"
                  sx={{ mb: 0.5 }}
                >
                  Status:
                </Typography>
                <Box sx={{ 
                  bgcolor: 'grey.100',
                  p: 1,
                  borderRadius: 1
                }}>
                  <Typography>{selectedShipment?.status}</Typography>
                </Box>
              </Box>

              <Box sx={{ flex: '1 1 45%' }}>
                <Typography 
                  variant="subtitle2" 
                  fontWeight="bold"
                  sx={{ mb: 0.5 }}
                >
                  Consignee:
                </Typography>
                <Box sx={{ 
                  bgcolor: 'grey.100',
                  p: 1,
                  borderRadius: 1
                }}>
                  <Typography>{selectedShipment?.consignee}</Typography>
                </Box>
              </Box>

            </Box>
          </Box>
        </Popover>
      </Box>
    </>
  )
}

export default App
