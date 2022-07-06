import React from "react";
import { HashRouter as Router ,Route, Routes } from "react-router-dom"
import Home from "route/Home";
import Auth from "route/Auth";
import Calculate from "route/Calculate";
import Navigation from "component/Navigation";
import Profile from "route/Profile";
import WritePage from "route/WritePage";
import EditPage from "route/EditPage";

const AppRouter = ({ refreshUser,isLoggedIn,userObj }) => {

    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/" element={<Home userObj={userObj}/>} />
                        <Route path="/calculate" element={<Calculate />} />
                        <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>} />
                        <Route path="/writepage" element={<WritePage userObj={userObj} />} />
                        <Route path="/editpage/id=:id" element={<EditPage />} />
                    </>
                ) : (
                    <>
                        <Route exact path="/" element={<Auth />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default AppRouter;