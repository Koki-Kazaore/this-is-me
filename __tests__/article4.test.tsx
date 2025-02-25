import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Article from '../src/app/components/molecules/Article'

describe('Blog Article 4', () => {
  it('renders the article title', () => {
    render(<Article id={4} title="One Japanese dives into nwHacks, one of the largest hackathons in Western Canada" abstract="This is a summary of my first international hackathon experience." />)

    const title = screen.getByText('One Japanese dives into nwHacks, one of the largest hackathons in Western Canada')
    expect(title).toBeInTheDocument()
  })

  it('renders the article abstract', () => {
    render(<Article id={4} title="One Japanese dives into nwHacks, one of the largest hackathons in Western Canada" abstract="This is a summary of my first international hackathon experience." />)

    const abstract = screen.getByText(/This is a summary of my first international hackathon experience./i)
    expect(abstract).toBeInTheDocument()
  })
})
