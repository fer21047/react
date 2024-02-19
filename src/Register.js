import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!id.trim() || !name.trim() || !password.trim() || !confirmPassword.trim()) {
            toast.error('Por favor completa todos los campos.');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden.');
            return;
        }
        const regobj = { id, name, password };
        fetch("http://localhost:8000/user", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regobj)
        }).then((res) => {
            if (!res.ok) {
                throw new Error('Error al registrar.');
            }
            toast.success('¡Usuario registrado exitosamente!');
            navigate('/login');
        }).catch((err) => {
            toast.error('Error al registrar: ' + err.message);
        });
    }

    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Registro de Usuario</h1>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Nombre de Usuario <span className="errmsg">*</span></label>
                                <input value={id} onChange={(e) => setId(e.target.value)} className="form-control" />
                                {!id.trim() && <p className="errmsg">El nombre de usuario es obligatorio.</p>}
                            </div>
                            <div className="form-group">
                                <label>Contraseña <span className="errmsg">*</span></label>
                                <div className="input-group">
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-link"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Ocultar" : "Mostrar"}
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Confirmar Contraseña <span className="errmsg">*</span></label>
                                <div className="input-group">
                                    <input
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="form-control"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-link"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? "Ocultar" : "Mostrar"}
                                    </button>
                                </div>
                                {password !== confirmPassword && <p className="errmsg">Las contraseñas no coinciden.</p>}
                            </div>
                            <div className="form-group">
                                <label>Nombre Completo <span className="errmsg">*</span></label>
                                <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                                {!name.trim() && <p className="errmsg">El nombre completo es obligatorio.</p>}
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Registrarse</button> |
                            <Link to={'/login'} className="btn btn-danger">Cerrar</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
