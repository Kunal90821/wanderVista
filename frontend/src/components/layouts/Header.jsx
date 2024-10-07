import { RiMenu2Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import Logo from './Logo';
import { useEffect, useState } from "react";
import Search from './Search';
import DropdownProfile from "../user/DropdownProfile";
import { useSelector } from 'react-redux';
import '../../styles/Animation.css'


const Header = () => {
    const [isSideMenuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(false);
    const [isOpenProfile, setOpenProfile] = useState(false);

    const user = useSelector(state => state.auth.user);

    useEffect(()=> {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if(scrollPosition > 30) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll',handleScroll);

        return () => {
            window.removeEventListener('scroll',handleScroll);
        };
    },[]);

    const navLinks = [
        {
            to: '/',
            label: 'Home'
        },
        {
            to: '/about',
            label: 'About'
        },
        {
            to: '/contact',
            label: 'Contact'
        },
    ];

    return (
        <header>
            <nav className={`flex animate-fade-in-down justify-between px-8 z-[1001] items-center py-6 h-16 transition-all duration-500 ${isScrolled && 'fixed left-[3%] w-[95%] rounded-full top-2 shadow-md lg:px-32 backdrop-filter backdrop-blur-lg bg-opacity-30'} ${isSideMenuOpen && 'bg-black/50 h-screen rounded-none backdrop-blur-sm'}`}>
                <div className="flex items-center gap-8">
                    <section className="flex items-center gap-4">
                        {/* Menu */}
                        <RiMenu2Line
                            onClick={ () => setMenuOpen(true) }
                            className="text-2xl cursor-pointer lg:hidden hover:text-teal-700 transition-all duration-300" />
                        {/* Logo */}
                        <NavLink to="/">
                            <Logo />
                        </NavLink>
                    </section>
                </div>
                {/* sidebar mobile menu */}
                <div className={`fixed h-screen w-full lg:hidden top-0 right-0 -translate-x-full transition-all duration-500 ${isSideMenuOpen && 'translate-x-0'}`}>
                    <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 flex w-56">
                        <IoClose
                            onClick={ () => setMenuOpen(false) }
                            className="mt-0 mb-8 text-3xl cursor-pointer hover:text-teal-700 transition-all duration-300"/>
                        { navLinks.map((link,index) => 
                            ( 
                                <NavLink key={index} className='font-bold transition-all duration-300 hover:text-teal-500' to={link.to}>{link.label}</NavLink>
                            )
                        )}
                    </section>
                </div>
                <section className="flex items-center gap-8">
                    {/* Search Bar */}
                    <div className={`${isSideMenuOpen && 'hidden'}`}>
                        <Search />
                    </div>
                    {/* Nav Links */}
                    { navLinks.map((link,index) => 
                        ( 
                            <NavLink key={index} className='hidden lg:block transition-all duration-300 font-semibold hover:text-teal-500' to={link.to}>{link.label}</NavLink>
                        )
                    )}
                    {/* Avatar */}
                    {user?.user? (
                        <div className={`${isSideMenuOpen && 'hidden'}`} onClick={ () => setOpenProfile(!isOpenProfile)}>
                            <Avatar alt={user.user.username} src={user.user.avatar?.url || ''} >
                                {!user.user?.avatar?.url && user.user.username.charAt(0).toUpperCase()}
                            </Avatar>
                            {/* Open Profile Dropdown */}
                            { isOpenProfile && <DropdownProfile isScrolled = { isScrolled }/>}
                        </div>
                        ): ( 
                        <NavLink to={"/login"}><div className="transition-all duration-300 font-semibold hover:text-teal-500">Hello, <span>Sign In</span></div></NavLink> 
                    )}
                </section>
            </nav>
        </header>
    )
}

export default Header;