'use client'
import React, { FormEvent, useState } from 'react'
import GithubIcon from '../../../public/github-icon.svg'
import LinkedinIcon from '../../../public/linkedin-icon.svg'
import XIcon from '../../../public/x-icon.svg'
import InstagramIcon from '../../../public/instagram-icon.svg'
import Link from 'next/link'
import Image from 'next/image'
import { sendContactMessage, type ContactMessage } from '@/lib/contact'

const EmailSection: React.FC = () => {
    // State to manage button text
    const [buttonText, setButtonText] = useState('Send Message');
    // State that controls whether or not the transmission process is in progress.
    const [isSending, setIsSending] = useState(false);

    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSending(true);

        const contactMessage: ContactMessage = { email, subject, message };

        try {
            const result = await sendContactMessage(contactMessage);

            if (result.success) {
                setButtonText('Email sent!');
                setEmail('');
                setSubject('');
                setMessage('');
            }
            // On failure: keep current visible behavior (no notification yet).
            // result.error is available for issue #76 to build on.
        } finally {
            setIsSending(false);
        }
    }

    return (
        <section id='contact' className='grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative'>
            <div>
                <h5 className='text-xl font-bold text-white my-2'>Let&apos;s Connect</h5>
                <p className='text-[#ADB7BE] mb-4 max-w-md'>
                    {" "}
                    I&apos;m currently looking for new opportunities, my inbox is always open.
                    Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                </p>
                <div className='socials flex flex-row gap-2'>
                    <Link href='https://github.com/Koki-Kazaore'>
                        <Image src={GithubIcon} alt='Github Icon' width={48} height={48} />
                    </Link>
                    <Link href='https://www.linkedin.com/in/kazaooo'>
                        <Image src={LinkedinIcon} alt='Linkedin Icon' width={48} height={48} />
                    </Link>
                    <Link href='https://www.instagram.com/kaza.ooo'>
                        <Image src={InstagramIcon} alt='Instagram Icon' width={48} height={48} />
                    </Link>
                    <Link href='https://x.com/kaza_ooo'>
                        <Image src={XIcon} alt='X Icon' width={40} height={40} />
                    </Link>
                </div>
            </div>
            <div>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <div className='mb-6'>
                        <label 
                            htmlFor='email' 
                            className='text-white block mb-2 text-sm font-medium'
                        >
                            Your email
                        </label>
                        <input 
                            name='email'
                            type='email' 
                            id='email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            className='bg-[#18191E] border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
                            placeholder='hoge@example.com' 
                        />
                    </div>

                    <div className='mb-6'>
                        <label 
                            htmlFor='subject' 
                            className='text-white block mb-2 text-sm font-medium'
                        >
                            Subject
                        </label>
                        <input 
                            name='subject'
                            type='text' 
                            id='subject' 
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required 
                            className='bg-[#18191E] border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
                            placeholder='Just saying hi' 
                        />
                    </div>

                    <div className='mb-6'>
                        <label 
                            htmlFor='message' 
                            className='text-white block mb-2 text-sm font-medium'
                        >
                            Message
                        </label>
                        <textarea 
                            name='message'
                            id='message' 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='bg-[#18191E] border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
                            placeholder="Let's talk about..." 
                        />
                    </div>

                    <button
                        type='submit'
                        className='bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full'
                        disabled={isSending} // Disable button during transmission
                    >
                        {buttonText}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default EmailSection