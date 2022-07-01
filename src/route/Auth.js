import React,{ useState } from "react";
import { authService, firebaseInstance } from "../fbase"
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup, } from "firebase/auth";

const Auth = () => {

    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(false);

    const onChange = (event) => {
        const {
            target : {name,value}
        } = event;
        if(name=="email"){
            setEmail(value);
        }
        else if(name=="password"){
            setPassword(value);
        }
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
            const auth = getAuth();
            if(newAccount){
                //새로운 유저 생성
                data = await createUserWithEmailAndPassword(
                    auth, email, password
                );
            }
            else{
                //기존 유저
                data = await signInWithEmailAndPassword(
                    auth, email, password
                );
            }
            console.log(data);
        }
        catch(error){
             console.log(error);
        }
    }

    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    }

    const onSocialClick = async(event) => {
         const {
            target : {name},
        } = event;
        let provider;
        try{
            if(name=="google"){
                provider = new GoogleAuthProvider();
            }
            else if(name=="github"){
                provider = new GithubAuthProvider();
            }
        }
        catch(error){
            console.log(error);
        }
        await signInWithPopup(authService, provider);
    }

    return (
        <div>
            <form onSubmit={onSubmit}> 
                <input 
                    name="email" 
                    type="email" 
                    placeholder = "email" 
                    required 
                    value={email} 
                    onChange={onChange} 
                />
                <input 
                    name="password" 
                    type ="password" 
                    placeholder="password" 
                    required 
                    value = {password} 
                    onChange= {onChange} 
                />
                <input 
                    type="submit" 
                    value={newAccount ? "Create Account" :  "Log In"} 
                />
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Log in" : "Create Account"}
            </span>
            <div>
                <button 
                    onClick={onSocialClick} 
                    name="google"
                >Continue with Google</button>
                <button 
                    onClick={onSocialClick}
                    name="github"
                >Continue with Github</button>
            </div>
        </div>
    )
} 

export default Auth;