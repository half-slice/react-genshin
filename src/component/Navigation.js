import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {

    return (    
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/calculate">Calculate</Link>
                </li>
                <li>
                    <Link to="/profile">{userObj.displayName}'s Profile</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;