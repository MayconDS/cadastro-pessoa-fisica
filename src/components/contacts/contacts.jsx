import { useState, useEffect } from "react";
import "./contacts.css";

const Contacts = ({ data, onChangeState }) => {
  const [logradouro, setLogradouro] = useState(data.contact.logradouro || "");
  const [number, setNumber] = useState(data.contact.numero || "");
  const [cep, setCep] = useState(data.contact.cep || "");

  const handleChangeState = () => {
    let updateContacts = data.allContacts;
    updateContacts[data.index] = {
      logradouro,
      numero: number,
      cep,
    };
    onChangeState([...updateContacts], "contacts");
  };

  const addContact = () => {
    const validations = [logradouro, number, cep];

    const fields = [];
    validations.map((validation) => {
      if (validation == "") {
        fields.push(validation);
      }
    });

    if (fields.length > 0) {
      alert(`Preencha todos os campos. Antes de adicionar outro endereço`);
      return;
    }

    if (data.allContacts.length == 1) {
      data.allContacts = [
        {
          logradouro,
          numero: number,
          cep,
        },
      ];
      data.allContacts.push({
        logradouro: "",
        numero: "",
        cep: "",
      });

      onChangeState([...data.allContacts], "contacts");
    } else if (data.allContacts.length > 1) {
      data.allContacts.pop();
      data.allContacts.push({
        logradouro,
        numero: number,
        cep,
      });
      data.allContacts.push({
        logradouro: "",
        numero: "",
        cep: "",
      });
      onChangeState([...data.allContacts], "contacts");
    }
  };
  const removeContact = () => {
    if (data.allContacts.length == 1) {
      const updatedContacts = {
        logradouro: "",
        numero: "",
        cep: "",
        complemento: "",
        cidade: "",
        estado: "",
      };

      setLogradouro("");
      setNumber("");
      setCep("");

      onChangeState([...updatedContacts], "contacts");
    } else if (data.allContacts.length > 1) {
      data.allContacts.splice(data.index, 1);
      onChangeState([...data.allContacts], "contacts");

      setLogradouro(data.allContacts[data.index].logradouro || "");
      setNumber(data.allContacts[data.index].numero || "");
      setCep(data.allContacts[data.index].cep || "");
    }
  };

  useEffect(() => {
    handleChangeState();
  }, [logradouro, number, cep]);

  return (
    <div className="contacts">
      <div className="fields">
        <div id="field">
          <label htmlFor="logradouro">Logradouro</label>
          <input
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
            type="text"
            name="logradouro"
            className="logradouro"
            placeholder="Rua Sem Nome"
          />
        </div>
        <div id="field">
          <label htmlFor="number">Número</label>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            type="text"
            name="number"
            className="number"
            placeholder="999999"
          />
        </div>
        <div id="field">
          <label htmlFor="cep">CEP</label>
          <input
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            type="text"
            name="cep"
            className="cep"
            placeholder="99999-999"
          />
        </div>
      </div>

      <div className="buttons">
        {data.index == data.allContacts.length - 1 ? (
          <button onClick={addContact}>Adicionar Contato</button>
        ) : null}
        <button onClick={removeContact} id="btn-fixed">
          Remover
        </button>
      </div>
    </div>
  );
};
export default Contacts;
