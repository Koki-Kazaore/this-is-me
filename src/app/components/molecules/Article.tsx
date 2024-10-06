import { FC } from 'react'
import Link from 'next/link'

const Article: FC<{ id: string, title: string; abstract: string }> = ({ id, title, abstract }) => (
  <Link href={`/blog/${id}`}>
    <article className='text-white rounded-xl mt-3 bg-[#23272f] py-6 px-4'>
      <h2 className='text-2xl font-semibold mb-2'>{title}</h2>
      <p>{abstract}</p>
    </article>
  </Link>
)

export default Article