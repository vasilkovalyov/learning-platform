import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { selectAuthState, setUpdateAccountUser } from 'redux/slices/auth'
import { wrapper } from 'redux/store'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import PrivateLayoutPage from 'pages/privateLayoutPage'
import ModalPopupBox from 'components/ModalPopupBox'
import Notification from 'components/Notification'

import AccountForm from 'components/Forms/AccountForm'

import userService from 'services/user.service'

import { parseCookies } from 'nookies'
import { RoleType } from 'types/common'

import { useSignOut } from 'hooks/useSignOut'
import { UserAccountFormInnerProps, UserAccountInfo } from 'interfaces/user.interface'

import studentSerivce from 'services/student.service'
import teacherSerivce from 'services/teacher.service'

const defaultState: UserAccountFormInnerProps = {
  login: '',
  email: '',
  fullname: '',
  password: '',
  phone: '',
}

function Account() {
  const { store } = wrapper.useWrappedStore({})
  const { signOut } = useSignOut()

  const authState = useSelector(selectAuthState)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [formState, setFormState] = useState<UserAccountFormInnerProps>(authState || defaultState)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showNotificaton, setShowNotificaton] = useState<boolean>(false)

  function onHandleRemoveAccount() {
    setModalOpen(true)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  async function handleRemoveAccount() {
    const response = await userService.removeUser()
    if (response?.status === 200) signOut()
  }

  async function onHandleSubmit(props: UserAccountInfo) {
    setIsLoading(true)

    if (!authState) return

    const data = {
      ...props,
      _id: authState?._id,
      role: authState.role,
    }

    let response = null
    if (authState.role === 'student') {
      response = await studentSerivce.updateUserAccount(data)
    }

    if (authState.role === 'teacher') {
      response = await teacherSerivce.updateUserAccount(data)
    }

    if (!response?.data) return

    store.dispatch(
      setUpdateAccountUser({
        fullname: response.data.fullname,
        email: response.data.email,
        phone: response.data.phone,
      }),
    )

    setIsLoading(false)
    setShowNotificaton(true)

    setFormState({
      email: response?.data.email,
      fullname: response?.data.fullname,
      phone: response?.data.phone,
      password: response?.data.password,
      login: response.data.login,
    })
  }

  return (
    <div>
      <Box marginBottom={3}>
        <Typography variant="h5" className="MuiTypography">
          Account
        </Typography>
      </Box>
      {authState && (
        <AccountForm
          isLoading={isLoading}
          onHandleRemoveAccount={onHandleRemoveAccount}
          onHandleSubmit={onHandleSubmit}
          initialData={formState}
          role={authState.role}
        />
      )}
      <Notification
        open={showNotificaton}
        setClose={() => setShowNotificaton(false)}
        direction={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {authState?.role} updated successfully
      </Notification>
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
