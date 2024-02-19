import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Appheader = () => {
    const [displayusername, setDisplayUsername] = useState('');
    const [showmenu, setShowMenu] = useState(false);
    const usenavigate = useNavigate();

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        if (!username) {
            usenavigate('/login');
        } else {
            setDisplayUsername(username);
            setShowMenu(true);
        }
    }, []); // Eliminar GetUserAccess del array de dependencias

    const handleLogout = () => {
        sessionStorage.clear();
        usenavigate('/login');
    };

    return (
        <div>
            {showmenu && (
                <div className="header" style={{ backgroundColor: 'black', color: 'white' }}>
                    <Link to={'/'} style={{ color: 'white' }}>Inicio</Link>
                    <span style={{ marginLeft: '70%' }}>Bienvenido <b>{displayusername}</b></span>
                    <button style={{ float: 'right' }} onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            )}
        </div>
    );
}

export default Appheader;
