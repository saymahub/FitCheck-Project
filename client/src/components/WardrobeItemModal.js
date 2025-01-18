import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const WardrobeItemModal = ({ open, onClose, data }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 360,
          bgcolor: '#e6eaf0',
          borderRadius: '15px',
          boxShadow: 24,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0px',
          position: 'relative', 
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: 'white',
            borderRadius: '8px', 
            backgroundColor: '#8a9bb3',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', 
            '&:hover': {
                backgroundColor: '#7d8fa5', 
            },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>

        {data && (
          <>
            {/* Image Section */}
            <img
              src={data.picture}
              alt={data.itemtype}
              style={{
                width: '100%',
                height: 'auto',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
              }}
            />

            {/* Details Section */}
            <Box
              sx={{
                textAlign: 'center',
                padding: '20px',
                width: '100%',
                bgcolor: '#ffffff', 
                color: '#333333',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#5a5a5a',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  letterSpacing: '1px',
                }}
              >
                {data.itemtype} {/* E.g., "TOP" */}
              </h3>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  color: '#000000',
                }}
              >
                {data.name} {/* E.g., "White Lacey Top" */}
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  fontStyle: 'italic',
                  color: '#7a7a7a',
                }}
              >
                {data.otherdetails} {/* E.g., "My go-to for summer!" */}
              </p>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default WardrobeItemModal;
