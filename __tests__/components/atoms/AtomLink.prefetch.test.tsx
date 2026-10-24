import { render } from '@testing-library/react'
import AtomLink from '@/app/components/atoms/AtomLink'

const mockLink = jest.fn(
  ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  )
)

jest.mock('next/link', () => ({
  __esModule: true,
  default: (props: { href: string; children: React.ReactNode }) => mockLink(props)
}))

describe('AtomLink prefetch', () => {
  it('passes prefetch={false} to next/link', () => {
    render(<AtomLink href="/test" label="Test" />)

    expect(mockLink).toHaveBeenCalledWith(
      expect.objectContaining({ href: '/test', prefetch: false })
    )
  })
})
