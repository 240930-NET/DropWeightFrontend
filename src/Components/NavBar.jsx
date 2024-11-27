import React, { useContext, useState } from "react";
import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import DropWeightLogo from "../assets/Images/DropWeightLogo.png";
import {
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Button,
} from "reactstrap";
import { UserContext } from "../Utils/UserContext";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar
                style={{
                    background: "linear-gradient(to right, #2193b0, #6dd5ed)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
                dark
                expand="md"
            >
                <Container className="d-flex align-items-center">
                    {/* Logo and Navigation Links */}
                    <div className="d-flex align-items-center" style={{ flex: 1 }}>
                        <img
                            src={DropWeightLogo}
                            alt="DropWeight Logo"
                            style={{ height: "45px", width: "auto", marginRight: "20px" }}
                        />
                        <Nav navbar className="d-none d-md-flex align-items-center">
                            <NavItem>
                                <NavLink
                                    tag={RouterNavLink}
                                    to="/"
                                    className={({ isActive }) =>
                                        "nav-link" + (isActive ? " active" : "")
                                    }
                                >
                                    Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    tag={RouterNavLink}
                                    to="/workout"
                                    className={({ isActive }) =>
                                        "nav-link" + (isActive ? " active" : "")
                                    }
                                >
                                    Workouts
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    tag={RouterNavLink}
                                    to="/nutrition"
                                    className={({ isActive }) =>
                                        "nav-link" + (isActive ? " active" : "")
                                    }
                                >
                                    Nutrition
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    tag={RouterNavLink}
                                    to="/goals"
                                    className={({ isActive }) =>
                                        "nav-link" + (isActive ? " active" : "")
                                    }
                                >
                                    Goals
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>

                    {/* Logout Button */}
                    <Button
                        color="danger"
                        outline
                        style={{
                            border: "1px solid #ff4d4d",
                        }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>

                    {/* Mobile Toggler */}
                    <NavbarToggler onClick={toggle} className="custom-toggler d-md-none ms-2" />
                </Container>
            </Navbar>

            {/* Mobile Menu */}
            <Collapse isOpen={isOpen} className="mobile-menu">
                <Nav className="p-3">
                    <NavItem>
                        <NavLink tag={RouterNavLink} to="/" onClick={toggle}>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={RouterNavLink} to="/workout" onClick={toggle}>Workouts</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={RouterNavLink} to="/nutrition" onClick={toggle}>Nutrition</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={RouterNavLink} to="/goals" onClick={toggle}>Goals</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>

            <style>
                {`
                    .custom-toggler {
                        border: 2px solid rgba(255, 255, 255, 0.7) !important;
                        padding: 4px 6px;
                        border-radius: 4px;
                        transition: all 0.3s ease;
                    }

                    .custom-toggler:hover {
                        border-color: white !important;
                        background: rgba(255, 255, 255, 0.1);
                    }

                    .custom-toggler .navbar-toggler-icon {
                        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 0.9)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
                    }

                    .mobile-menu {
                        position: absolute;
                        width: 100%;
                        background: linear-gradient(to right, #2193b0, #6dd5ed);
                        z-index: 1000;
                    }

                    .mobile-menu .nav-link {
                        color: white !important;
                        padding: 12px 20px;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                        transition: all 0.3s ease;
                    }

                    .mobile-menu .nav-link:hover {
                        background: rgba(255, 255, 255, 0.1);
                        padding-left: 25px;
                    }

                    .mobile-menu .nav-item:last-child .nav-link {
                        border-bottom: none;
                    }
                `}
            </style>
        </div>
    );
};

export default NavBar;
