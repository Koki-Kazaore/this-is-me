import React from 'react'
import { render, screen } from '@testing-library/react'
import Blog from '../../../src/app/components/organisms/Blog'

// Mock the Navbar component
jest.mock('../../../src/app/components/organisms/Navbar', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="navbar-mock">Navbar Mock</div>,
  }
})

// Mock the Footer component
jest.mock('../../../src/app/components/Footer', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="footer-mock">Footer Mock</div>,
  }
})

// Mock the Article repository module
jest.mock('@/lib/articles', () => ({
  __esModule: true,
  listArticles: () => [
    { id: 7, title: 'Handling of the presentation role not suggested by Playwright Inspector', abstract: "This article reveals why Playwright's Codegen intentionally excludes the presentation role from recommended locators—it undermines accessibility and should be avoided in tests." },
    { id: 6, title: 'Understanding Rails MVC Architecture - From Abstract Concepts to Hanshin Tigers', abstract: 'This article explains the MVC (Model-View-Controller) pattern. And then to promote understanding, I apply MVC architecture to the Hanshin Tigers baseball team, demonstrating how concepts work together.' },
    { id: 5, title: 'Dissecting Consolidated Commits with Interactive Rebase', abstract: 'This article explains how to locate and inspect original commits hidden behind interactive rebase consolidations.' },
    { id: 4, title: 'One Japanese dives into nwHacks, one of the largest hackathons in Western Canada', abstract: 'This is a summary of my first international hackathon experience.' },
    { id: 3, title: 'SOP and CORS basics and debugging', abstract: 'This article introduces the fundamentals of Same-Origin Policy (SOP) and Cross-Origin Resource Sharing (CORS), detailing their configuration and verification using FastAPI and Postman.' },
    { id: 2, title: 'The first OSS contribution in my life became roadmap.sh', abstract: 'I made my first open-source contribution to roadmap.sh, enriching its AWS content, which inspired me to continue engaging with OSS projects.' },
    { id: 1, title: 'Qiita Hackathon Participation Report', abstract: 'This is a report on the participation in the Qiita Hackathon by team:m1nus. I will introduce the team members, the theme, the process, and the results of the hackathon.' },
  ],
}))

// Mock the Article component to capture props
jest.mock('../../../src/app/components/molecules/Article', () => {
  return {
    __esModule: true,
    default: (props: any) => (
      <div
        data-testid="article-mock"
        data-id={props.id}
        data-title={props.title}
      >
        {props.title}
        <p>{props.abstract}</p>
      </div>
    ),
  }
})

describe('Blog Component', () => {
  it('renders without crashing', () => {
    render(<Blog />)
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument()
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument()
  })

  it('renders the correct number of articles', () => {
    render(<Blog />)
    const articles = screen.getAllByTestId('article-mock')
    expect(articles).toHaveLength(7)
  })

  it('passes correct props to Article components', () => {
    render(<Blog />)

    // Check sixth article (id: 6)
    const sixthArticle = screen.getByText(
      'Understanding Rails MVC Architecture - From Abstract Concepts to Hanshin Tigers'
    )
    expect(sixthArticle).toBeInTheDocument()
    expect(
      sixthArticle.closest('[data-testid="article-mock"]')
    ).toHaveAttribute('data-id', '6')

    // Check first article (id: 5)
    const firstArticle = screen.getByText(
      'Dissecting Consolidated Commits with Interactive Rebase'
    )
    expect(firstArticle).toBeInTheDocument()
    expect(
      firstArticle.closest('[data-testid="article-mock"]')
    ).toHaveAttribute('data-id', '5')

    // Check second article (id: 4)
    const secondArticle = screen.getByText(
      'One Japanese dives into nwHacks, one of the largest hackathons in Western Canada'
    )
    expect(secondArticle).toBeInTheDocument()
    expect(
      secondArticle.closest('[data-testid="article-mock"]')
    ).toHaveAttribute('data-id', '4')

    // Check third article (id: 3)
    const thirdArticle = screen.getByText('SOP and CORS basics and debugging')
    expect(thirdArticle).toBeInTheDocument()
    expect(
      thirdArticle.closest('[data-testid="article-mock"]')
    ).toHaveAttribute('data-id', '3')

    // Check fourth article (id: 2)
    const fourthArticle = screen.getByText(
      'The first OSS contribution in my life became roadmap.sh'
    )
    expect(fourthArticle).toBeInTheDocument()
    expect(
      fourthArticle.closest('[data-testid="article-mock"]')
    ).toHaveAttribute('data-id', '2')

    // Check fifth article (id: 1)
    const fifthArticle = screen.getByText(
      'Qiita Hackathon Participation Report'
    )
    expect(fifthArticle).toBeInTheDocument()
    expect(
      fifthArticle.closest('[data-testid="article-mock"]')
    ).toHaveAttribute('data-id', '1')
  })

  it('renders articles with correct abstracts', () => {
    render(<Blog />)

    // Check abstracts are rendered
    expect(
      screen.getByText(
        'This article explains the MVC (Model-View-Controller) pattern. And then to promote understanding, I apply MVC architecture to the Hanshin Tigers baseball team, demonstrating how concepts work together.'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'This article explains how to locate and inspect original commits hidden behind interactive rebase consolidations.'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'This is a summary of my first international hackathon experience.'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'This article introduces the fundamentals of Same-Origin Policy (SOP) and Cross-Origin Resource Sharing (CORS), detailing their configuration and verification using FastAPI and Postman.'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'I made my first open-source contribution to roadmap.sh, enriching its AWS content, which inspired me to continue engaging with OSS projects.'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'This is a report on the participation in the Qiita Hackathon by team:m1nus. I will introduce the team members, the theme, the process, and the results of the hackathon.'
      )
    ).toBeInTheDocument()
  })

  it('has the correct styling and layout classes', () => {
    const { container } = render(<Blog />)

    // Check for main container
    const mainElement = container.querySelector('main')
    expect(mainElement).toHaveClass('flex')
    expect(mainElement).toHaveClass('flex-col')
    expect(mainElement).toHaveClass('min-h-screen')
    expect(mainElement).toHaveClass('w-full')
    expect(mainElement).toHaveClass('min-w-0')

    // Check for article container (editorial reading column)
    const articleContainer = container.querySelector('div.flex-grow')
    expect(articleContainer).toHaveClass('mx-auto')
    expect(articleContainer).toHaveClass('max-w-3xl')
    expect(articleContainer).toHaveClass('px-6')
    expect(articleContainer).toHaveClass('pt-24')
    expect(articleContainer).toHaveClass('w-full')
    expect(articleContainer).toHaveClass('min-w-0')
  })
})
