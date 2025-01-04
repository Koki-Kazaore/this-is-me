import React from 'react';
import Link from 'next/link'

interface HeadingProps {
  label: string
  className?: string
  href?: string
}

const Heading: React.FC<HeadingProps> = ({ label, className, href='/' }) => {
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  )
}

export default Heading