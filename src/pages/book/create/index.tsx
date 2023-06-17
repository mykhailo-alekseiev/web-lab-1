import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { Page } from 'shared/routes'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'effector-forms'
import { useStore } from 'effector-react'
import BookIcon from '@mui/icons-material/Book'
import { Header } from 'widgets/header'
import { $isSuccessfulCreate, bookCreateForm, createBookFx, resetBookCreateFormEv } from './model'
import { BookCategory } from 'shared/types'

const BookCreatePage = () => {
  const navigate = useNavigate()
  const { fields, hasError, submit, eachValid, errorText } = useForm(bookCreateForm)
  const pending = useStore(createBookFx.pending)
  const isSuccessfulCreate = useStore($isSuccessfulCreate)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submit()
  }

  useEffect(() => {
    if (isSuccessfulCreate) {
      navigate(Page.Home)
      resetBookCreateFormEv()
    }
  }, [isSuccessfulCreate])

  return (
    <>
      <Helmet>
        <title>Create book</title>
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
                <BookIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Create Book
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3, width: '100%' }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Title'
                      value={fields.title.value}
                      disabled={pending}
                      onChange={(e) => fields.title.onChange(e.target.value)}
                      error={hasError('title')}
                      helperText={errorText('title')}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      label='Description'
                      value={fields.description.value}
                      error={hasError('description')}
                      disabled={pending}
                      onChange={(e) => fields.description.onChange(e.target.value)}
                      helperText={errorText('description')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Author'
                      value={fields.author.value}
                      error={hasError('author')}
                      disabled={pending}
                      onChange={(e) => fields.author.onChange(e.target.value)}
                      helperText={errorText('author')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Price ($)'
                      type='number'
                      value={fields.price.value}
                      error={hasError('price')}
                      disabled={pending}
                      onChange={(e) => fields.price.onChange(+e.target.value)}
                      helperText={errorText('price')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      label='Category'
                      fullWidth
                      error={hasError('category')}
                      disabled={pending}
                      helperText={errorText('category')}
                      value={fields.category.value}
                      onChange={(e) => fields.category.onChange(e.target.value as any)}
                    >
                      {[
                        BookCategory.Adventure,
                        BookCategory.Crime,
                        BookCategory.Classic,
                        BookCategory.Love,
                      ].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!eachValid || pending}
                  >
                    Create
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  )
}

export default BookCreatePage
