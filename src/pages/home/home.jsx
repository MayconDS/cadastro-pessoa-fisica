import { Link } from "react-router-dom";
import "./home.css";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("registered_cpf"))
  );

  let personalDataCopy = [];
  data.map((item) => {
    item.dados_pessoais[0].id = item.id;
    personalDataCopy.push(item.dados_pessoais[0]);
  });

  const handleDelete = (id) => {
    personalDataCopy = data.filter((item) => item.id !== id);
    localStorage.setItem("registered_cpf", JSON.stringify(personalDataCopy));
  };

  return (
    <div className="home">
      <div className="container">
        <div className="registrations">
          <h1>CADASTROS NO SISTEMA</h1>
          {personalDataCopy.length > 0 &&
            personalDataCopy.map((item) => (
              <div className="people_cpf">
                <h3>
                  {item.nome} {item.sobrenome} ( {item.cpf} )
                </h3>

                <div className="buttons">
                  <Link to={`/edit/cpf/${item.id}`} id="edit">
                    <FaEdit />
                  </Link>
                  <button onClick={() => handleDelete(item.id)} id="delete">
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
