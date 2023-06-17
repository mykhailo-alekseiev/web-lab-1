import React, { useEffect } from 'react'
import {
  Backdrop,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { Header } from 'widgets/header'
import { $bookList, getBookListFx } from './model'
import { useStore } from 'effector-react'
import { Helmet } from 'react-helmet-async'
import { BookItem } from 'pages/home/ui'

const HomePage = () => {
  const bookList = useStore($bookList)
  const pending = useStore(getBookListFx.pending)

  useEffect(() => {
    getBookListFx()
  }, [])

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={pending}>
        <CircularProgress color='inherit' />
      </Backdrop>
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
              {bookList.map((book) => (
                <BookItem key={book._id} {...book} />
              ))}
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </>
  )
}

export default HomePage
