import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('BlogForm renders correct details', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(author, { 
    target: { value: 'test' } 
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls[0][0].author).toBe('test' )

})