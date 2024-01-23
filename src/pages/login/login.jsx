import { useState } from "react";
import "./login.css";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email == "" || password == "") {
      alert("Preencha todos os campos.");
    }

    let login_user = false;
    const users_database = JSON.parse(localStorage.getItem("registered_users"));

    users_database.map((user) => {
      if (user.email == email && user.password == password) {
        login_user = user;
      }
    });

    if (login_user !== false) {
      localStorage.setItem(
        "logged_user",
        JSON.stringify({
          username: login_user.username,
          email: login_user.email,
          password: login_user.password,
          phone: login_user.phone,
        })
      );
      alert("Login efetuado. Redirecionando");
      setTimeout(() => {
        setRedirectToHome(true);
      }, 1500);
    } else {
      alert("Usuário o senha invalido!");
    }
  };

  if (redirectToHome) {
    return <Navigate to="/register-cpf" />;
  }
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="data">
            <h1>Login de Usuário</h1>
            <div className="fields">
              <div id="field" className="email">
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Digite seu E-mail"
                />
              </div>

              <div id="field" className="password">
                <label htmlFor="password">Senha</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>
            <button>Login</button>
          </div>
          <div className="image">
            <span>LOGO AQUI</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
