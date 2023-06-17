import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Button, Container, Grid, Stack, Typography } from '@mui/material'
import { Header } from 'widgets/header'
import { $email, $name, $sex } from 'entities/user'
import { useStore } from 'effector-react'
import { logoutEv } from 'process/auth'

const ProfilePage = () => {
  const name = useStore($name)
  const email = useStore($email)
  const sex = useStore($sex)

  const handleLogout = () => {
    logoutEv()
  }
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Grid display='grid' height='100vh' gridTemplateRows='auto 1fr'>
        <Grid item xs>
          <Header />
        </Grid>
        <Grid item xs>
          <Container
            sx={{
              height: '100%',
              my: '2em',
            }}
          >
            <Stack spacing={2}>
              <Typography>Name: {name}</Typography>
              <Typography>Email: {email}</Typography>
              <Typography>Sex: {sex}</Typography>

              <div>
                <Button variant='contained' onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </>
  )
}

export default ProfilePage
