import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Row,
  Button,
  FormGroup,
  Label,
  Input,
  Collapse,
} from "reactstrap";
import "../assets/scss/home.scss";
import logo from "../assets/image/pokemon.png";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!noData) {
        getPokemon(page);
      }
    }
  };

  useEffect(() => {
    getPokemon(page);
  }, []);
  const getPokemon = (page) => {
    setLoading(true);
    let link;
    if ((page != null) & (page > 1)) {
      link = "https://pokeapi.co/api/v2/pokemon/?offset=200&limit=20" + page;
    } else {
      link = "https://pokeapi.co/api/v2/pokemon?limit=25";
    }
    axios
      .get(link)
      .then((res) => {
        console.log(res);
        const newPage = page + 1;
        const newList = pokemons.concat(res.data.results);
        setPokemons(newList);
        setPage(newPage);
        if (res.data.length === 0) setNoData(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="d-flex justify-content-center">
      <Card className="w-75 mx-3 my-5" style={{ backgroundColor: " #eeebe3" }}>
        <div className="d-flex justify-content-center">
          <h1 className="mx-2 mt-5">
            <b>Find the</b>
          </h1>
          <img src={logo} alt="logo" className="w-25 h-auto" />
        </div>

        {pokemons.map((col, idx) => {
          return (
            <Link to={`/detail/${col.name}`}>
              <button
                className="btn-name w-50"
                // style={{ backgroundColor: "#eeebe3", borderRadius: "10px" }}
              >
                <strong key={idx}>
                  <span>{col.name}</span>
                </strong>
              </button>
            </Link>
          );
        })}

        {loading ? <div className="text-center">loading data ...</div> : ""}
        {noData ? <div className="text-center">no data anymore ...</div> : ""}
      </Card>
    </div>
  );
}

export default Home;
