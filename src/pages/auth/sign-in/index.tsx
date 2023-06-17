import React from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { Page } from 'shared/routes'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'effector-forms'
import { signInFx } from 'process/auth'
import { useStore } from 'effector-react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { signInForm } from 'pages/auth/sign-in/model'

const SignInPage = () => {
  const { fields, hasError, submit, eachValid, errorText } = useForm(signInForm)
  const pending = useStore(signInFx.pending)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submit()
  }
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={pending}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign In
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Email Address'
                  autoComplete='email'
                  type='email'
                  value={fields.email.value}
                  disabled={pending}
                  onChange={(e) => fields.email.onChange(e.target.value)}
                  error={hasError('email')}
                  helperText={errorText('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  autoComplete='new-passwordsm={6}'
                  value={fields.password.value}
                  error={hasError('password')}
                  disabled={pending}
                  onChange={(e) => fields.password.onChange(e.target.value)}
                  helperText={errorText('password')}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={!eachValid || pending}
            >
              Sign In
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link component={RouterLink} to={Page.SignUp} variant='body2'>
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default SignInPage
