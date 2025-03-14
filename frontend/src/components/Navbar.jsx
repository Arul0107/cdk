import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';
import logo from '../assets/images/logo.png';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleMenuToggle = () => {
        setIsMobile(!isMobile);
    };

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="home" smooth={true} duration={500}>
                        <img src={logo} alt="logo" className="navbar-logo-img" />
                    </Link>
                </div>

                <nav className={`navbar-menu ${isMobile ? 'show' : ''}`}>
                    <ul className="navbar-menu-items">
                        {['home','about','predict', 'contact'].map((item) => (
                            <li key={item}>
                                <Link 
                                    to={item}
                                    smooth={true}
                                    duration={500}
                                    offset={-70}
                                    className="navbar-link"
                                    onClick={() => setIsMobile(false)}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                    <span className="hover-underline"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

              

                <div 
                    className={`navbar-mobile-menu-trigger ${isMobile ? 'active' : ''}`} 
                    onClick={handleMenuToggle}
                    aria-label="Mobile menu"
                >
                    <span className="navbar-burger-icon"></span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;