'use client'
import React, { FormEvent, useState } from 'react'
import GithubIcon from '../../../public/github-icon.svg'
import LinkedinIcon from '../../../public/linkedin-icon.svg'
import XIcon from '../../../public/x-icon.svg'
import InstagramIcon from '../../../public/instagram-icon.svg'
import Link from 'next/link'
import Image from 'next/image'

const EmailSection: React.FC = () => {
    // State to manage button text
    const [buttonText, setButtonText] = useState('Send Message');
    // State that controls whether or not the transmission process is in progress.
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Start transmission process
        setIsSending(true);

        const target = e.target as typeof e.target & {
            email: { value: string };
            subject: { value: string };
            message: { value: string };
        };

        const data = {
            email: target.email.value,
            subject: target.subject.value,
            message: target.message.value,
        }
        const JSONdata = JSON.stringify(data);
        const endpoint = '/api/send';

        // サーバーにデータを送信するためのリクエストを作成
        const options = {
            // データを送信するためPOSTメソッドを定義
            method: 'POST',
            // サーバーにJSONを送信することを伝える
            headers: {
                'Content-Type': 'application/json',
            },
            // リクエストbodyは上記のJSONデータです。
            body: JSONdata,
        }

        try {
            const response = await fetch(endpoint, options);
            if (!response.ok) {
                const text = await response.text();
                // console.log(`HTTP error! status: ${response.status}, body: ${text}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Processing when mail is successfully sent
            // console.log('Message sent.');
            // Update button text
            setButtonText('Email sent!');
        } catch (error) {
            // console.error(error);
            // Error handling (e.g., notifying users if necessary)
        } finally {
            // End of transmission process
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
                    <Link href='https://github.com/Koki-Kazaore/'>
                        <Image src={GithubIcon} alt='Github Icon' width={48} height={48} />
                    </Link>
                    <Link href='https://www.linkedin.com/in/kazaooo/'>
                        <Image src={LinkedinIcon} alt='Linkedin Icon' width={48} height={48} />
                    </Link>
                    <Link href='https://www.instagram.com/zaka_zaka__oo/?hl=ja'>
                        <Image src={InstagramIcon} alt='Instagram Icon' width={48} height={48} />
                    </Link>
                    <Link href='https://twitter.com/kazaore2/'>
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