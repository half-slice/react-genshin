import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref , uploadString } from "firebase/storage";
import { v4,uuidv4 } from "uuid";

const WritePage = ({ userObj }) => {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [attachment,setAttachment] = useState(""); 
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
        let attachmentUrl = "";
        
        if(attachment !== ""){
            const fileRef = ref(storageService,`${userObj.uid}/${v4()}`);
            const response = await uploadString(fileRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
       
        const post = {
            title : title,
            content : content,
            createdAt : Date.now(),
            creatorId : userObj.uid,
            attachmentUrl,
        };
        try{
            await addDoc(collection(dbService , "post"),post);
        }
        catch(error){
            console.error(error);
        }
        setTitle("");
        setContent("");
        navigate("/");
    }

    const onFileChange = (event) => {
        const {
            target : {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { 
                currentTarget : {result}
            } = finishedEvent
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }

    const onClearPhotoClick = () => {
        setAttachment(null);
    }

    return(
        <div>
            Write page
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
                <input type="file" accpet = "image/*" onChange={onFileChange}/>
                <br/>
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <br/>
                        <button onClick={onClearPhotoClick}>Clear</button>
                    </div>
                )}
                <br/> 
                <input type="submit" value="post" />   
            </form>
        </div>
    )
}

export default WritePage;