import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MediaControlCard from '../MedaiControlCard/MediaControlCard';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  bgcolor: 'background.paper',
  border: '2px solid #8bc34a',
  boxShadow: 24,
  p: 0,
  borderRadius:20,
};

export default function BasicModal({handleClose , open ,selectedProduct}) {
 

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <MediaControlCard selectedProduct={selectedProduct} />
        </Box>
      </Modal>
    </div>
  );
}