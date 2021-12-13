import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, NavItem, NavLink, Row,Input,InputGroup,Button ,ButtonDropdown,DropdownToggle,DropdownMenu,DropdownItem} from "reactstrap";
import { AiOutlineHome,AiOutlineSearch} from "react-icons/ai";
import {BsPlusSquare} from "react-icons/bs"
import { isauthentcated } from "../user/helper/api";
import UploadImage from "./UploadImage";
const Navbar =()=>{

    const [dropdownopen,setDropdownopen]=useState(false)
    const [uploadimage,setUplaodimage]=useState(false);

    return (
        <Container className="bg-light" fluid>
            <Container className="container-md m-0" >
                <Nav className="d-flex justify-content-around">
                <NavItem>
                    <Link to="/" ><NavLink >Mini Insta</NavLink></Link>
                </NavItem>
                <div>
                <InputGroup >
                <Input placeholder="Search Username" /> 
                    <Button>
                        <AiOutlineSearch size={25}/>
                 </Button>
                </InputGroup>
                </div>
                <div className="h-100 ">
                    {isauthentcated()?(
                        <>
                        <Link to="/"><AiOutlineHome size={38}/></Link>
                        <Button color="white" onClick={()=>setUplaodimage(!uploadimage)}>
                            <BsPlusSquare size={38}/>
                        </Button>
                        <UploadImage uploadimage={uploadimage} setUplaodimage={setUplaodimage}/>
                        <ButtonDropdown className="mx-3" isOpen={dropdownopen} toggle={()=>setDropdownopen(!dropdownopen)}>
                                <DropdownToggle caret>
                                 Button
                                        </DropdownToggle>
                                     <DropdownMenu>
                                         <DropdownItem className="text-center">
                                            <Link to='/profile'>Profile</Link> 
                                        </DropdownItem>
                                <DropdownItem disabled>
                                        Action
                                     </DropdownItem>
                                         <DropdownItem>
                                      Another Action
                                </DropdownItem>
                                    <DropdownItem divider />
                                 <DropdownItem>
                                         Another Action
                                         </DropdownItem>
                                </DropdownMenu>
                                            </ButtonDropdown>
                                            </>
                    ):(
                        <Link to="/signin">Signin</Link>
                    )}
                    
                </div>
            </Nav>
            </Container>
            </Container>
    )
}

export default Navbar;