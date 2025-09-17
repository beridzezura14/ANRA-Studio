import { useState } from 'react';
import './header.scss'
import { Link } from 'react-router-dom';



function Header() {
    const [active, setActive] = useState(false);
    return (
        <div className='main-header'>
            <div className="header">
                <div className="logo text-transparent bg-clip-text bg-gradient-to-r from-[#2B384C] to-[#643434]">
                    ANRA Studio
                </div>

                <div className={`navbar ${active ? 'active' : ''}`}>
                    <ul>
                        <Link to="/"><li>მთავარი</li></Link>
                        <Link><li>კურსები</li></Link>
                        <Link><li>მზა კოდები</li></Link>
                        <Link to="./admin"> <li>Admin Hero</li> </Link>
                        
                        
                        <li className='menu__contact' >დაგვიკავშირდით</li>
                    </ul>
                </div>

                <div className="burger" onClick={() => setActive(!active)}>
                    <div className={`line line-1 ${active ? 'active' : ''}`}></div>
                    <div className={`line line-2 ${active ? 'active' : ''}`}></div>
                    <div className={`line line-3 ${active ? 'active' : ''}`}></div>
                </div>

                <button className='pc z-[9999] hover:opacity-90 transition-all duration-300'>დაგვიკავშირდით</button>
            </div>
        </div>
    )
}


export default Header