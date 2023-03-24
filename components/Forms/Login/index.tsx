import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'

import { FormLoginProps } from './Login.type'

import { LoginProps } from 'interfaces/user.interface'
import { LoginFormSchema } from 'utils/schemas/authentication'

import Icon from 'components/Generic/Icon'
import { IconEnum } from 'components/Generic/Icon/Icon.type'

function FormLogin({ onSubmit, isLoading, validationMessage }: FormLoginProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginProps>({
    mode: 'onSubmit',
    resolver: yupResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  return (
    <form name="form-login" onSubmit={handleSubmit(onSubmit)} className="form form-login">
      <Box marginBottom={2}>
        <TextField
          {...register('email')}
          id="email"
          name="email"
          type="email"
          label="Email"
          variant="standard"
          className="form-field"
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!errors.email?.message}
          helperText={errors.email?.message}
        />
      </Box>
      <Box marginBottom={2}>
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
              <InputAdornment position="end" onClick={handleClickShowPassword}>
                <Icon size={20} icon={showPassword ? IconEnum.EYE_ACCESS : IconEnum.EYE_DENIED} />
              </InputAdornment>
            ),
          }}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
      </Box>
      {validationMessage && (
        <Box marginBottom={2}>
          <Typography variant="body2" className="MuiTypography">
            {validationMessage}
          </Typography>
        </Box>
      )}
      <Button type="submit" variant="contained">
        Sign in
      </Button>
      {isLoading ? <LinearProgress /> : null}
    </form>
  )
}

export default FormLogin
