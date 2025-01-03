import React from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

interface IconButtonProps {
  isOpen: boolean
  onClick: () => void
}

const IconButton: React.FC<IconButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200
                 hover:text-white hover:border-white'
    >
      {isOpen ? (
        <XMarkIcon className='h-5 w-5' />
      ) : (
        <Bars3Icon className='h-5 w-5' />
      )}
    </button>
  )
}

export default IconButton