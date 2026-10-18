'use client'
import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className='pb-20 pt-16 sm:pb-28 sm:pt-24'>
        <Image
            src='/images/hero-image.png'
            alt='風折晃輝'
            width={72}
            height={72}
            priority
            className='mb-8 rounded-full'
        />
        <h1 className='text-4xl font-semibold tracking-tight text-fg sm:text-5xl'>
            Koki Kazaore
        </h1>
        <p className='mt-3 font-mono text-sm text-fg-subtle'>
            Software Engineer — Tokyo, JP
        </p>
        <p className='mt-8 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg'>
            I&apos;m a backend-focused full-stack engineer at a logistics SaaS company.
            I build primarily with Ruby on Rails, and work across the frontend and infrastructure as well.
        </p>
        <div className='mt-10 flex items-center gap-8'>
            <button
                className='text-sm text-fg underline decoration-fg-subtle underline-offset-4 transition-colors hover:decoration-fg'
                onClick={() => document.getElementById('letsConnect')?.scrollIntoView({ behavior: 'smooth' })}
            >
                Contact me
            </button>
            <button className='text-sm text-fg-muted underline decoration-fg-subtle underline-offset-4 transition-colors hover:text-fg hover:decoration-fg'>
                Download CV
            </button>
        </div>
    </section>
  )
}

export default HeroSection
