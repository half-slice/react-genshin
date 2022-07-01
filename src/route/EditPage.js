import React from "react";
import { useLocation } from "react-router-dom";

const EditPage = () => {
    const location = useLocation();
    console.log(location.title);

    return(
        <div>
            edit
        </div>
    )
}

export default EditPage;