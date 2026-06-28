import { FC } from 'react'
import Link from 'next/link'

const Article: FC<{ id: number, title: string; abstract: string }> = ({ id, title, abstract }) => (
  <Link href={`/blog/${id}`} className="block w-full min-w-0 max-w-full">
    <article className='text-white rounded-xl mt-3 bg-[#23272f] py-6 px-4 w-full min-w-0 max-w-full'>
      <h2 className='text-xl sm:text-2xl font-semibold mb-2 min-w-0 whitespace-normal [overflow-wrap:anywhere]'>{title}</h2>
      <p className='min-w-0 whitespace-normal [overflow-wrap:anywhere]'>{abstract}</p>
    </article>
  </Link>
)

export default Article
