import { dbService } from "fbase";
import React,{useEffect, useState} from "react";
import { query, collection, onSnapshot, getDocs, addDoc, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Post from "component/Post";

const Home = ({ userObj }) => {
    const navigate = useNavigate();
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        const q = query(collection(dbService,"post"),orderBy("createdAt","desc"));
        onSnapshot(q,(snapshot)=>{
            const postArr = snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }));
            setPosts(postArr);
        })
    },[])

    const onClick = () => {
        navigate("/writepage");
    }

    return (
        <div>
            <span onClick={onClick}>Write</span>
            <div>
                {posts.map((post) => (
                    <Post 
                        key={post.id} 
                        userObj={post} 
                        isOwner = {post.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;