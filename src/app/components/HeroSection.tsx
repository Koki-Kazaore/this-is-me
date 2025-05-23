'use client'
import React from 'react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'
import {motion} from 'framer-motion'

const HeroSection = () => {
  return (
    <section className='lg:py-16'>
        <div className='grid grid-cols-1 sm:grid-cols-12'>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='col-span-8 place-self-center text-center sm:text-left justify-self-start relative z-10'
            >
                <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-snug font-extrabold'>
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600'>
                        Hello, I&apos;m{" "}
                    </span>
                    <br />
                    <div className='h-20 sm:h-28 md:h-32 lg:h-64 overflow-hidden'>
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'Koki',
                                1000,
                                'BE Engineer @Tokyo, JP',
                                1000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </div>
                </h1>
                <p className='text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl text-left'>
                    I am studying the development of IoT prototypes and network security in university.<br />
                    Additionally, I am working on web application development as an intern web application engineer.
                </p>
                <div>
                    <button
                        className='px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-primary-500 to-secondary-500 hover:bg-slate-200 text-white'
                        onClick={() => document.getElementById('letsConnect')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Contact Me
                    </button>
                    <button className='px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-blue-500 via-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3'>
                        <span className='block bg-[#121212] hover:gb-slate-800 rounded-full px-5 py-2'>Download CV</span>
                    </button>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='col-span-4 place-self-center mt-4 lg:mt-0 relative z-0'
            >
                <div className='rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative'>
                    <Image
                        src='/images/hero-image.png'
                        alt='風折晃輝'
                        width={300}
                        height={300}
                        priority
                        className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                    />
                </div>
            </motion.div>
        </div>
    </section>
  )
}

export default HeroSection
