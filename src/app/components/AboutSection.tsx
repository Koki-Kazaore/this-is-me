'use client'
import React, { useTransition, useState, ReactNode} from 'react'
import Image from 'next/image'
import TabButton from './TabButton'
import {motion} from 'framer-motion'

interface TabDataItem {
    title: string;
    id: string;
    content: ReactNode;
}

const TAB_DATA: TabDataItem[] = [
    {
        title: 'Skills',
        id: 'skills',
        content: (
            <ul className='list-disc pl-2'>
                <li className='pb-2'>Programing Language<br />
                    C / C++ / Python / PHP / JavaScript
                </li>
                <li className='pb-2'>Framework / Library<br />
                    Flask / Laravel / Numpy / Next.js
                </li>
                <li className='pb-2'>Database<br />
                    MySQL / SQLite
                </li>
                <li className='pb-2'>Tools<br />
                    Git / Docker / Azure
                </li>
            </ul>
        )
    },
    {
        title: 'Education',
        id: 'education',
        content: (
            <ul className='list-disc pl-2'>
                <li className='pb-2'>Fukui University<br />
                    Master of Engineering
                </li>
            </ul>
        )
    },
    {
        title: 'Certifications',
        id: 'certifications',
        content: (
            <ul className='list-disc pl-2'>
                <li>AZ-900 : Azure Fandamentals</li>
            </ul>
        )
    },
]

const AboutSection: React.FC = () => {
    const [tab, setTab] = useState<string>('skills');
    const [isPending, startTransition] = useTransition();

    const handleTabChange = (id: string) => {
        startTransition(() => {
            setTab(id);
        });
    }
    return (
        <section className='text-white'>
            <motion.div 
                initial={{ opacity: 0, scale: 0 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5 }}  
                className='md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'
            >
                <Image 
                    src='/images/about-image.png'
                    alt='About me section image'
                    width={500} 
                    height={500}
                    className='rounded-t-xl'
                />
                <div className='mt-4 md:mt-0 text-left flex flex-col h-full'>
                    <h2 className='text-4xl font-bold text-white mb-4'>About Me</h2>
                    <p className='text-base lg:text-lg'>
                        Hi, I'm Koki Kazaore. I'm originally from Shiga and I live in Fukui, Japan. I'm styding IoT and network sercurity related to IoT at the Graduate School of Engineering , Fukui University.<br />
                        Additionary, I'm working as an intern web application engineer at a SaaS company in Osaka.<br />
                        <br />
                        My hobbies include working out and watching sports. I like various kinds of sports, but I'm especially fond of soccer, baseball, and American football.<br />
                        <br />
                        I spend my days feeling grateful for the opportunity to study what I love all day long.
                    </p>
                    <div className='flex flex-row justify-start mt-8'>
                        <TabButton 
                            selectTab={() => handleTabChange('skills')} 
                            active={tab === 'skills'}
                        >
                            {" "}
                            Skills{" "}
                        </TabButton>
                        <TabButton 
                            selectTab={() => handleTabChange('education')} 
                            active={tab === 'education'}
                        >
                            {" "}
                            Education{" "}
                        </TabButton>
                        <TabButton 
                            selectTab={() => handleTabChange('certifications')} 
                            active={tab === 'certifications'}
                        >
                            {" "}
                            Certifications{" "}
                        </TabButton>
                    </div>
                    <div className='mt-8'>
                        {TAB_DATA.find((t) => t.id === tab)?.content}
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default AboutSection