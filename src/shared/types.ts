export enum BookCategory {
  Adventure = 'adventure',
  Classic = 'classic',
  Crime = 'crime',
  Love = 'love',
}

export interface Book {
  _id: string
  title: string
  description: string
  author: string
  price: number
  category: BookCategory
  createdAt: Date
}
