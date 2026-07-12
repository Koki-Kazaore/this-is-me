'use client'
import React, { FormEvent, useState } from 'react'
import GithubIcon from '../../../public/github-icon.svg'
import LinkedinIcon from '../../../public/linkedin-icon.svg'
import XIcon from '../../../public/x-icon.svg'
import InstagramIcon from '../../../public/instagram-icon.svg'
import Link from 'next/link'
import Image from 'next/image'
import { sendContactMessage, type ContactMessage } from '@/lib/contact'

const INPUT_CLASSES = 'w-full bg-transparent border-0 border-b border-hairline py-2 text-sm text-fg placeholder:text-fg-subtle focus:border-fg focus:outline-none transition-colors'

const LABEL_CLASSES = 'mb-2 block font-mono text-xs uppercase tracking-widest text-fg-subtle'

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
        <section id='contact' className='border-t border-hairline py-16 sm:py-20'>
            <h2 className='font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle'>Contact</h2>
            <div className='mt-10 gap-12 md:grid md:grid-cols-2'>
                <div>
                    <h5 className='text-lg font-medium text-fg'>Let&apos;s Connect</h5>
                    <p className='mt-3 max-w-md text-sm leading-relaxed text-fg-muted'>
                        {" "}
                        I&apos;m currently looking for new opportunities, my inbox is always open.
                        Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                    </p>
                    <div className='socials mt-8 flex flex-row items-center gap-4'>
                        <Link href='https://github.com/Koki-Kazaore' className='opacity-60 transition-opacity hover:opacity-100'>
                            <Image src={GithubIcon} alt='Github Icon' width={32} height={32} />
                        </Link>
                        <Link href='https://www.linkedin.com/in/kazaooo' className='opacity-60 transition-opacity hover:opacity-100'>
                            <Image src={LinkedinIcon} alt='Linkedin Icon' width={32} height={32} />
                        </Link>
                        <Link href='https://www.instagram.com/kaza.ooo' className='opacity-60 transition-opacity hover:opacity-100'>
                            <Image src={InstagramIcon} alt='Instagram Icon' width={32} height={32} />
                        </Link>
                        <Link href='https://x.com/kaza_ooo' className='opacity-60 transition-opacity hover:opacity-100'>
                            <Image src={XIcon} alt='X Icon' width={28} height={28} />
                        </Link>
                    </div>
                </div>
                <div className='mt-12 md:mt-0'>
                    <form className='flex flex-col' onSubmit={handleSubmit}>
                        <div className='mb-8'>
                            <label htmlFor='email' className={LABEL_CLASSES}>
                                Your email
                            </label>
                            <input
                                name='email'
                                type='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={INPUT_CLASSES}
                                placeholder='hoge@example.com'
                            />
                        </div>

                        <div className='mb-8'>
                            <label htmlFor='subject' className={LABEL_CLASSES}>
                                Subject
                            </label>
                            <input
                                name='subject'
                                type='text'
                                id='subject'
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                                className={INPUT_CLASSES}
                                placeholder='Just saying hi'
                            />
                        </div>

                        <div className='mb-8'>
                            <label htmlFor='message' className={LABEL_CLASSES}>
                                Message
                            </label>
                            <textarea
                                name='message'
                                id='message'
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className={INPUT_CLASSES}
                                placeholder="Let's talk about..."
                            />
                        </div>

                        <button
                            type='submit'
                            className='w-fit border border-hairline px-6 py-2.5 text-sm text-fg transition-colors hover:border-fg disabled:opacity-50'
                            disabled={isSending} // Disable button during transmission
                        >
                            {buttonText}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default EmailSection
