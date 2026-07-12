import { FC } from 'react'
import Link from 'next/link'

const Article: FC<{ id: number, title: string; abstract: string; date?: string }> = ({ id, title, abstract, date }) => (
  <Link href={`/blog/${id}`} className="group block w-full min-w-0 max-w-full py-7">
    <article className='w-full min-w-0 max-w-full'>
      {date && (
        <p className='font-mono text-xs text-fg-subtle'>{date}</p>
      )}
      <h2 className='mt-2 text-lg font-medium text-fg decoration-fg-subtle underline-offset-4 min-w-0 whitespace-normal [overflow-wrap:anywhere] group-hover:underline'>{title}</h2>
      <p className='mt-2 text-sm leading-relaxed text-fg-muted min-w-0 whitespace-normal [overflow-wrap:anywhere]'>{abstract}</p>
    </article>
  </Link>
)

export default Article
