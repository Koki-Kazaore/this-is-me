import { FC } from 'react'

const Article: FC<{ title: string; abstract: string }> = ({ title, abstract }) => (
  <article className='text-white rounded-xl mt-3 bg-[#23272f] py-6 px-4'>
    <h2 className='text-2xl font-semibold mb-2'>{title}</h2>
    <p>{abstract}</p>
  </article>
)

export default Article