import React from "react"
import {  Container, } from "reactstrap";

const ProfileImage =({src})=>{

    
    
    
    return(

       
        <Container fluid className="profile-image-container ">
            <img src={src} alt="profile" className="img-fluid profile-image" />
        </Container>
    
    )
}

export default ProfileImage;