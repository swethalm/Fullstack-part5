import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Testing Blog component', () => {

    const testBlog = {
        title: 'Test Blog',
        author: 'test',
        url:'testURL',
        likes: 0,
        user: {username:'user1', name:'name1'}
    }

    const testUser = {
        username:'user1', name:'name1'
    }
    
    const mockHandler = jest.fn()
    let component

    beforeEach(() => {
        component = render(
            <Blog
                blog={testBlog }
                addLike={ mockHandler }
                deleteBlog={ mockHandler }
                user={ testUser }
            />
        )
    })

    test('Blog renders title and author', () => {
        const title = component.getByText('Test Blog')
        expect(title).toBeDefined()
        const author = component.getByText('by test')
        expect(author).toBeDefined()
    })

    test('Url and likes not displayed initially', () => {
        const div = component.container.querySelector('.togglableDetails')
        expect(div).toHaveStyle('display: none')
    })

    test('Url and likes displayed on clicking View', () => {
        const button = component.getByText('View')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableDetails')
        expect(div).not.toHaveStyle('display: none')
    })

    test('Clicking like twice', () => {
        const button = component.getByText('Like')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })

})