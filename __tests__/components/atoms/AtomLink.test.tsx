import { render, screen } from '@testing-library/react'
import AtomLink from '@/app/components/atoms/AtomLink'

describe('AtomLink', () => {
  it('renders link with correct href and label', () => {
    const props = {
      href: '/test',
      label: 'Test Link'
    }

    render(<AtomLink {...props} />)

    const link = screen.getByRole('link', { name: props.label })
    expect(link).toHaveAttribute('href', props.href)
  })

  it('applies custom className when provided', () => {
    const props = {
      href: '/test',
      label: 'Test Link',
      className: 'custom-class'
    }

    render(<AtomLink {...props} />)

    const link = screen.getByRole('link', { name: props.label })
    expect(link).toHaveClass('custom-class')
  })

  it('does not set a class attribute when className is not provided', () => {
    render(<AtomLink href="/test" label="Test Link" />)

    const link = screen.getByRole('link', { name: 'Test Link' })
    expect(link).not.toHaveAttribute('class')
  })

  it('renders an absolute external href unchanged', () => {
    const href = 'https://github.com/Koki-Kazaore'

    render(<AtomLink href={href} label="GitHub" />)

    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', href)
  })

  it('renders a hash href unchanged for in-page navigation', () => {
    render(<AtomLink href="#about" label="About" />)

    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about')
  })
})
