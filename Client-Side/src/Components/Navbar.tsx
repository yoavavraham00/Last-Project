import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
return (
<>
<h1>Biz Cards</h1>
<nav>
<Link to="/">Cards</Link>
<Link to="/register">Register</Link>
<Link to="/login">Login</Link>
</nav>
</>
);
};
export default Navbar;