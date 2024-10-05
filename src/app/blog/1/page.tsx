import { FC } from 'react'
import { notFound } from 'next/navigation'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'
import Navbar from './../../components/Navbar'
import Footer from './../../components/Footer'

const BlogPost: FC = () => {
  const markdownPath = path.join(process.cwd(), 'content', 'posts', '1.md')

  if (!fs.existsSync(markdownPath)) {
    notFound()
  }

  const fileContents = fs.readFileSync(markdownPath, 'utf-8')
  const { data, content } = matter(fileContents)

  const htmlContent = marked(content)

  return (
    <main className='flex flex-col min-h-screen bg-[rgb(18,18,18)]'>
      <Navbar />
      <div className='flex-grow sm:container mt-24 mx-auto px-12 py-4'>
        <article className='prose prose-invert max-w-none'>
          <h1>{data.title}</h1>
          <div className='text-white' dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>
      </div>
      <Footer />
    </main>
  )
}

export default BlogPost