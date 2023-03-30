import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { selectAuthState, setUpdateAccountUser } from 'redux/slices/auth'
import { wrapper } from 'redux/store'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import PrivateLayoutPage from 'pages/privateLayoutPage'
import ModalPopupBox from 'components/ModalPopupBox'
import Notification from 'components/Notification'

import AccountForm from 'components/Forms/AccountForm'

import userService from 'services/user.service'

import { useSignOut } from 'hooks/useSignOut'
import { UserAccountFormInnerProps, UserEdtableAccountInfo, UserReadableAccountInfo } from 'interfaces/user.interface'

import studentSerivce from 'services/student.service'
import teacherSerivce from 'services/teacher.service'

function Account() {
  const { store } = wrapper.useWrappedStore({})
  const { signOut } = useSignOut()

  const authState = useSelector(selectAuthState)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [formState, setFormState] = useState<UserAccountFormInnerProps>(authState.user)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false)
  const [showNotificaton, setShowNotificaton] = useState<boolean>(false)

  function onHandleRemoveAccount() {
    setModalOpen(true)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  async function handleRemoveAccount() {
    try {
      setIsLoadingRemove(true)
      const response = await userService.removeUser()
      console.log('response', response)
      setIsLoadingRemove(false)
      if (response?.status === 200) signOut()
    } catch (e) {
      console.log(e)
      setIsLoadingRemove(false)
    }
  }

  async function onHandleSubmit(props: UserEdtableAccountInfo) {
    try {
      setIsLoading(true)

      if (!authState) return

      const data: UserReadableAccountInfo = {
        ...props,
        _id: authState.user._id,
        role: authState.user.role,
      }

      let response = null
      if (authState.user.role === 'student') {
        response = await studentSerivce.updateUserAccount(data)
      }

      if (authState.user.role === 'teacher') {
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
      setFormState({
        email: response.data.email,
        fullname: response.data.fullname,
        phone: response.data.phone,
        login: response.data.login,
      })

      setIsLoading(false)
      setShowNotificaton(true)
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Box marginBottom={3}>
        <Typography variant="h5" className="MuiTypography">
          Account
        </Typography>
      </Box>
      <AccountForm
        isLoading={isLoading}
        onHandleRemoveAccount={onHandleRemoveAccount}
        onHandleSubmit={onHandleSubmit}
        initialData={formState}
        role={authState.user.role}
      />
      <Notification
        open={showNotificaton}
        setClose={() => setShowNotificaton(false)}
        direction={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {authState.user.role} updated successfully
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
                  {isLoadingRemove ? <CircularProgress size={16} /> : null}
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
