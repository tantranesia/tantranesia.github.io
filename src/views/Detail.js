import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftCircle } from "react-feather";
import { Card, Col, Row } from "reactstrap";
import React, { Component } from "react";

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      order: 0,
      name: "",
      base_experience: 0,
      height: 0,
      weight: 0,
      stats: [],
      types: [],
      abilities: [],
      moves: [],
      image: "",
      id: 0,
    };
  }
  async componentDidMount() {
    console.log(this.props.match.params.name);
    await this.setState({
      name: this.props.match.params.name,
    });
    this.getPokemon();
  }
  getPokemon = () => {
    const link = `https://pokeapi.co/api/v2/pokemon/${this.state.name}`;
    axios
      .get(link)
      .then((res) => {
        console.log(res);
        this.setState({
          order: res.data.order,
          name: this.state.name,
          base_experience: res.data.base_experience,
          height: res.data.height,
          weight: res.data.weight,
          stats: res.data.stats,
          types: res.data.types,
          abilities: res.data.abilities,
          moves: res.data.moves,
          id: res.data.id,
          isLoading: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const data = this.state;

    return (
      <div>
        <Card className="m-5" style={{ backgroundColor: " #eeebe3" }}>
          <Row>
            <Col className="col-1">
              <Link to="/">
                <ArrowLeftCircle size={30} className="mt-3" />
              </Link>
            </Col>

            <Col className="col-4">
              <img
                src={`https://pokeres.bastionbot.org/images/pokemon/${this.state.id}.png`}
                alt="poke-img"
                className="w-50 h-auto"
                style={{ marginLeft: "2vw" }}
              />
            </Col>
            <Col className="d-flex justify-items-left">
              <Row>
                <p>
                  <b>#{this.state.order}</b>
                </p>
                <hr></hr>
                <h2 style={{ color: "#B22222" }}>
                  <b>{this.state.name.toUpperCase()}</b>
                </h2>
                <hr></hr>

                <Col>
                  <p>
                    <b>Base Exp</b>
                  </p>
                  <p>{this.state.base_experience}</p>
                </Col>
                <Col>
                  <p>
                    <b>Height</b>
                  </p>
                  <p>{this.state.height}</p>
                </Col>
                <Col>
                  <p>
                    <b>Weight</b>
                  </p>
                  <p>{this.state.weight}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Row>
          <Col>
            <Card className="mx-5 my-1" style={{ backgroundColor: " #eeebe3" }}>
              <Row>
                <h3
                  style={{ textAlign: "left", margin: "1vw", color: "#black" }}
                >
                  <b>Stat</b>
                </h3>
                {this.state.stats.map((col, idx) => {
                  return (
                    <div className="d-flex justify-items-left">
                      <p className="mx-2">{col.stat.name}:</p>
                      <p>{col.base_stat}</p>
                    </div>
                  );
                })}
              </Row>
              <hr></hr>
              <Row>
                <h3
                  style={{ textAlign: "left", margin: "1vw", color: "black" }}
                >
                  <b>Type</b>
                </h3>
                {this.state.types.map((col, idx) => {
                  return (
                    <div className="d-flex justify-items-center">
                      <p className="mx-2">{col.type.name}</p>
                    </div>
                  );
                })}
              </Row>
              <hr></hr>
              <Row>
                <h3
                  style={{ textAlign: "left", margin: "1vw", color: "black" }}
                >
                  <b>Abilties</b>
                </h3>
                {this.state.abilities.map((col, idx) => {
                  return (
                    <div className="d-flex justify-items-center">
                      <p className="mx-2">{col.ability.name}</p>
                    </div>
                  );
                })}
              </Row>
            </Card>
          </Col>
          <Col>
            <Card className="mx-5 my-1" style={{ backgroundColor: "#eeebe3" }}>
              <Row>
                <h3
                  style={{ textAlign: "left", margin: "1vw", color: "black" }}
                >
                  <b>Moves</b>
                </h3>
                {this.state.moves.map((col, idx) => {
                  return (
                    <div className="d-flex justify-items-center">
                      <p className="mx-2">{col.move.name}</p>
                    </div>
                  );
                })}
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Detail;
