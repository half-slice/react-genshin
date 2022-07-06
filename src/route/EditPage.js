import { dbService } from "fbase";
import { updateDoc,doc } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [newTitle,setNewTitle] = useState(state.title);
    const [newContent,setNewContent] = useState(state.content);
    const [newAttachMent,setNewAttachMent] = useState(state.attachmentUrl); 
    
    const onChange = (event) => {
        const {
            target : {value,name}
        } = event;
        if(name=="title"){
            setNewTitle(value);
        }
        else{
            setNewContent(value);
        }
    }

    const onFileChange = (event) => {
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        await updateDoc(doc(dbService,"post",`${state.id}`),{
            title : newTitle,
            content : newContent,
        });
        navigate("/");
    }

    return(
        <div>
            Edit page
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    name="title"
                    value={newTitle}
                    onChange={onChange}
                />
                <hr/>
                <textarea 
                    name="content"
                    style={{width:500,height:200}}
                    value={newContent} 
                    onChange={onChange}
                />
                <br/>
                <input type="submit" value="repost"/>
            </form>
        </div>
    )
}

export default EditPage;