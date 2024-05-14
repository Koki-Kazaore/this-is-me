import { FC } from 'react';
import Navbar from './../components/Navbar'
import Footer from './../components/Footer'
import NotFoundImage from './../components/NotFoundImage';

const Blog: FC = () => {
  return (
    <main className='flex flex-col min-h-screen bg-[rgb(18,18,18)]'>
        <Navbar />
        <div className='flex-grow sm:container mt-24 mx-auto px-12 py-4'>
            <NotFoundImage />
        </div>
        <Footer />
    </main>
  );
};

export default Blog;
