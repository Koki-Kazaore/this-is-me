import { FC } from 'react'
import Navbar from './Navbar'
import Footer from '../Footer'
import Article from '../molecules/Article'
import { listArticles } from '@/lib/articles'

const Blog: FC = () => {
  const articles = listArticles()
  return (
    <main className="flex w-full min-w-0 flex-col min-h-screen bg-[rgb(18,18,18)]">
      <Navbar />
      <div className="flex-grow w-full min-w-0 max-w-full sm:container mt-24 mx-auto px-4 sm:px-12 py-4">
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
