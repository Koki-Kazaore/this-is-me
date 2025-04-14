import { render, screen } from '@testing-library/react'
import AtomLink from '@/app/components/atoms/AtomLink'

describe('AtomLink', () => {
  it('renders link with correct href and label', () => {
    const props = {
      href: '/test',
      label: 'Test Link'
    }

    render(<AtomLink {...props} />)

    const link = screen.getByText(props.label)
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', props.href)
  })

  it('applies custom className when provided', () => {
    const props = {
      href: '/test',
      label: 'Test Link',
      className: 'custom-class'
    }

    render(<AtomLink {...props} />)

    const link = screen.getByText(props.label)
    expect(link.closest('a')).toHaveClass('custom-class')
  })
})
