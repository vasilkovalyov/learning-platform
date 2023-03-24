import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'

import Icon from 'components/Generic/Icon'
import { IconEnum } from 'components/Generic/Icon/Icon.type'

import { UserAccountInfo, UserAccountFormInnerProps } from 'interfaces/user.interface'

import { AccountFormProps } from './AccountForm.type'

function AccountForm({ onHandleRemoveAccount, onHandleSubmit, initialData }: AccountFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState<UserAccountFormInnerProps>(initialData)
  const [isDisableButtonSubmit, setIsDisableButtonSubmit] = useState<boolean>(true)
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UserAccountFormInnerProps>({
    mode: 'onSubmit',
    defaultValues: initialData,
  })

  function onChange(field: string, value: string) {
    if (!formData) return

    const formDataObject: UserAccountFormInnerProps = {
      ...formData,
      [field]: value,
    }

    setFormData(formDataObject)

    if (JSON.stringify(initialData) !== JSON.stringify(formDataObject)) {
      setIsDisableButtonSubmit(false)
    } else {
      setIsDisableButtonSubmit(true)
    }
  }

  function onSubmit(data: UserAccountInfo) {
    onHandleSubmit(data)
    setIsDisableButtonSubmit(true)
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
          disabled
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
          onChange={(e) => onChange('email', e.currentTarget.value)}
          InputLabelProps={{ shrink: true }}
          error={!!errors['email']?.message}
          helperText={errors['email']?.message}
        />
      </Box>
      <Box marginBottom={2} display="flex" flexWrap="wrap" alignItems="flex-end">
        <TextField
          {...register('password')}
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
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
        <Button
          className="form-account__additional-button"
          onClick={() => {
            setValue('password', '')
          }}
        >
          Change password
        </Button>
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
      <Button type="submit" variant="contained" disabled={isDisableButtonSubmit}>
        Save
      </Button>
    </form>
  )
}

export default AccountForm
