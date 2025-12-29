import { useEffect, useState } from 'react'
import './App.css'
import { toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

function App() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    fetch("https://my.api.mockaroo.com/shipments.json?key=5e0b62d0")
      .then(res => res.json())
      .then(data => setShipments(data))
      .catch(error => toast.error("Failed to load shipment data. Error:" + error))
  }, []) // run once on mount

  return (
    <Box>
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
                <TableCell>{shipment.status}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default App
