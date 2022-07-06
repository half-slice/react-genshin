import React ,{ useState }from "react";
import { dbService, storageService } from "fbase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { deleteObject } from "firebase/storage";
import { ref } from "firebase/storage";
 

const Post = ({ userObj, isOwner }) => {
    const navigate = useNavigate();

    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this post");
        console.log(ok);
        if(ok){
            try{
                await deleteDoc(doc(dbService,"post",`${userObj.id}`));
                if(userObj.attachmentUrl !== ""){
                    await deleteObject(ref(storageService,userObj.attachmentUrl));
                }
            }
            catch(error){
                window.alert("fail to delete post");
            }
        }
    }

    const onEditClick = () => {
        navigate(`/editpage/id=${userObj.id}`, { state : userObj });
    }

    return(
        <div>
            <h4>
                {userObj.title}
            </h4>
            <h5>
                {userObj.content}
            </h5>
            {userObj.attachmentUrl && (
                <img src={userObj.attachmentUrl} width="50px" height="50px" />
            )}
            {isOwner && (
                <>
                    <br/>
                    <button onClick={onDeleteClick}>Delete</button>
                    <button onClick={onEditClick}>Edit</button>
                </>
            )}
        </div>
    )
}

export default Post;