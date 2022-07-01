import React, { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const WritePage = ({ userObj }) => {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const navigate = useNavigate();

    const onChange = (event) => {
        const { 
            target : {value,name}
        } = event;
        if(name=="title"){
            setTitle(value);
        }
        else{
            setContent(value);
        }
        
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            const docRef = await addDoc(collection(dbService , "post"),{
                title : title,
                content : content,
                createdAt : Date.now(),
                creatorId : userObj.uid,
            });
        }
        catch(error){
            console.error(error);
        }
        setTitle("");
        setContent("");
        navigate("/");
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="title"
                    type="text" 
                    placeholder="title" 
                    maxLength={120}
                    onChange={onChange}
                    value={title}
                />
                <hr/>
                <textarea 
                    style={{width:500,height:200}}
                    placeholder="contents"
                    name="content"    
                    onChange={onChange}
                    value={content}
                />
                <br/>
                <input type="submit" value="post" />    
            </form>
        </div>
    )
}

export default WritePage;