import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t border-hairline'>
        <div className='mx-auto flex w-full max-w-3xl flex-col gap-2 px-6 py-10 xs:flex-row xs:items-center xs:justify-between'>
            <span className='font-mono text-xs tracking-widest text-fg-muted'>KAZA.OOO</span>
            <p className='font-mono text-xs text-fg-subtle'>All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer
