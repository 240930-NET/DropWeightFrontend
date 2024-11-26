import React, { useContext, useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import DropWeightLogo from "../assets/Images/DropWeightLogo.png";


import {
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand,
    Button
  } from "reactstrap";
import { UserContext } from "../Utils/UserContext";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useContext(UserContext);
    
    const handleLogout = () => {
        logout();
    }
    return (
        <div>
            <Navbar style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }} dark expand="md" container={false}>
                <Container>
                    {/* Logo Section */}
                    <NavbarBrand href="/">
                        <img src={DropWeightLogo} alt="Logo" style={{ height: '40px' }} />
                    </NavbarBrand>  
                    <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink
                                    tag={RouterNavLink}
                                    to="/"
                                    className="router-link-exact-active"
                                >
                                    Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                tag={RouterNavLink}
                                to="/workout"
                                className="router-link-exact-active"
                                >
                                Workouts
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                tag={RouterNavLink}
                                to="/nutrition"
                                className="router-link-exact-active"
                                >
                                Nutrition
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                tag={RouterNavLink}
                                to="/goals"
                                className="router-link-exact-active"
                                >
                                Goals
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ms-auto" navbar style={{ marginRight: '20px' }}>
                            <NavItem>
                                <Button color="primary" onClick={handleLogout}>
                                    Log out
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div >
    );
};

export default NavBar;
