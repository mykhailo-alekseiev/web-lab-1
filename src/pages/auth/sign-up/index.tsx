import React from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Page } from 'shared/routes'
import { Link as RouterLink } from 'react-router-dom'
import { SEX_OPTIONS } from './config'
import { signUpForm } from './model'
import { useForm } from 'effector-forms'
import { signUpFx } from 'process/auth'
import { useStore } from 'effector-react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const SignUpPage = () => {
  const { fields, hasError, submit, eachValid, errorText } = useForm(signUpForm)
  const pending = useStore(signUpFx.pending)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submit()
  }
  return (
    <>
      <Helmet>
        <title>Sign Up</title>
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
            width: 600,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Name'
                  autoFocus
                  value={fields.name.value}
                  disabled={pending}
                  onChange={(e) => fields.name.onChange(e.target.value)}
                  error={hasError('name')}
                  helperText={errorText('name')}
                  inputProps={{
                    ['data-cy']: 'name',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  inputProps={{
                    ['data-cy']: 'email',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  inputProps={{
                    ['data-cy']: 'password',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id='demo-radio-buttons-group-label'>Sex</FormLabel>
                  <RadioGroup
                    id='radio-buttons-group'
                    value={fields.sex.value}
                    onChange={(e) => fields.sex.onChange(e.target.value)}
                  >
                    <Stack direction='row'>
                      {SEX_OPTIONS.map(({ value, label }) => (
                        <FormControlLabel
                          key={value}
                          disabled={pending}
                          value={value}
                          control={<Radio data-cy={`radio-button-${value}`} />}
                          label={label}
                        />
                      ))}
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={!eachValid || pending}
              data-cy='sign-up-submit'
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link
                  component={RouterLink}
                  to={Page.SignIn}
                  variant='body2'
                  data-cy='sign-in-redirect'
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default SignUpPage
