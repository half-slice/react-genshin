import React, {Component, useState } from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom"
import Home from "route/Home";
import Auth from "route/Auth";
import Calculate from "route/Calculate";
import Navigation from "component/Navigation";
import Profile from "route/Profile";
import WritePage from "route/WritePage";
import EditPage from "route/EditPage";

const AppRouter = ({ isLoggedIn,userObj }) => {

    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/" element={<Home userObj={userObj}/>} />
                        <Route path="/calculate" element={<Calculate />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/writepage" element={<WritePage userObj={userObj} />} />
                        <Route path="/editpage" element={<EditPage userObj={userObj} />} />
                    </>
                ) : (
                    <>
                        <Route exact path="/" element={<Auth />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;