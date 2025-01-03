import Link from 'next/link'
import React from 'react'

interface AtomLinkProps {
  href: string
  label: string
  className?: string
}

const AtomLink: React.FC<AtomLinkProps> = ({ href, label, className }) => {
  return (
    <Link href={href} className={className} prefetch={false}>
      {label}
    </Link>
  )
}

export default AtomLink