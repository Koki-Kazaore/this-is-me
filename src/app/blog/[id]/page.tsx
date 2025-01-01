import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Navbar from '../../components/organisms/Navbar'
import Footer from '../../components/Footer'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'

type Props  = {
  params: { id: string }
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

  return (
    <main className='flex flex-col min-h-screen bg-[rgb(18,18,18)]'>
      <Navbar />
      <div className='flex-grow flex justify-center items-center mt-24 mx-auto px-12 py-4'>
        <div className='max-w-3xl w-full'>
          <p className='text-gray-400'>{data.date}</p>
          <h1 className='text-4xl font-semibold text-white'>{data.title}</h1>
          <div className='prose prose-invert mt-4 max-w-none'>
            <ReactMarkdown
            remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => (
                  <Image
                    src={props.src || ''}
                    alt={props.alt || ''}
                    width={800}
                    height={600}
                    style={{ width: '100%', height: 'auto' }}
                  />
                )
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
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