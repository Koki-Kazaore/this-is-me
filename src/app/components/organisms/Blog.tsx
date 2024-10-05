import { FC } from 'react'
import Navbar from './../Navbar'
import Footer from '../Footer'
import Article from '../molecules/Article'

// Definition of article data
const articles = [
  {
    id: 1,
    title: 'Qiita Hackathon Participation Report',
    abstract: 'This is a report on the participation in the Qiita Hackathon by team:m1nus. I will introduce the team members, the theme, the process, and the results of the hackathon.'
  }
]

const Blog: FC = () => {
  return (
    <main className='flex flex-col min-h-screen bg-[rgb(18,18,18)]'>
        <Navbar />
        <div className='flex-grow sm:container mt-24 mx-auto px-12 py-4'>
          {articles.map((article) => (
            <Article key={article.id} title={article.title} abstract={article.abstract} />
          ))}
        </div>
        <Footer />
    </main>
  )
}

export default Blog