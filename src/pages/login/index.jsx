import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IniciarSesion } from '../../services/ServicioConsumo';
import { LanguageContext } from '../../context/context';
import { toast } from 'react-toastify';
import './login.css';

export function Login() {
  const ruta = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { setConfiguracionData } = useContext(LanguageContext);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 

  const handleLogin = async (e) => {
    if (e) e.preventDefault(); 

    const newErrors = {};
    if (!usuario.trim()) newErrors.usuario = 'El nombre de usuario es obligatorio';
    if (!password.trim()) newErrors.password = 'La contraseña es obligatoria';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        const jsonLogin = {
          usuario: usuario,
          password: password,
        };

        const response = await IniciarSesion(jsonLogin);

        if (response.Error) {
          toast.error(response.Mensaje);
        } else {
          setConfiguracionData(response.Resultado);
          ruta('/home', { state: { fromLogin: true } });

          sessionStorage.setItem('SessionToken', response.Resultado.SessionToken);
          sessionStorage.setItem('Usuario', response.Resultado.usuario);
          sessionStorage.setItem('nombreusuario', response.Resultado.nombreusuario);
        }
      } catch (error) {
        console.log(error);
        console.error('Error al obtener Informacion:', error.message);
        toast.error('Error:No se encontro el servidor.');
      } finally {
        setLoading(false); 
      }
    }
  };

  return (
    <section className="vh-100 d-flex justify-content-center align-items-center body_section__login login-section">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <h4 className="fw-bold">Inicio de Sesión</h4>
        </div>

        {/* FORM con onSubmit */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label" htmlFor="usuario">
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              className={`form-control ${errors.usuario ? 'is-invalid' : ''}`}
              placeholder="Nombre de usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              disabled={loading} 
            />
            {errors.usuario && <div className="invalid-feedback">{errors.usuario}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading} 
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary d-flex justify-content-center align-items-center"
              disabled={loading} 
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Cargando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
