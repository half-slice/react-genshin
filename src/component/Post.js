import React ,{ useState }from "react";
import { dbService } from "fbase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { History } from "history";

const Post = ({ userObj, isOwner,history }) => {
    const [editing,setEditing] = useState(false);
    const [newTitle,setNewTitle] = useState(userObj.title);
    const [newContent,setNewContent] = useState(userObj.content);

    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this post");
        console.log(ok);
        if(ok){
            await deleteDoc(doc(dbService,"post",`${userObj.id}`));
        }
    }

    const onEditClick = () => {
        // history.push({
        //     pathname : "/editpage",
        //     title : userObj.title,
        //     content : userObj.content, 
        // })    
    }

    return(
        <div>
            <h4>
                {userObj.title}
            </h4>
            <h5>
                {userObj.content}
            </h5>
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete</button>
                    <button onClick={()=> { history.push("/editpage")}}>Edit</button>
                </>
            )}
        </div>
    )
}

export default Post;