import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

type Props  = {
  params: { id: string }
}

type ArticleData = {
  title: string
  date: string
}

const BlogDetail = async ({ params }: Props) => {
  const { id } = params
  const articlesDirectory = path.join(process.cwd(), 'public', 'articles')
  const fullPath = path.join(articlesDirectory, `${id}.md`)

  // check if the file exists
  if (!fs.existsSync(fullPath)) {
    return <div>404 - Page Not Found</div>
  }

  const filecontents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(filecontents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return (
    <main className='flex flex-col min-h-screen bg-[rgb(18,18,18)]'>
      <Navbar />
      <div className='flex-grow sm:container mt-24 mx-auto px-12 py-4'>
        <h1 className='text-4xl font-semibold text-white'>{data.title}</h1>
        <p className='text-gray-400'>{data.date}</p>
        <div
          className='text-white mt-4'
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <Footer />
    </main>
  )
}

export async function generateStaticParams() {
  const articlesDirectory = path.join(process.cwd(), 'public', 'articles')
  const filenames = fs.readdirSync(articlesDirectory)

  return filenames.map((filename) => ({
    id: filename.replace(/\.md$/, ''),
  }))
}

export default BlogDetail