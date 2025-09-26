import { useState } from 'react';
import './header.scss'
import { Link } from 'react-router-dom';



function Header() {
    const [active, setActive] = useState(false);

    const handleLinkClick = () => {
        setActive(false); // მენიუს დახურვა
    }
    
    return (
        <div className='main-header'>
            <div className="header">
                <Link to="/" onClick={handleLinkClick}>
                    <div className="logo text-transparent bg-clip-text">
                        ANRA Studio
                    </div>
                </Link>

                <div className={`navbar ${active ? 'active' : ''}`}>
                    <ul>
                        <Link to="/" onClick={handleLinkClick}><li>მთავარი</li></Link>
                        <Link to="/coursepage" onClick={handleLinkClick}><li >კურსები</li></Link>
                        {/* <Link to="/" onClick={handleLinkClick}><li>მზა კოდები</li></Link> */}
                        <Link to="./admin" onClick={handleLinkClick}> <li>Admin</li> </Link>
                        
                        {/* <Link><li className='menu__contact' >დაგვიკავშირდით</li> </Link> */}
                        
                    </ul>
                </div>

                <div className="burger" onClick={() => setActive(!active)}>
                    <div className={`line line-1 ${active ? 'active' : ''}`}></div>
                    <div className={`line line-2 ${active ? 'active' : ''}`}></div>
                    <div className={`line line-3 ${active ? 'active' : ''}`}></div>
                </div>

                {/* <button className='pc z-[9999] hover:opacity-90 transition-all duration-300'>დაგვიკავშირდით</button> */}
            </div>
        </div>
    )
}


export default Header