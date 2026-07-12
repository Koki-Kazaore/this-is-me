'use client'
import React, { useTransition, useState, ReactNode } from 'react'
import Image from 'next/image'
import TabButton from './TabButton'

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
            <ul className='space-y-4 text-sm'>
                <li>
                    <span className='text-fg'>Programming Language</span><br />
                    <span className='text-fg-muted'>C / C++ / Python / PHP / JavaScript</span>
                </li>
                <li>
                    <span className='text-fg'>Framework / Library</span><br />
                    <span className='text-fg-muted'>Flask / Laravel / Numpy / Next.js</span>
                </li>
                <li>
                    <span className='text-fg'>Database</span><br />
                    <span className='text-fg-muted'>MySQL / SQLite</span>
                </li>
                <li>
                    <span className='text-fg'>Tools</span><br />
                    <span className='text-fg-muted'>Git / Docker / Azure</span>
                </li>
            </ul>
        )
    },
    {
        title: 'Education',
        id: 'education',
        content: (
            <ul className='space-y-4 text-sm'>
                <li>
                    <span className='text-fg'>Fukui University</span><br />
                    <span className='text-fg-muted'>Master of Engineering</span>
                </li>
            </ul>
        )
    },
    {
        title: 'Certifications',
        id: 'certifications',
        content: (
            <ul className='space-y-4 text-sm'>
                <li>
                    <span className='text-fg-muted'>AZ-900 : Azure Fandamentals</span>
                </li>
            </ul>
        )
    },
]

const AboutSection: React.FC = () => {
    const [tab, setTab] = useState<string>('skills');
    const [, startTransition] = useTransition();

    const handleTabChange = (id: string) => {
        startTransition(() => {
            setTab(id);
        });
    }

    return (
        <section id='about' className='border-t border-hairline py-16 sm:py-20'>
            <h2 className='font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle'>About</h2>
            <div className='mt-10 gap-12 md:grid md:grid-cols-5'>
                <Image
                    src='/images/about-image.png'
                    alt='About me section image'
                    width={500}
                    height={500}
                    className='hidden self-start rounded-lg md:col-span-2 md:block'
                />
                <div className='md:col-span-3'>
                    <p className='text-base leading-relaxed text-fg-muted'>
                        Hi, I&apos;m Koki Kazaore. I&apos;m originally from Shiga and I live in Fukui, Japan. I&apos;m styding IoT and network sercurity related to IoT at the Graduate School of Engineering , Fukui University.<br />
                        Additionary, I&apos;m working as an intern web application engineer at a SaaS company in Osaka.<br />
                        <br />
                        My hobbies include working out and watching sports. I like various kinds of sports, but I&apos;m especially fond of soccer, baseball, and American football.<br />
                        <br />
                        I spend my days feeling grateful for the opportunity to study what I love all day long.
                    </p>
                    <div className='mt-10 flex flex-row gap-6'>
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
                    <div className='mt-8 min-h-40'>
                        {TAB_DATA.find((t) => t.id === tab)?.content}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
