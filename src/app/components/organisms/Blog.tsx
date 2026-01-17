import { FC } from 'react'
import Navbar from './Navbar'
import Footer from '../Footer'
import Article from '../molecules/Article'

// Definition of article data
const articles = [
  {
    id: 7,
    title:
      'Handling of the presentation role not suggested by Playwright Inspector',
    abstract:
      "This article reveals why Playwright's Codegen intentionally excludes the presentation role from recommended locators—it undermines accessibility and should be avoided in tests.",
  },
  {
    id: 6,
    title:
      'Understanding Rails MVC Architecture - From Abstract Concepts to Hanshin Tigers',
    abstract:
      'This article explains the MVC (Model-View-Controller) pattern. And then to promote understanding, I apply MVC architecture to the Hanshin Tigers baseball team, demonstrating how concepts work together.',
  },
  {
    id: 5,
    title: 'Dissecting Consolidated Commits with Interactive Rebase',
    abstract:
      'This article explains how to locate and inspect original commits hidden behind interactive rebase consolidations.',
  },
  {
    id: 4,
    title:
      'One Japanese dives into nwHacks, one of the largest hackathons in Western Canada',
    abstract:
      'This is a summary of my first international hackathon experience.',
  },
  {
    id: 3,
    title: 'SOP and CORS basics and debugging',
    abstract:
      'This article introduces the fundamentals of Same-Origin Policy (SOP) and Cross-Origin Resource Sharing (CORS), detailing their configuration and verification using FastAPI and Postman.',
  },
  {
    id: 2,
    title: 'The first OSS contribution in my life became roadmap.sh',
    abstract:
      'I made my first open-source contribution to roadmap.sh, enriching its AWS content, which inspired me to continue engaging with OSS projects.',
  },
  {
    id: 1,
    title: 'Qiita Hackathon Participation Report',
    abstract:
      'This is a report on the participation in the Qiita Hackathon by team:m1nus. I will introduce the team members, the theme, the process, and the results of the hackathon.',
  },
]

const Blog: FC = () => {
  return (
    <main className="flex flex-col min-h-screen bg-[rgb(18,18,18)]">
      <Navbar />
      <div className="flex-grow sm:container mt-24 mx-auto px-12 py-4">
        {articles.map((article) => (
          <Article
            key={article.id}
            id={article.id}
            title={article.title}
            abstract={article.abstract}
          />
        ))}
      </div>
      <Footer />
    </main>
  )
}

export default Blog
