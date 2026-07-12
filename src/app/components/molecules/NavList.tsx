import React from "react";
import AtomLink from "../atoms/AtomLink";

interface NavLinkItem {
  title: string
  path: string
}

interface NavListProps {
  links: NavLinkItem[]
  direction?: 'horizontal' | 'vertical'
}

const NavList: React.FC<NavListProps> = ({
  links,
  direction = 'horizontal'
}) => {
  if (direction === 'horizontal') {
    return (
      <ul className='flex items-center gap-8'>
        {links.map((link, index) => (
          <AtomLink
            key={index}
            href={link.path}
            label={link.title}
            className='text-sm text-fg-muted transition-colors hover:text-fg'
          />
        ))}
      </ul>
    )
  }
  return (
    <ul className='flex flex-col items-center gap-4 border-t border-hairline py-6'>
      {links.map((link, index) => (
        <AtomLink
          key={index}
          href={link.path}
          label={link.title}
          className='text-sm text-fg-muted transition-colors hover:text-fg'
        />
      ))}
    </ul>
  )
}

export default NavList
