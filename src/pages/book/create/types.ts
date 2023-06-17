import { Book as BookType } from 'shared/types'

export type Book = Omit<BookType, 'createdAt' | '_id'>
