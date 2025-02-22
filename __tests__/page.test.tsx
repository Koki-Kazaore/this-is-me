import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../src/app/page'

interface MockImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean;
}

jest.mock('next/image', () => {
  return function Image(props: MockImageProps) {
    const { priority, ...rest } = props;
    return <img {...rest} />;
  };
});

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})