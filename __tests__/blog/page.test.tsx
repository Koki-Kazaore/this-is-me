import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogPage from '../../src/app/blog/page'

// Mock the Blog component used inside BlogPage
jest.mock('../../src/app/components/organisms/Blog', () => () => (
  <div data-testid="blog-component">Mocked Blog Component</div>
))

describe('BlogPage', () => {
  it('renders the Blog component', () => {
    render(<BlogPage />)
    expect(screen.getByTestId('blog-component')).toBeInTheDocument()
  })
})
