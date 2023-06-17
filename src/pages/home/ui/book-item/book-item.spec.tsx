import { cleanup, render } from '@testing-library/react'
import { BookItem } from 'pages/home/ui/book-item/index'
import React from 'react'
import { BookCategory } from 'shared/types'
import '@testing-library/jest-dom'
import dayjs from 'dayjs'

afterEach(cleanup)

describe('book item', () => {
  it('correct display', () => {
    const createdAt = new Date()

    const { asFragment, container } = render(
      <BookItem
        _id='random'
        title='Title1'
        description='Description 1'
        author='Ryan Gosling'
        price={100}
        category={BookCategory.Classic}
        createdAt={createdAt}
      />,
    )

    expect(container).toHaveTextContent('Title: Title1')
    expect(container).toHaveTextContent('Description: Description 1')
    expect(container).toHaveTextContent('Author: Ryan Gosling')
    expect(container).toHaveTextContent(`Category: ${BookCategory.Classic}`)
    expect(container).toHaveTextContent('Price: 100')
    expect(container).toHaveTextContent(`Created at: ${dayjs(createdAt).format('MM/DD/YYYY')}`)

    expect(container.querySelector('div')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
