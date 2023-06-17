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
import dayjs from 'dayjs'
import { DeleteBookButton } from 'features/book/delete'

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
              {bookList.map(({ _id, title, createdAt, description, author, category, price }) => (
                <Card key={_id}>
                  <CardContent>
                    <Stack spacing={1}>
                      <Stack spacing={1} direction='row' justifyContent='space-between'>
                        <Typography color='text.secondary' variant='h5' fontWeight={700}>
                          Title: {title}
                        </Typography>
                        <DeleteBookButton bookId={_id} />
                      </Stack>
                      <Typography color='text.secondary'>Description: {description}</Typography>
                      <Stack
                        direction='row'
                        spacing={2}
                        divider={<Divider orientation='vertical' flexItem />}
                      >
                        <Typography color='text.secondary'>Author: {author}</Typography>
                        <Typography color='text.secondary'>Categody: {category}</Typography>
                        <Typography color='text.secondary'>Price: {price}</Typography>
                        <Typography color='text.secondary'>
                          Created at: {dayjs(createdAt).format('MM/DD/YYYY')}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </>
  )
}

export default HomePage
