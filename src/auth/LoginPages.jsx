

import '../auth.css';

export const LoginPages = () => {
  
  return (
    <div className="main">
    <p className="sign" align="center">Iniciar Sesion</p>
    <form className="form1">
      <input className="un " type="text" align="center" placeholder="Nombre de usuario"/>
      <input className="pass" type="password" align="center" placeholder="Contraseña"/>
      <a className="submit" align="center">Iniciar Sesion</a>
    </form>        
                
    </div>
  );
}
