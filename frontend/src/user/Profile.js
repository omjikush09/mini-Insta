import React,{useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Navbar from "../core/Navbar";
import { getUser } from "./helper/api";
import ProfileImage from "./ProfileImage";
import ProfilePost from "./ProfilePost";

const Profile =()=>{

    const param=useParams();

    const [values,setValues]=useState({
        id:"",
        username:"",
        firstname:"",
        lastname:"",
        numberOfFollowers:0,
        numberOfFollowing:5,
        numberOfPost:0,
        images:[],
        error:"",
        success:""
    })

    const {id,username,firstname,lastname,numberOfFollowers,numberOfFollowing,numberOfPost,images}=values;

    const getUserBeforePageLoad=(username)=>{
        getUser(username).then(res=>{
            if(res.error){
                setValues({...values,error:res.error})
            }else{
                setValues({...values,
                id:res._id,
                username:res.username,
                firstname:res.firstname,
                lastname:res.lastname,
                numberOfFollowers:res.numberOfFollowers,
                numberOfFollowing:res.numberOfFollowing,
                numberOfPost:res.numberOfPost,
                images:res.images,
                error:""
                })
            }
        })
    }
    useEffect(()=>{
        getUserBeforePageLoad(param.username)
    },[param.username])
    
    
    return(
        <>
        <Navbar/>
        <Container fluid>
            <Container className="container-sm mt-5 mb-5">
                <Row>
                <Col md={1}>
                    </Col>
                    <Col md={3}>
                        <ProfileImage src="https://olympic.ca/wp-content/uploads/2018/02/img_9806-e1518070422879.jpg"/>
                    </Col>
                    <Col md={1}>
                    </Col>
                    <Col md={6}>
                        <div>
                           <p className="font-size-medium">{username}</p>
                        </div>
                        <div>
                        <strong>{numberOfPost}</strong> <span className="margin-right" >Posts</span>
                        <strong>{numberOfFollowers}</strong> <span className="margin-right" >Followers</span>
                        <strong>{numberOfFollowing}</strong> <span className="margin-right" >Following</span>
                        </div>
                        <br />
                        <div>
                            <h5 className="inline-block" >{firstname}</h5> <h5 className="inline-block">{lastname}</h5> 
                        </div>
                    </Col>
                </Row>
                <br />
                <div className="text-center " > <strong>Posts</strong> </div>
                <Row>
                    <Col md={1}>
                    </Col>
                    <div className="line"></div>
                    <div className="grid-container">
                        {images && images.map((image)=>(

                    <ProfilePost key={image._id} url={image.url}/>
                        ))}
                    
                    </div>
                    <Col md={1}>
                    </Col>
                </Row>
            </Container>
            
        </Container>
        </>
    )
}

export default Profile;