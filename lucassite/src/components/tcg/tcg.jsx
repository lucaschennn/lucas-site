import React from 'react';
import { useAuth } from "../AuthContext.jsx";
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";

import './tcg.css';

function Tcg() {
    return (
    <div>
        <Login/>
    </div>
    );
}

export default Tcg;
