import React from "react";

const ProfilePost=({url})=>{
    return(

        <div className="profile-post"> <img src={url} className=" post-image" alt="post" /> </div>
    )
}

export default ProfilePost;