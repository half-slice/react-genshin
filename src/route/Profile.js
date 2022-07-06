import React, { useEffect,useState } from "react";
import { authService,dbService } from "fbase";
import { Navigate, useNavigate } from "react-router-dom";
import { 
    collection, 
    getDocs, 
    query, 
    where, 
    orderBy } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({ refreshUser, userObj }) => {
    const navigate = useNavigate();
    const [newDisplayName,setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {    
        authService.signOut();
        navigate('/');
    }

    const getMyPost = async() => {
        const q = query(collection(dbService,"post"),where("creatorId","==",userObj.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            //console.log(doc.id, "=>" , doc.data());
        });
    };

    useEffect(()=>{
        getMyPost();
    },[]);

    const onChange = (event) => {
        const { target : { value } } = event;
        setNewDisplayName(value);
    } 
    //밑에 authService.currentUser를 useObj로 하면 에러뜸
    const onSubmit = async(event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(authService.currentUser, {
                displayName : newDisplayName,
            })
        }
        refreshUser();
    }

    return (
        <div>
            <>
                <h3>Profile</h3>
                <form onSubmit={onSubmit}>
                    <input 
                        type="text" 
                        placeholder="Display name"
                        onChange={onChange}
                        value={newDisplayName}
                    />
                    <input 
                        type="submit" 
                        value="update Profile" 
                    />
                </form>
                <button onClick={onLogOutClick}>Log out</button>
            </>
        </div>
    )
}

export default Profile;