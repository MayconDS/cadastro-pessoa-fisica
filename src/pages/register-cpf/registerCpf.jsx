import { useState } from "react";
import "./registerCpf.css";
import Address from "../../components/address/address";
import Contacts from "../../components/contacts/contacts";
import PersonalData from "../../components/personal-data/personalData";
import generateId from "../../utils/generateId";

function RegisterCpf() {
  const [personalData, setPersonalData] = useState({
    nome: "",
    sobrenome: "",
    data_de_nascimento: "",
    email: "",
    cpf: "",
    rg: "",
  });
  const [address, setAddress] = useState([
    {
      logradouro: "",
      numero: "",
      cep: "",
      complemento: "",
      cidade: "",
      estado: "",
    },
  ]);
  const [contacts, setContacts] = useState([
    {
      logradouro: "",
      numero: "",
      cep: "",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cadastro_pessoa_fisica = {
      id: generateId(),
      dados_pessoais: personalData,
      endereco: address,
      contatos: contacts,
    };

    if (localStorage.getItem("registered_cpf") == null) {
      localStorage.setItem(
        "registered_cpf",
        JSON.stringify([cadastro_pessoa_fisica])
      );
    } else {
      const new_register = JSON.parse(localStorage.getItem("registered_cpf"));
      new_register.push(cadastro_pessoa_fisica);
      localStorage.setItem("registered_cpf", JSON.stringify(new_register));
    }
  };

  const handleChangeState = (state, type) => {
    if (type == "personal-data") {
      setPersonalData(state);
    }
    if (type == "address") {
      setAddress([...state]);
    }
    if (type == "contacts") {
      setContacts([...state]);
    }
  };

  return (
    <div className="register-cpf">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h1>Cadastrar Pessoa Fisica</h1>
          <div className="datas">
            <div className="personal-data">
              <h1>Dados Pessoais</h1>
              <PersonalData
                onChangeState={handleChangeState}
                data={{
                  personalData,
                }}
              />
            </div>
            <div className="line"></div>
            <div className="address">
              <h1>Endereço</h1>
              {address.length == 0 ? (
                <Address
                  onChangeState={handleChangeState}
                  data={{
                    address,
                  }}
                />
              ) : (
                address.length > 0 &&
                address.map((endereco, index) => (
                  <Address
                    onChangeState={handleChangeState}
                    data={{
                      allAddress: address,
                      address: endereco,
                      index: index,
                    }}
                  />
                ))
              )}
            </div>
            <div className="line"></div>
            <div className="contacts">
              <h1>Contatos</h1>
              {contacts.length == 0 ? (
                <Contacts
                  data={{
                    contacts,
                  }}
                  onChangeState={handleChangeState}
                />
              ) : (
                contacts.length > 0 &&
                contacts.map((contato, index) => (
                  <Contacts
                    data={{
                      allContacts: contacts,
                      contact: contato,
                      index: index,
                    }}
                    onChangeState={handleChangeState}
                  />
                ))
              )}
            </div>
            <div className="line"></div>
            <button>SALVAR</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterCpf;
