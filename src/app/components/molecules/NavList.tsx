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
      <ul className='flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0'>
        {links.map((link, index) => (
          <AtomLink
            key={index}
            href={link.path}
            label={link.title}
            className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'
          />
        ))}
      </ul>
    )
  }
  return (
    <ul className='flex flex-col py-4 items-center'>
      {links.map((link, index) => (
        <AtomLink
          key={index}
          href={link.path}
          label={link.title}
          className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'
        />
      ))}
    </ul>
  )
}

export default NavList