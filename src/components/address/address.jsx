import { useEffect, useState } from "react";
import "./address.css";

const Address = ({ data, onChangeState }) => {
  const [logradouro, setLogradouro] = useState(data.address.logradouro);
  const [number, setNumber] = useState(data.address.numero);
  const [cep, setCep] = useState(data.address.cep);
  const [complemento, setComplemento] = useState(data.address.complemento);
  const [city, setCity] = useState(data.address.cidade);
  const [state, setState] = useState(data.address.estado);

  const handleChangeState = () => {
    data.allAddress[data.index] = {
      logradouro,
      numero: number,
      cep,
      complemento,
      cidade: city,
      estado: state,
    };

    onChangeState([...data.allAddress], "address");
  };

  const addAddress = () => {
    const validations = [logradouro, number, cep, complemento, city, state];

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

    if (data.allAddress.length == 1) {
      data.allAddress = [
        {
          logradouro,
          numero: number,
          cep,
          complemento,
          cidade: city,
          estado: state,
        },
      ];
      data.allAddress.push({
        logradouro: "",
        numero: "",
        cep: "",
        complemento: "",
        cidade: "",
        estado: "",
      });

      onChangeState([...data.allAddress], "address");
    } else if (data.allAddresss.length > 1) {
      data.allAddress.pop();
      data.allAddress.push({
        logradouro,
        numero: number,
        cep,
        complemento,
        cidade: city,
        estado: state,
      });
      data.allAddress.push({
        logradouro: "",
        numero: "",
        cep: "",
        complemento: "",
        cidade: "",
        estado: "",
      });
      onChangeState([...data.allAddress], "address");
    }
  };
  const removeAddress = () => {
    if (data.allAddress.length == 1) {
      data.allAddress = [
        {
          logradouro: "",
          numero: "",
          cep: "",
          complemento: "",
          cidade: "",
          estado: "",
        },
      ];
      setLogradouro("");
      setNumber("");
      setCep("");
      setComplemento("");
      setCity("");
      setState("");

      onChangeState([...data.allAddress], "address");
    } else if (data.allAddress.length > 1) {
      data.allAddress.splice(data.index, 1);
      onChangeState([...data.allAddress], "address");

      setLogradouro(data.allAddress[data.index].logradouro || "");
      setNumber(data.allAddress[data.index].numero || "");
      setCep(data.allAddress[data.index].cep || "");
      setComplemento(data.allAddress[data.index].complemento || "");
      setCity(data.allAddress[data.index].cidade || "");
      setState(data.allAddress[data.index].estado || "");
    }
  };

  const findAddresByCep = async (cep) => {
    console.log(cep);
    if (cep !== null && cep.length !== 9) {
      return;
    }
    const address = fetch(`
    https://cdn.apicep.com/file/apicep/${cep}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCity(data.city);
        setState(data.state);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    findAddresByCep(cep);
  }, [cep]);

  useEffect(() => {
    handleChangeState();
  }, [logradouro, number, cep, complemento, city, state]);

  return (
    <div className="address">
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
            placeholder="59210-000"
          />
        </div>
        <div id="field">
          <label htmlFor="complemento">Complemento</label>
          <input
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
            type="text"
            name="complemento"
            className="complemento"
            placeholder="Casa 9999"
          />
        </div>
        <div id="field">
          <label htmlFor="city">Cidade</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            name="city"
            className="city"
            placeholder="São Paulo"
          />
        </div>
        <div id="field">
          <label htmlFor="state">Estado</label>
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            type="text"
            name="state"
            className="state"
            placeholder="SP"
          />
        </div>
      </div>
      <div className="buttons">
        {data.index == data.allAddress.length - 1 ? (
          <button onClick={addAddress}>Adicionar Endereço</button>
        ) : null}
        <button onClick={removeAddress} id="btn-fixed">
          Remover
        </button>
      </div>
    </div>
  );
};

export default Address;
