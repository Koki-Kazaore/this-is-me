import React from 'react'
import Link from '../atoms/AtomLink'

interface NavLinkItem {
  title: string
  path: string
}

interface NavItemProps {
  link: NavLinkItem
}

const NavItem: React.FC<NavItemProps> = ({ link }) => {
  return (
    <li>
      <Link
        href={link.path}
        label={link.title}
        className='text-white hover:opacity-80'
      />
    </li>
  )
}

export default NavItem