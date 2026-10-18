import React from 'react'
import Link from 'next/link'

// ProjectCardコンポーネントのpropsの型を定義
interface ProjectCardProps {
    imgUrl: string;
    title: string;
    description: string;
    tags: string[];
    gitUrl: string;
    productUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, gitUrl, productUrl }) => {
  return (
    <article className='py-8'>
        <div className='flex items-baseline justify-between gap-4'>
            <h5 className='text-lg font-medium text-fg'>{title}</h5>
            <div className='flex shrink-0 items-baseline gap-5 font-mono text-xs'>
                {gitUrl && (
                    <Link href={gitUrl} className='text-fg-subtle transition-colors hover:text-fg'>
                        GitHub ↗
                    </Link>
                )}
                {productUrl && (
                    <Link href={productUrl} className='text-fg-subtle transition-colors hover:text-fg'>
                        Site ↗
                    </Link>
                )}
            </div>
        </div>
        <p className='mt-2 max-w-xl text-sm leading-relaxed text-fg-muted'>{description}</p>
    </article>
  )
}

export default ProjectCard
