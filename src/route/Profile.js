import React from "react";
import { authService } from "fbase";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    }

    return (
        <div>
            <>
                <h3>Profile</h3>
                <button onClick={onLogOutClick}>Log out</button>
            </>
        </div>
    )
}

export default Profile;