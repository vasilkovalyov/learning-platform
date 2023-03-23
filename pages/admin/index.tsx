import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { selectAuthState } from 'redux/slices/auth'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import PrivateLayoutPage from 'pages/privateLayoutPage'
import ModalPopupBox from '../../components/ModalPopupBox'

import AccountForm from '../../components/Forms/AccountForm'

import userService from 'services/user.service'

import { parseCookies } from 'nookies'
import { RoleType } from 'types/common'

import { useSignOut } from 'hooks/useSignOut'

function Account() {
  const authState = useSelector(selectAuthState)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const { signOut } = useSignOut()

  function onHandleRemoveAccount() {
    setModalOpen(true)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  async function handleRemoveAccount() {
    if (!authState) return
    const { token, userId, role } = parseCookies()
    const response = await userService.removeUser(role as RoleType, userId, token)
    if (response?.status === 200) {
      signOut()
    }
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
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <>
          <ModalPopupBox type="full" onHandleClose={handleCloseModal}>
            <Box>
              <Typography variant="h2" className="MuiTypography ta-c">
                Do you really want to remove your account?
              </Typography>
              <Stack direction="row" justifyContent="center" marginTop={2} marginBottom={2} spacing={3}>
                <Button variant="contained" onClick={handleCloseModal}>
                  decline
                </Button>
                <Button variant="outlined" onClick={handleRemoveAccount}>
                  accept
                </Button>
              </Stack>
            </Box>
          </ModalPopupBox>
        </>
      </Modal>
    </div>
  )
}

Account.getLayout = PrivateLayoutPage

export default Account
