import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ArticleContent from '../../src/app/components/ArticleContent'

// Mock the mermaid library used by MermaidRenderer
jest.mock('mermaid', () => ({
  initialize: jest.fn(),
  render: jest.fn(),
}))

describe('ArticleContent', () => {
  it('renders basic markdown text', () => {
    render(<ArticleContent content="# Hello" />)

    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders a markdown image as an <img> with src and alt', () => {
    const { container } = render(<ArticleContent content="![alt text](/x.png)" />)

    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/x.png')
    expect(img).toHaveAttribute('alt', 'alt text')
  })

  it('renders a mermaid fenced code block via MermaidRenderer', () => {
    const content = '```mermaid\ngraph TD; A-->B;\n```'

    const { container } = render(<ArticleContent content={content} />)

    expect(container.querySelector('.mermaid-diagram')).toBeInTheDocument()
  })

  it('renders a non-mermaid fenced code block as a <code> element', () => {
    const content = '```js\nconst a=1;\n```'

    const { container } = render(<ArticleContent content={content} />)

    const code = container.querySelector('code')
    expect(code).toBeInTheDocument()
    expect(code?.textContent).toContain('const a=1;')
    expect(container.querySelector('.mermaid-diagram')).not.toBeInTheDocument()
  })
})
