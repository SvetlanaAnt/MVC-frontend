import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

// import "izmenaProfila.css";

//dodam link za sliku  mozda od doktora!!
// import avatar from "assets/img/faces/face-3.jpg";

import { log } from "util";
import slikaPacijent from "assets/img/pacijentImage.jpg";
import axios from "axios";
import moment from "moment";

class BrzoZakazivanje extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      uloga: props.uloga,
      token: props.token,
      listaPregleda: [],
      pretraziPoljeKlinika: "",
      redirectNext: false,
      flag: 0,
      izabranPregled: 0,
      formError: "",
      izabraniLekar: 0,
      izabranaKlinika: 0,
      izabraniDatum: new Date(),
      izabraniTipPregleda: 0,
      izabranaCena: 0,
      izabraniPopust: 0,
      canClick: false
    };
    this.redirectReferer = this.redirectReferer.bind(this);
    this.sortMyArray = this.sortMyArray.bind(this);
  }
  sortMyArray(sortBy) {
    console.log("sort funkcija");
    console.log(sortBy);
    const lista = this.state.listaPregleda;
    if (sortBy === "klinika") {
      console.log("klinika");
      this.setState({
        listaPregleda: lista.sort((a, b) =>
          a.klinikaN.localeCompare(b.klinikaN)
        )
      });
    } else if (sortBy === "lekarI") {
      console.log("lekarI");
      this.setState({
        listaPregleda: lista.sort((a, b) =>
          a.lekarIme.localeCompare(b.lekarIme)
        )
      });
    } else if (sortBy === "lekarP") {
      console.log("lekarP");
      this.setState({
        listaPregleda: lista.sort((a, b) =>
          a.lekarPrezime.localeCompare(b.lekarPrezime)
        )
      });
    } else if (sortBy === "cenar") {
      console.log("cenar");

      this.setState({
        listaPregleda: lista.sort((a, b) => a.cena - b.cena)
      });
    } else if (sortBy === "cenao") {
      console.log("cenao");

      this.setState({
        listaPregleda: lista.sort((a, b) => b.cena - a.cena)
      });
    } else if (sortBy === "popustr") {
      console.log("popustr");

      this.setState({
        listaPregleda: lista.sort((a, b) => a.popust - b.popust)
      });
    } else if (sortBy === "popusto") {
      console.log("popusto");

      this.setState({
        listaPregleda: lista.sort((a, b) => b.popust - a.popust)
      });
    } else if (sortBy === "tipPregleda") {
      console.log("tipPregleda");

      this.setState({
        listaPregleda: lista.sort((a, b) =>
          a.tipPregledaN.localeCompare(b.tipPregledaN)
        )
      });
    }
  }

  componentWillMount() {
    var url = "http://localhost:8025/api/lekari/listaZauzetostiLekara/" + 1;
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    // axios
    //   .get(url, config)
    //   .then(Response => {
    //     console.log("Preuzeti zauzetiTermini: ");
    //     console.log(Response.data);
    //   })
    //   .catch(error => {
    //     console.log("pregledi  nisu preuzeti");
    //   });
    url = "http://localhost:8025/api/ST/unapredDef";
    config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .get(url, config)
      .then(Response => {
        console.log("Preuzeti unapred def pregledi: ");
        console.log(Response.data);

        this.setState(
          {
            listaPregleda: Response.data.sort((a, b) => {
              let startA = new Date(a.datum);
              startA.setHours(a.termin);

              let startB = new Date(b.datum);
              startB.setHours(b.termin);

              return new Date(startA).getTime() - new Date(startB).getTime();
            })
          },
          () => console.log(this.state.listaPregleda)
        );
      })

      .catch(error => {
        console.log("pregledi  nisu preuzeti");
      });
  }
  handleSortKlinika(sortBy) {
    console.log("sort funkcija");
    console.log(sortBy);
    const lista = this.state.listaPregleda;
    if (sortBy === "datumUp") {
      console.log("datum");
      this.setState({
        listaPregleda: lista.sort((a, b) => {
          let startA = new Date(a.datum);
          startA.setHours(a.termin);

          let startB = new Date(b.datum);
          startB.setHours(b.termin);

          return new Date(startA).getTime() - new Date(startB).getTime();
        })
      });
    } else if (sortBy === "datumDown") {
      console.log("datum");
      this.setState({
        listaPregleda: lista.sort((b, a) => {
          this.setState({
            pregledi: lista.sort((b, a) => {
              let startA = new Date(a.datum);
              startA.setHours(a.termin);

              let startB = new Date(b.datum);
              startB.setHours(b.termin);

              return new Date(startA).getTime() - new Date(startB).getTime();
            })
          });
        })
      });
    } else if (sortBy === "tipPregledaUp") {
      console.log("tipPregleda");
      this.setState({
        listaPregleda: lista.sort((a, b) =>
          a.tipPregledaN.localeCompare(b.tipPregledaN)
        )
      });
    } else if (sortBy === "tipPregledaDown") {
      console.log("tipPregleda");
      this.setState({
        listaPregleda: lista.sort((b, a) =>
          a.tipPregledaN.localeCompare(b.tipPregledaN)
        )
      });
    } else if (sortBy === "klinikaUp") {
      console.log("klinika");
      this.setState({
        listaPregleda: lista.sort((a, b) =>
          a.klinikaN.localeCompare(b.klinikaN)
        )
      });
    } else if (sortBy === "klinikaDown") {
      console.log("klinika");
      this.setState({
        listaPregleda: lista.sort((b, a) =>
          a.klinikaN.localeCompare(b.klinikaN)
        )
      });
    } else if (sortBy === "lekarUp") {
      console.log("lekar");
      this.setState({
        listaPregleda: lista.sort((a, b) =>
          a.lekarIme.localeCompare(b.lekarIme)
        )
      });
    } else if (sortBy === "lekarDown") {
      console.log("lekar");
      this.setState({
        listaPregleda: lista.sort((b, a) =>
          a.lekarIme.localeCompare(b.lekarIme)
        )
      });
    } else if (sortBy === "cenaUp") {
      console.log("cena");

      this.setState({
        listaPregleda: lista.sort((a, b) => a.cena - b.cena)
      });
    } else if (sortBy === "cenaDown") {
      console.log("cena");

      this.setState({
        listaPregleda: lista.sort((a, b) => b.cena - a.cena)
      });
    } else if (sortBy === "popustUp") {
      console.log("popust");

      this.setState({
        listaPregleda: lista.sort((a, b) => a.popust - b.popust)
      });
    } else if (sortBy === "popustDown") {
      console.log("popust");

      this.setState({
        listaPregleda: lista.sort((a, b) => b.popust - a.popust)
      });
    }
  }
  promenjenOdabirPregleda = e => {
    console.log("promenjen odabrir");
    console.log(e.currentTarget.value);
    const lista = this.state.listaPregleda;
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].id == e.currentTarget.value) {
        this.setState({
          izabranPregled: e.currentTarget.value,
          izabraniLekar: lista[i].lekarID,
          izabranaKlinika: lista[i].klinikaID,
          izabraniDatum: lista[i].datum,
          izabranaCena: lista[i].cena,
          izabraniTipPregleda: lista[i].tipPregledaID

          // izabraniPopust:lista[i].popust
        });
      }
    }
    console.log(this.state);
  };
  odabranPrelged = e => {
    //treba redirektovati na pretragu i filtriranje lekara
    e.preventDefault();
    console.log(this.state.izabranPregled);
    const ol = this.state.izabranPregled;
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    var t = 0;
    if (
      moment(this.state.izabraniDatum)
        .format("HH:mm")
        .valueOf() == "09:00"
    ) {
      console.log("9");
      t = 9;
    } else if (
      moment(this.state.izabraniDatum)
        .format("HH:mm")
        .valueOf() == "11:00"
    ) {
      console.log("11");
      t = 11;
    } else if (
      moment(this.state.izabraniDatum)
        .format("HH:mm")
        .valueOf() == "13:00"
    ) {
      console.log("13");
      t = 13;
    } else if (
      moment(this.state.izabraniDatum)
        .format("HH:mm")
        .valueOf() == "15:00"
    ) {
      console.log("15");
      t = 15;
    }
    if (ol != 0 && ol != undefined) {
      axios

        .post(
          "http://localhost:8025/api/pregledi/newST",
          {
            lekarID: this.state.izabraniLekar,
            klinikaID: this.state.izabranaKlinika,
            tipPregledaID: this.state.izabraniTipPregleda,
            pacijentEmail: this.state.email,
            cena: this.state.izabranaCena,
            datum: this.state.izabraniDatum,
            termin: t
          },
          config
        )
        .then(response => {
          console.log("PREGLED");
          console.log(response);
          this.setState(
            {
              redirectNext: true,
              flag: 1,
              canClick: true
            },
            () => {
              this.props.handleClick("ZAHTEV JE POSLAT");
            }
          );
        })
        .catch(error => {
          console.log("greska pregled");
          console.log(error.response);
        });
    } else {
      this.setState(
        {
          formError: "Odaberite Pregled"
        },
        () => console.log(this.state.formError)
      );
    }
  };
  listaUnapredDefinisanihPregleda() {
    let res = [];
    console.log("lista kl");

    const pretraga = this.state.pretraziPoljeKlinika;
    // const oc = this.state.ocenaKlinike;
    // console.log(oc);
    // if ((pretraga == "" || pretraga == undefined) && oc < 5) {
    let lista = this.state.listaPregleda;

    if (pretraga == "" || pretraga == undefined) {
      for (var i = 0; i < lista.length; i++) {
        res.push(
          <tr key={i}>
            <td>
              <input
                name="odabranPregled"
                type="radio"
                value={lista[i].id}
                checked={this.state.izabranPregled == lista[i].id}
                onChange={e => {
                  this.promenjenOdabirPregleda(e);
                }}
              ></input>
            </td>

            <td key={lista[i].datum}>
              {moment(lista[i].datum).format("DD.MM.YYYY.")} {lista[i].termin}h
            </td>
            <td key={lista[i].tipPregledaId}>{lista[i].tipPregledaN}</td>
            <td key={lista[i].klinikaId}>{lista[i].klinikaN}</td>
            <td key={lista[i].lekarId}>
              {lista[i].lekarIme} {lista[i].lekarPrezime}
            </td>

            <td key={lista[i].cena}>{lista[i].cena} RSD</td>
            <td key={lista[i].popust}>{lista[i].popust}%</td>
          </tr>
        );
      }
    } else {
      for (var i = 0; i < lista.length; i++) {
        if (lista[i].klinikaN.toLowerCase().includes(pretraga.toLowerCase())) {
          res.push(
            <tr key={i}>
              <td>
                <input
                  name="odabranPregled"
                  type="radio"
                  value={lista[i].id}
                  checked={this.state.izabranPregled == lista[i].id}
                  onChange={e => {
                    this.promenjenOdabirPregleda(e);
                  }}
                ></input>
              </td>

              <td key={lista[i].datum}>
                {moment(lista[i].datum).format("DD.MM.YYYY.")}  {lista[i].termin}h
              </td>
              <td key={lista[i].tipPregledaId}>{lista[i].tipPregledaN}</td>
              <td key={lista[i].klinikaId}>{lista[i].klinikaN}</td>
              <td key={lista[i].lekarId}>
                {lista[i].lekarIme} {lista[i].lekarPrezime}
              </td>

              <td key={lista[i].cena}>{lista[i].cena} RSD</td>
              <td key={lista[i].popust}>{lista[i].popust}%</td>
            </tr>
          );
        }
      }
    }

    // } else {
    //   console.log("===========");
    //   console.log(pretraga);
    //   let lista = this.state.listaKlinika;

    //   for (var i = 0; i < lista.length; i++) {
    //     var naziv = lista[i].naziv;
    //     var adresa = lista[i].adresa;
    //     var opis = lista[i].opis;
    //     var ocena = lista[i].ocena;
    //     if (
    //       naziv.toLowerCase().includes(pretraga.toLowerCase()) ||
    //       adresa.toLowerCase().includes(pretraga.toLowerCase()) ||
    //       opis.toLowerCase().includes(pretraga.toLowerCase())
    //     ) {
    //       if (oc <= ocena) {
    //         res.push(
    //           <tr key={i}>
    //             <td>
    //               <input
    //                 name="odabranaKlinika"
    //                 type="radio"
    //                 value={lista[i].id}
    //                 checked={this.state.izabranaKlinika == lista[i].id}
    //                 onChange={e => {
    //                   this.promenjenOdabirKlinike(e);
    //                 }}
    //               ></input>
    //             </td>
    //             <td key={lista[i].id}>{lista[i].id}</td>
    //             <td key={lista[i].naziv}>{lista[i].naziv}</td>
    //             <td key={lista[i].adresa}>{lista[i].adresa}</td>
    //             <td key={lista[i].opis}>{lista[i].opis}</td>
    //             <td key={lista[i].ocena}>{lista[i].ocena}</td>
    //           </tr>
    //         );
    //       }
    //     }
    //   }
    // }

    return res;
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
    console.log("On change !!!");
  };

  // handleSumbit = e => {
  //   e.preventDefault();
  //   console.log("KLIK SUBMITTT");
  //   // let formErrors = { ...this.state.formErrors };
  //   console.log("Izmjena : ---------------");
  //   console.log(this.state.ime);
  //   console.log(this.state.prezime);
  //   axios
  //     .put("http://localhost:8025/api/pacijenti/update", {
  //       ime: this.state.ime,
  //       prezime: this.state.prezime,
  //       telefon: this.state.telefon,
  //       email: this.state.email,
  //       adresa: this.state.adresa,
  //       grad: this.state.grad,
  //       drzava: this.state.drzava,
  //       lbo: this.state.lbo
  //     })
  //     .then(response => {
  //       console.log(response.data);

  //       this.setState({
  //         ime: response.data.ime
  //       });

  //       this.setState({
  //         prezime: response.data.prezime
  //       });

  //       this.setState({
  //         telefon: response.data.telefon,
  //         adresa: response.data.adresa,
  //         grad: response.data.grad,
  //         drzava: response.data.drzava,
  //         lbo: response.data.lbo
  //       });

  //       // this.setState({
  //       //   redirectToReferrer: true
  //       // });
  //     })
  //     .catch(error => {
  //       console.log("Izmena nije uspela! ");
  //     });
  // };
  redirectReferer() {
    var flag = 1;
    if (this.state.redirectNext == true) {
      return (
        <Route
          path="/registration"
          render={props => (
            <BrzoZakazivanje
              {...props}
              flag={flag}
              izabranPregled={this.state.izabranaKlinika}
            />
          )}
        >
          <Redirect from="/" to="/pacijent/klinikePacijenta" />
        </Route>
      );
    }
  }

  render() {
    const email = this.state.email;
    const uloga = this.state.uloga;
    if (this.state.flag == 0) {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
              <div>
              <h5>
                <input
                  placeholder="Pretrazi po klinikama"
                  type="text"
                  aria-label="Search"
                  name="pretraziPoljeKlinika"
                  onChange={this.handleChange}
                  value={this.state.pretraziPoljeKlinika}
                />
            </h5>
              </div>
                <Card
                  ctTableFullWidth
                  ctTableResponsive
                  title="Izaberi pregled"
                  content={
                    <div>
                      {/* <NavDropdown
                        onSelect={e => {
                          this.sortMyArray(e);
                        }}
                        title="Sortiraj"
                        id="nav-item dropdown"
                      >

                        <MenuItem eventKey={"tipPregleda"}>
                          Tip pregleda
                        </MenuItem>
                        <MenuItem eventKey={"klinika"}>Klinika</MenuItem>
                        <MenuItem eventKey={"lekarI"}>Lekar Ime</MenuItem>
                        <MenuItem eventKey={"lekarP"}>Lekar Prezime</MenuItem>
                        <MenuItem eventKey={"cenar"}>Cena rastuce</MenuItem>
                        <MenuItem eventKey={"cenao"}>Cena opadajuce</MenuItem>
                        <MenuItem eventKey={"popustr"}>Popust rastuce</MenuItem>
                        <MenuItem eventKey={"popusto"}>
                          Popust opadajuce
                        </MenuItem>
                      </NavDropdown> */}

                      <Table striped responsive hover style={{ width: 800 }}>
                        <thead className="thead-dark">
                          <tr>
                            <th></th>
                            <th id="Datum">
                              Datum
                              <i
                                onClick={e => {
                                  this.handleSortKlinika("datumUp");
                                }}
                                style={{
                                  cursor: "pointer"
                                }}
                                className="pe-7s-angle-up"
                              />
                              <i
                                onClick={e => {
                                  this.handleSortKlinika("datumDown");
                                }}
                                style={{
                                  cursor: "pointer"
                                }}
                                className="pe-7s-angle-down"
                              />
                            </th>
                            <th id="Tip pregleda">
                              {" "}
                              Tip pregleda
                              <i
                                onClick={e => {
                                  this.handleSortKlinika("tipPregledaUp");
                                }}
                                style={{
                                  cursor: "pointer"
                                }}
                                className="pe-7s-angle-up"
                              />
                              <i
                                onClick={e => {
                                  this.handleSortKlinika("tipPregledaDown");
                                }}
                                style={{
                                  cursor: "pointer"
                                }}
                                className="pe-7s-angle-down"
                              />
                            </th>
                            <th id="Klinika">
                              Klinika
                              <i
                                onClick={e => {
                                  this.handleSortKlinika("klinikaUp");
                                }}
                                style={{
                                  cursor: "pointer"
                                }}
                                className="pe-7s-angle-up"
                              />
                              <i
                                onClick={e => {
                                  this.handleSortKlinika("klinikaDown");
                                }}
                                style={{
                                  cursor: "pointer"
                                }}
                                className="pe-7s-angle-down"
                              />
                            </th>
                            <th id="Lekar">
                              Lekar
                              <i
                                onClick={e => {
                                  this.handleSortKlinika("lekarUp");
                                }}
                                style={{
                                  cursor: "pointer"
                                }}
                                className="pe-7s-angle-up"
                              />
                              <i
                                onClick={e => {
                                  this.handleSortKlinika("lekarDown");
                                }}
                                style={{
                                  cursor: "pointer"
                                }}
                                className="pe-7s-angle-down"
                              />
                            </th>
                            <th id="Cena">
                              Cena
                              <i
                                onClick={e => {
                                  this.handleSortKlinika("cenaUp");
                                }}
                                style={{
                                  cursor: "pointer"
                                }}
                                className="pe-7s-angle-up"
                              />
                              <i
                                onClick={e => {
                                  this.handleSortKlinika("cenaDown");
                                }}
                                style={{
                                  cursor: "pointer"
                                }}
                                className="pe-7s-angle-down"
                              />
                            </th>
                            <th id="Popust">
                              Popust
                              <i
                                onClick={e => {
                                  this.handleSortKlinika("popustUp");
                                }}
                                style={{
                                  cursor: "pointer"
                                }}
                                className="pe-7s-angle-up"
                              />
                              <i
                                onClick={e => {
                                  this.handleSortKlinika("popustDown");
                                }}
                                style={{
                                  cursor: "pointer"
                                }}
                                className="pe-7s-angle-down"
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody>{this.listaUnapredDefinisanihPregleda()}</tbody>
                      </Table>

                      {this.redirectReferer}
                    </div>
                  }
                />
                <form
                  onSubmit={e => {
                    this.odabranPrelged(e);
                  }}
                >
                  <Button
                    type="submit"
                    bsStyle="success"
                    // onClick={
                    //   this.state.canClick
                    //     ? this.props.handleClick("Zahtev je poslat!")
                    //     : null
                    // }
                  >
                    Zakazi
                  </Button>
                  <h5>
                    {(this.state.izabranPregled == undefined ||
                      this.state.izabranPregled == 0) && (
                      <span className="errorMessage">
                        {this.state.formError}
                      </span>
                    )}
                  </h5>
                </form>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    } else if (this.state.flag == 1) {
      return <Redirect from="/" to="/pacijent/pocetnaStranica" />;
    }
    //   return (
    //     <div className="content">
    //       <Grid fluid>
    //         <Row>
    //           <Col md={10}>
    //             <Card
    //               title="Zahtev za pregled je uspesno poslat!"
    //               content={
    //                 <h3 className="successMessage">
    //                   Potvrdite zahtev za pregled preko E-maila!
    //                 </h3>
    //               }
    //             />
    //           </Col>
    //         </Row>
    //       </Grid>
    //     </div>
    //   );
    // }
  }
}

export default BrzoZakazivanje;
