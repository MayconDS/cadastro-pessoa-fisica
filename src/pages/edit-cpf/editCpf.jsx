import { useEffect, useState } from "react";
import "./editCpf.css";
import Address from "../../components/address/address";
import Contacts from "../../components/contacts/contacts";
import PersonalData from "../../components/personal-data/personalData";
import { Navigate, useParams } from "react-router-dom";

function EditCpf() {
  const { id } = useParams();

  const [personalData, setPersonalData] = useState({});
  const [address, setAddress] = useState({});
  const [contacts, setContacts] = useState({});
  const [redirectToHome, setRedirectToHome] = useState(false); //

  const getDataById = () => {
    let data = JSON.parse(localStorage.getItem("registered_cpf"));

    data = data.filter((item) => item.id == id);

    setPersonalData(data[0].dados_pessoais);
    setAddress(data[0].endereco);
    setContacts(data[0].contatos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cadastro_pessoa_fisica = {
      id,
      dados_pessoais: personalData,
      endereco: address,
      contatos: contacts,
    };

    let data = JSON.parse(localStorage.getItem("registered_cpf"));
    data = data.filter((item) => item.id !== id);
    data.push(cadastro_pessoa_fisica);

    localStorage.setItem("registered_cpf", JSON.stringify(data));
    alert("Alterações Salvas!. Redirecionando...");

    setTimeout(() => {
      setRedirectToHome(true);
    }, 1000);
  };

  const handleChangeState = (state, type) => {
    if (type == "personal-data") {
      setPersonalData([...state]);
    }

    if (type == "address") {
      setAddress([...state]);
    }
    if (type == "contacts") {
      setContacts([...state]);
    }
  };

  useEffect(() => {
    getDataById();
  }, []);

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <div className="edit-cpf">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="container">
          <h1>ATUALIZAR CADASTRO</h1>
          <div className="datas">
            <div className="personal-data">
              <h1>Dados Pessoais</h1>
              {personalData[0] && (
                <PersonalData
                  onChangeState={handleChangeState}
                  data={{
                    personalData: personalData[0],
                  }}
                />
              )}
            </div>
            <div className="line"></div>
            <div className="address">
              <h1>Endereço</h1>
              {address.length == 0 ? (
                <Address
                  onChangeState={handleChangeState}
                  data={{
                    address,
                    index: 1,
                  }}
                />
              ) : (
                address.length > 0 &&
                address.map((endereco, index) => (
                  <Address
                    key={index}
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
                    index: 1,
                  }}
                  onChangeState={handleChangeState}
                />
              ) : (
                contacts.length > 0 &&
                contacts.map((contato, index) => (
                  <Contacts
                    key={index}
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
            <button>SALVAR ALTERAÇÕES</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditCpf;
