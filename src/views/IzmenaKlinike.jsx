import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import "izmenaProfila.css";
import "login.js";
import axios from "axios";

class IzmenaKlinike extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.email,
      token: props.token,
      idKlinike: "",
      naziv: "",
      adresa: "",
      opis: "",
      ocena: "",
      id: ""
    };
  }

  componentWillMount() {
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    const url1 =
      "http://localhost:8025/api/adminKlinike/getAdminKlinikeByEmail";
    axios
      .get(url1, config)
      .then(Response => {
        this.setState({
          email: Response.data.email,
          ime: Response.data.ime,
          prezime: Response.data.prezime,
          telefon: Response.data.telefon,
          idKlinike: Response.data.idKlinike
        });

        const url = "http://localhost:8025/api/klinike/" + this.state.idKlinike;
        axios
          .get(url, config)
          .then(Response => {
            this.setState({
              id: Response.data.id,
              naziv: Response.data.naziv,
              adresa: Response.data.adresa,
              ocena: Response.data.ocena,
              opis: Response.data.opis
            });
          })

          .catch(error => {});
      })

      .catch(error => {});
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSumbit = e => {
    e.preventDefault();

    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .put(
        "http://localhost:8025/api/klinike/update",
        {
          id: this.state.id,
          naziv: this.state.naziv,
          adresa: this.state.adresa,
          ocena: this.state.ocena,
          opis: this.state.opis
        },
        config
      )
      .then(response => {
        this.setState({
          id: response.data.id,
          naziv: response.data.naziv,
          adresa: response.data.adresa,
          ocena: response.data.ocena,
          opis: response.data.opis
        });
      })
      .catch(error => {});
  };

  render() {
    const idKlinike = this.state.idKlinike;
    const id = this.state.id;
    const naziv = this.state.naziv;
    const adresa = this.state.adresa;
    const opis = this.state.opis;
    const ocena = this.state.ocena;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Izmena podataka"
                content={
                  <form
                    onSubmit={this.handleSumbit}
                    className="formaIzmenaProfilaLekara"
                  >
                    <div className="ime">
                      <label htmlFor="naziv">Naziv: </label>
                      <input
                        type="text"
                        name="naziv"
                        defaultValue={naziv}
                        // placeholder={this.state.ime}
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="ime">
                      <label htmlFor="adresa">Adresa: </label>
                      <input
                        type="text"
                        name="adresa"
                        defaultValue={adresa}
                        // placeholder="prezime"
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="ime">
                      <label htmlFor="opis">Opis: </label>
                      <input
                        type="text"
                        name="opis"
                        defaultValue={opis}
                        // placeholder="prezime"
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="ime">
                      <label htmlFor="ocena">Ocena: </label>
                      <input
                        type="text"
                        name="ocena"
                        defaultValue={ocena}
                        disabled="disabled"
                        // placeholder="prezime"
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div>

                    {/* <div className="klinikaK">
                        <label htmlFor="klinikaK">klinika: </label>
                        <input
                          type="text"
                          name="klinikaK"
                          placeholder="klinikaK"
                          // noValidate
                          // onChange={this.handleChange}
                        />
                      </div> */}
                    {/* <div className="klinika">
                        <label htmlFor="klinika">Klinika: </label>
                        <input
                          type="text"
                          name="klinika"
                          placeholder="klinika"
                          // noValidate
                          // onChange={this.handleChange}
                        />
                      </div> */}

                    <div className="izmeniPodatkePacijent">
                      <Button type="submit">Izmeni podatke</Button>
                    </div>
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                // statsIcon="fa fa-clock-o"
                title="O klinici"
                // category="Ime"
                content={
                  <div id="a">
                    <div className="typo-line">
                      <h2>
                        <p className="category">Naziv:</p>
                        <label className="adresaKC">{this.state.naziv}</label>
                      </h2>
                    </div>
                    <div className="typo-line">
                      <h2>
                        <p className="category">Adresa:</p>
                        <label className="opisKC">{this.state.adresa}</label>
                      </h2>
                    </div>

                    <div className="typo-line">
                      <h2>
                        <p className="category">Opis:</p>
                        <label className="opisKC">{this.state.opis}</label>
                      </h2>
                    </div>

                    <div className="typo-line">
                      <h2>
                        <p className="category">Ocena::</p>
                        <label className="opisKC">{this.state.ocena}</label>
                      </h2>
                    </div>
                  </div>
                }

                // category="opis ... naziv adresa i opis  "
                // stats="Campaign sent 2 days ago"
                // content={
                //   <div
                //     id="chartPreferences"
                //     className="ct-chart ct-perfect-fourth"
                //   >
                //     <ChartistGraph data={dataPie} type="Pie" />
                //   </div>
                // }
                // legend={
                //   <div className="legend">{this.createLegend(legendPie)}</div>
                // }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default IzmenaKlinike;
