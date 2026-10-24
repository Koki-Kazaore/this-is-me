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
                    <span className='text-fg-muted'>Ruby / TypeScript / JavaScript</span>
                </li>
                <li>
                    <span className='text-fg'>Framework / Library</span><br />
                    <span className='text-fg-muted'>Ruby on Rails / React / Next.js / Sidekiq</span>
                </li>
                <li>
                    <span className='text-fg'>Database</span><br />
                    <span className='text-fg-muted'>MySQL / PostgreSQL</span>
                </li>
                <li>
                    <span className='text-fg'>Testing</span><br />
                    <span className='text-fg-muted'>RSpec / Vitest / Playwright</span>
                </li>
                <li>
                    <span className='text-fg'>Tools</span><br />
                    <span className='text-fg-muted'>Git / Docker / AWS / GitHub Actions</span>
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
                    <span className='text-fg-muted'>AZ-900 : Azure Fundamentals</span>
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
                        Hi, I&apos;m Koki Kazaore. I&apos;m originally from Shiga and now live in Tokyo, Japan.<br />
                        I work as a software engineer at a logistics SaaS company. My core is backend development with Ruby on Rails, but I work across the full stack, from React on the frontend to the AWS infrastructure behind it.<br />
                        Before that, I studied IoT and network security at the Graduate School of Engineering, Fukui University.<br />
                        <br />
                        My hobbies include working out and watching sports. I like various kinds of sports, but I&apos;m especially fond of soccer, baseball, and American football.<br />
                        <br />
                        I&apos;m grateful to spend my days building things I care about.
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
                    <div className='mt-8 grid'>
                        {TAB_DATA.map((t) => (
                            <div
                                key={t.id}
                                className={`[grid-area:1/1] ${t.id === tab ? '' : 'invisible'}`}
                                aria-hidden={t.id !== tab}
                            >
                                {t.content}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
