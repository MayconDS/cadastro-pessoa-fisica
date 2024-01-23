import { useEffect, useState } from "react";
import "./personalData.css";

const PersonalData = ({ data, onChangeState }) => {
  const [name, setName] = useState(data.personalData.nome);
  const [surname, setSurname] = useState(data.personalData.sobrenome);
  const [birthday, setBirthday] = useState(
    data.personalData.data_de_nascimento
  );
  const [email, setEmail] = useState(data.personalData.email);
  const [cpf, setCpf] = useState(data.personalData.cpf);
  const [rg, setRg] = useState(data.personalData.rg);

  useEffect(() => {
    let updatePersonalData = [
      {
        nome: name,
        sobrenome: surname,
        data_de_nascimento: birthday,
        email,
        cpf,
        rg,
      },
    ];
    onChangeState([...updatePersonalData], "personal-data");
  }, [name, surname, birthday, email, cpf, rg]);

  return (
    <div className="personal-data">
      <div className="fields">
        <div id="field">
          <label htmlFor="name">Nome</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            className="name"
            placeholder="Nome"
          />
        </div>
        <div id="field">
          <label htmlFor="surname">Sobrenome</label>
          <input
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            type="text"
            name="surname"
            className="surname"
            placeholder="Sobrenome"
          />
        </div>
        <div id="field">
          <label htmlFor="birthday">Data de nascimento</label>
          <input
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            type="date"
            name="birthday"
            className="birthday"
            placeholder="Data de nascimento"
          />
        </div>
        <div id="field">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            className="email"
            placeholder="Email"
          />
        </div>
        <div id="field">
          <label htmlFor="cpf">CPF</label>
          <input
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            type="text"
            name="cpf"
            className="cpf"
            placeholder="999.999.999-99"
          />
        </div>
        <div id="field">
          <label htmlFor="rg">RG</label>
          <input
            value={rg}
            onChange={(e) => setRg(e.target.value)}
            type="text"
            name="rg"
            className="rg"
            placeholder="999.999.99-9"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalData;
