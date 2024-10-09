import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const popupRef = useRef(null);
    const backdropRef = useRef(null);

    const handleLoginClick = () => {
        popupRef.current.classList.add('show');
        backdropRef.current.classList.add('show');
    };

    const handleCloseClick = () => {
        popupRef.current.classList.remove('show');
        backdropRef.current.classList.remove('show');
    };

    return (
        <div>
            <header>
                <nav>
                    <div className="logo">My logo</div>
                    <div className="menu">
                        <ul>
                            <li>
                                <button onClick={handleLoginClick}>Login</button>
                                <a href="#con" id='contect'>
                                    <button>Contact us</button>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <div ref={backdropRef} className="backdrop" onClick={handleCloseClick}></div>

            <div ref={popupRef} className="box-popup">

                <form>
                    <h2>Login</h2>
                    <div className="form-group">
                        <input type="text" id="username" placeholder="" />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" placeholder="" />
                        <label htmlFor="password">Password</label>
                    </div>
                
                    <input type="submit" value="Submit"/>
                </form>
                <button onClick={handleCloseClick} className="close-button">X</button>
            </div>
        </div>
    );
}

export default Navbar;
