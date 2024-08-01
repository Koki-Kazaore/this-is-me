import Link from 'next/link';

// NavLinkのプロパティの型定義
interface NavLinkProps {
    href: string;
    title: string;
}

// FC（Function Component）を使用して、コンポーネントの型を定義
const NavLink: React.FC<NavLinkProps> = ({ href, title }) => {
    return (
        <Link 
            href={href} 
            className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'
            prefetch={false}
        >
            {title}
        </Link>
    );
};

export default NavLink;
