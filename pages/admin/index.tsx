import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { selectAuthState } from 'redux/slices/auth'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import PrivateLayoutPage from 'pages/privateLayoutPage'
import ModalPopupBoxFull from '../../components/ModalPopupBoxFull'

import AccountForm from '../../components/Forms/AccountForm'

function Account() {
  const authState = useSelector(selectAuthState)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  function onHandleRemoveAccount() {
    setModalOpen(true)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  return (
    <div>
      <Box marginBottom={3}>
        <Typography variant="h5" className="MuiTypography">
          Account
        </Typography>
      </Box>
      {authState && (
        <AccountForm onHandleRemoveAccount={onHandleRemoveAccount} initialData={authState} role={authState.role} />
      )}
      <Modal
        keepMounted
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <>
          <ModalPopupBoxFull onHandleClose={handleCloseModal}>
            <Box>
              <Typography variant="h2" className="MuiTypography">
                Do you really want to remove your account?
              </Typography>
              <Stack direction="row" justifyContent="center" marginTop={2} marginBottom={2} spacing={3}>
                <Button variant="contained" onClick={handleCloseModal}>
                  decline
                </Button>
                <Button variant="outlined" disabled>
                  accept
                </Button>
              </Stack>
            </Box>
          </ModalPopupBoxFull>
        </>
      </Modal>
    </div>
  )
}

Account.getLayout = PrivateLayoutPage

export default Account
