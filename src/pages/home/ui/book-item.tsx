import React, { FC } from 'react'
import { Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { DeleteBookButton } from 'features/book/delete'
import dayjs from 'dayjs'
import { Book } from 'shared/types'

type Props = Book

const BookItem: FC<Props> = ({ _id, title, createdAt, description, author, category, price }) => {
  return (
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
          <Stack direction='row' spacing={2} divider={<Divider orientation='vertical' flexItem />}>
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
  )
}

export { BookItem }
