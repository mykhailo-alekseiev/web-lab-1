import React, { FC, useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteBookFx } from './model'

interface Props {
  bookId: string
}

const DeleteBookButton: FC<Props> = ({ bookId }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    setOpen(false)
    deleteBookFx({ bookId })
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen} color='error'>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export { DeleteBookButton }
