'use client'
import React, { FormEvent } from 'react'
import GithubIcon from '../../../public/github-icon.svg'
import LinkedinIcon from '../../../public/linkedin-icon.svg'
import XIcon from '../../../public/x-icon.svg'
import InstagramIcon from '../../../public/instagram-icon.svg'
import Link from 'next/link'
import Image from 'next/image'

const EmailSection: React.FC = () => {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
        // console.log(data); // これ上手くいってる
        const JSONdata = JSON.stringify(data);
        // console.log(JSONdata); // okay
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

        const response = await fetch(endpoint, options);
        // console.log(response); // okay
        if (!response.ok) {
            const text = await response.text();
            console.log(`HTTP error! status: ${response.status}, body: ${text}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // const text = await response.text();
        // console.log(text);

        const resData = await response.json();
        console.log(resData);
        if (resData.status === 200) {
            console.log('Message sent.');
        }
    }

    return (
        <section className='grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative'>
            <div className='bg-[radical-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2'></div>
            <div className='z-10'>
                <h5 className='text-xl font-bold text-white my-2'>Let's Connect</h5>
                <p className='text-[#ADB7BE] mb-4 max-w-md'>
                    {" "}
                    I'm currently looking for new opportunities, my inbox is always openß.
                    Whether you have a question or just want to say hi, I'll try my best to get back to you!
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
            {/* <div>
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
                            placeholder='jacob@google.com' 
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
                    >
                        Send Message
                    </button>
                </form>
            </div> */}
        </section>
    )
}

export default EmailSection