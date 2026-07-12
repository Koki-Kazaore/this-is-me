import { FC } from 'react'
import Navbar from './Navbar'
import Footer from '../Footer'
import Article from '../molecules/Article'
import { listArticles } from '@/lib/articles'

const Blog: FC = () => {
  const articles = listArticles()
  return (
    <main className="flex w-full min-w-0 flex-col min-h-screen">
      <Navbar />
      <div className="mx-auto w-full min-w-0 max-w-3xl flex-grow px-6 pt-24">
        <section className='pb-16 pt-12 sm:pt-16'>
          <h1 className='font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle'>Writing</h1>
          <div className='mt-4 divide-y divide-hairline'>
            {articles.map((article) => (
              <Article
                key={article.id}
                id={article.id}
                title={article.title}
                abstract={article.abstract}
                date={article.date}
              />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

export default Blog
