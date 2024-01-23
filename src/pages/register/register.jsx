import { useState } from "react";
import "./register.css";
import { Link, Navigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (email == "" || username == "" || phone == "" || password == "") {
      return alert("Preencha todos os campos");
    }

    if (localStorage.getItem("registered_users") == null) {
      localStorage.setItem(
        "registered_users",
        JSON.stringify([
          {
            photo: imagePreview,
            username,
            email,
            phone,
            password,
          },
        ])
      );
    } else {
      const users = JSON.parse(localStorage.getItem("registered_users"));

      users.push({
        photo: imagePreview,
        username,
        email,
        phone,
        password,
      });

      localStorage.setItem("registered_users", JSON.stringify(users));
    }
    alert("Usuário criado. Redirecionando para pagina de Login");

    setTimeout(() => {
      setRedirectToLogin(true);
    }, 2000);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = reader.result;
        setImagePreview(imageUrl);
      };

      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="data">
            <h1>Cadastrar Usuário</h1>

            <div className="fields">
              <div id="field" className="username">
                <label htmlFor="username">Username</label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  type="text"
                  placeholder="Digite seu username"
                />
              </div>
              <div id="field" className="email">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Digite seu E-mail"
                />
              </div>
              <div id="field" className="phone">
                <label htmlFor="phone">Telefone</label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  type="text"
                  placeholder="Digite seu numero"
                />
              </div>
              <div id="field" className="password">
                <label htmlFor="password">Senha</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="text"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>
            <button>Cadastrar Usuário</button>
          </div>
          <div
            style={{
              backgroundImage: imagePreview ? `url(${imagePreview})` : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="image"
          >
            <input type="file" onChange={handleFileChange} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
