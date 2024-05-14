import { FC } from 'react';
import Image from 'next/image'

const NotFoundImage: FC = () => {
  return (
    <Image 
      src="/images/404.png" 
      alt="404 Not Found" 
      width={500} 
      height={500}
      className="mx-auto" />
  );
};

export default NotFoundImage;