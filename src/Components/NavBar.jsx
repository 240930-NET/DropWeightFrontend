import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

import {
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
  } from "reactstrap";


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
        <Navbar style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }} dark expand="md" container={false}>
            <Container>
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
                    <Nav className="ms-auto" navbar>
                        <NavItem>
                            Logout
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    </div >
  );
};

export default NavBar;