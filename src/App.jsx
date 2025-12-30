import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import Paper from '@mui/material/Paper';
import { Box, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CssBaseline } from '@mui/material';
import DetailsIcon from '@mui/icons-material/Details';
import IconButton from "@mui/material/IconButton";
import DeleteForever from '@mui/icons-material/DeleteForever';

function App() {
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);

  // popover. If there's an anchor set for the popover, it should open
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl); 

  const details = [
    { label: 'Order Number', value: selectedShipment?.orderNo },
    { label: 'Date', value: selectedShipment?.date },
    { label: 'Customer', value: selectedShipment?.customer },
    { label: 'Tracking number', value: selectedShipment?.trackingNo },
    { label: 'Status', value: selectedShipment?.status },
    { label: 'Consignee', value: selectedShipment?.consignee },
  ];

  const loadBackup = () => {
    fetch('/data/shipments.json')
      .then(r => r.json())
      .then(parsed => {
        if (Array.isArray(parsed)) {
          setShipments(parsed);
          toast.info('Using backup frontend shipments.json file.');
        } else {
          setShipments([]);
          toast.error('Backup file did not contain a valid shipments array.');
        }
      })
      .catch(() => {
        setShipments([]);
        toast.error('Failed to load backup file.');
      });
  };

  useEffect(() => {
    fetch("https://my.api.mockaroo.com/shipments.json?key=5e0b62d0")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setShipments(data);
          return;
        }

        // Non-array response from API —> try backup file
        const msg = data && (data.message || data.error) ? (data.message || data.error) : 'Unexpected response from server';
        toast.error('Failed to load shipment data: ' + msg + '. Attempting to use backup file...');

        loadBackup();
      })
      .catch(error => {
        // error —> try backup file
        toast.error("Failed to load shipment data. Error:" + error + '. Attempting to use backup file...');
        loadBackup();
      })
  }, []) // run once on mount

  // Simulated delete (no backend delete). We will only 'delete' in-memory. 
  // Refresh will restore
  const deleteItem = (idx) => {
    if (!Array.isArray(shipments)) return;
    const newShipments = shipments.slice();
    newShipments.splice(idx, 1);
    setShipments(newShipments);
    toast.success("Shipment data deleted.");
  }

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
              { Array.isArray(shipments) && shipments.length > 0 ? (
                shipments.map((shipment, index) => (
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
                    <TableCell>
                      <IconButton onClick={() => deleteItem(index)}>
                        <DeleteForever />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Typography variant="body2" color="text.secondary">No shipments available.</Typography>
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
            <Typography variant="h5" sx={{ mb: 2 }}>Shipment Details</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {details.map((item, idx) => (
                <Box sx={{ flex: '1 1 45%' }} key={idx}>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
                    {item.label}
                  </Typography>
                  <Box sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                    <Typography>{item.value}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Popover>
      </Box>
      <ToastContainer autoClose={8000} />
    </>
  )
}

export default App
