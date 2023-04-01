import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import Icon from 'components/Generic/Icon'
import { IconEnum } from 'components/Generic/Icon/Icon.type'

import { IUserAccountProps } from 'interfaces/user.interface'
import { IStudentProps } from 'interfaces/student.interface'

import { IStudentAccountFormProps, IStudentAccountEditableProps } from './Student.type'

function AccountForm({
  onHandleRemoveAccount,
  onHandleSubmit,
  initialData,
  isLoading = false,
}: IStudentAccountFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState<Partial<IUserAccountProps>>(initialData)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IStudentProps>({
    mode: 'onSubmit',
    defaultValues: initialData,
  })

  const {
    handleSubmit: handleSubmitPassword,
    register: registerPassword,
    formState: formStatePassword,
  } = useForm<{ password: string }>({
    mode: 'onSubmit',
  })

  function onChange(field: string, value: string) {
    if (!formData) return

    setFormData((prevState) => {
      return {
        ...prevState,
        [field]: value,
      }
    })
  }

  function onSubmit(data: IStudentAccountEditableProps) {
    onHandleSubmit({
      login: data.login,
      fullname: data.fullname,
      phone: data.phone,
    })
  }

  return (
    <form className="form-account" onSubmit={handleSubmit(onSubmit)}>
      <Box marginBottom={2}>
        <TextField
          {...register('fullname')}
          id={'fullname'}
          name={'fullname'}
          type={'fullname'}
          label={'fullname'}
          variant="standard"
          className="form-field"
          fullWidth
          onChange={(e) => onChange('fullname', e.currentTarget.value)}
          InputLabelProps={{ shrink: true }}
          error={!!errors['fullname']?.message}
          helperText={errors['fullname']?.message}
        />
      </Box>
      <Box marginBottom={2} display="flex" flexWrap="wrap" alignItems="flex-end">
        <TextField
          {...register('login')}
          id={'login'}
          name={'login'}
          type={'login'}
          label={'login'}
          variant="standard"
          className="form-field"
          fullWidth
          onChange={(e) => onChange('login', e.currentTarget.value)}
          InputLabelProps={{ shrink: true }}
          error={!!errors['login']?.message}
          helperText={errors['login']?.message}
        />
        <Button className="form-account__additional-button" onClick={onHandleRemoveAccount}>
          Remove account
        </Button>
      </Box>
      <Box marginBottom={2}>
        <TextField
          {...register('email')}
          id={'email'}
          name={'email'}
          type={'email'}
          label={'email'}
          variant="standard"
          className="form-field"
          fullWidth
          disabled
          onChange={(e) => onChange('email', e.currentTarget.value)}
          InputLabelProps={{ shrink: true }}
          error={!!errors['email']?.message}
          helperText={errors['email']?.message}
        />
      </Box>
      <Box marginBottom={2} display="flex" flexWrap="wrap" alignItems="flex-end">
        <TextField
          {...registerPassword('password')}
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          variant="standard"
          className="form-field"
          fullWidth
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" onClick={() => setShowPassword((show) => !show)}>
                <Icon size={20} icon={showPassword ? IconEnum.EYE_ACCESS : IconEnum.EYE_DENIED} />
              </InputAdornment>
            ),
          }}
          error={!!formStatePassword.errors.password?.message}
          helperText={formStatePassword.errors.password?.message}
        />
        <Button className="form-account__additional-button">Change password</Button>
      </Box>
      <Box marginBottom={2}>
        <TextField
          {...register('phone')}
          id={'phone'}
          name={'phone'}
          type={'phone'}
          label={'phone'}
          variant="standard"
          className="form-field"
          fullWidth
          onChange={(e) => onChange('phone', e.currentTarget.value)}
          InputLabelProps={{ shrink: true }}
          error={!!errors['phone']?.message}
          helperText={errors['phone']?.message}
        />
      </Box>
      <Box marginTop={3}></Box>
      <Box display="flex" alignItems="center">
        <Button type="submit" variant="contained" disabled={isLoading}>
          Save
        </Button>
        <Box ml={2}>{isLoading ? <CircularProgress size={16} /> : null}</Box>
      </Box>
    </form>
  )
}

export default AccountForm
