import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import axios from "axios";
import "klinickiCentar.css";
import slikaKC from "assets/img/klinickiCentar.jpg";
import Button from "components/CustomButton/CustomButton.jsx";
import Dialog from 'react-bootstrap-dialog';
// import Form, { Input, Fieldset } from 'react-bootstrap-form';
// import { render } from 'react-dom';
// import ReactDOM from 'react-dom'

class KlinickiCentarPocetna extends Component {
  constructor(props) {
    super(props);
    console.log("ADMINISTRATOR KLINICKOG CENTRA");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      listaKlinika: [],
      listaAdministratoraKlinika: [],
      listaAdministratoraKC: [],
      kCentar: [],
      nazivNoveKlinike: "",
      adresaNoveKlinike: "",
      opisNoveKlinike: "",
      ocenaNoveKlinike: 0,
      imeNAK: "",
      prezimeNAK: "",
      emailNAK: "",
      lozinkaNAK: "",
      telefonNAK: null,
      klinikaNAK: null


    };
    this.listaKlinikaUKC = this.listaKlinikaUKC.bind(this);
    this.listaAdminaKlinikaUKC = this.listaAdminaKlinikaUKC.bind(this);
    this.listaAdminaUKC = this.listaAdminaUKC.bind(this);

    this.dodajKliniku = this.dodajKliniku.bind(this);
    this.dodajAdminaKlinike = this.dodajAdminaKlinike.bind(this);
    this.handleChange = this.handleChange.bind(this);

    console.log(this.state.uloga);
    console.log(this.state.email);
  }

  listaKlinika(){
    console.log("--------lista klinika u KC");

    const url1 = 'http://localhost:8025/api/administratoriKC/listaKlinika/' + this.state.email; 

    console.log(url1);
    axios
      .get(url1)
      .then(response => {
        console.log("URL 111");
        console.log(response);
        this.setState({
          listaKlinika: response.data
        });
      })
      .catch(error => {
        console.log("nije uspeo url1");
        console.log(error);
      });
  }
  listaAdministratoraKlinika(){
    console.log("--------lista administratora klinika u KC");
    const url2 = 'http://localhost:8025/api/administratoriKC/listaAdministratoraKlinika/' + this.state.email; 
    console.log(url2);
    axios.get(url2)
      .then(response => {
        console.log("url 22222");
        console.log(response);
        this.setState({
          listaAdministratoraKlinika: response.data
        });
      })
      .catch(error => {
          console.log("nije uspeo url2");
          console.log(error);
      })
  }
  listaAdministratora(){
    console.log("--------lista administratora KC");
    const url3 = 'http://localhost:8025/api/administratoriKC/svi'; 

    console.log(url3);
    axios
      .get(url3)
      .then(response => {
        console.log("URL 333");
        console.log(response);
        this.setState({
          listaAdministratoraKC: response.data
        });
      })
      .catch(error => {

          console.log("nije uspeo url3");
          console.log(error);
      })
  }
  podaciOKC(){
    console.log("--------Podaci o KC");
    const url4 = 'http://localhost:8025/api/administratoriKC/klinickiCentar/' + this.state.email; 
    console.log(url4);
      axios.get(url4)
  
        .then(response => {
          console.log("url 44444");
          console.log(response);
          this.setState({
            kCentar: response.data
          });
        })
        .catch(error => {
          console.log("nije uspeo url4");
          console.log(error);
        });
  }

  componentWillMount() {
    
    this.listaKlinika();
    this.listaAdministratoraKlinika();
    this.listaAdministratora();
    this.podaciOKC();
      
  }

  listaKlinikaUKC() {
    let res = [];
    let lista = this.state.listaKlinika;
    for (var i = 0; i < lista.length; i++) {
      res.push(
        <tr key = {i}>
          <td key={lista[i].id}>{lista[i].id}</td>
          <td key={lista[i].naziv}>{lista[i].naziv}</td>
          <td key={lista[i].adresa}>{lista[i].adresa}</td>
          <td key={lista[i].opis}>{lista[i].opis}</td>
          <td key={lista[i].ocena}>{lista[i].ocena}</td>
          <td ><Button type="submit">Izmeni</Button></td>
          <td ><Button type="submit">Obrisi</Button></td>
          {/* <td ><Button type="submit">Dodaj administratora</Button></td> */}
        </tr>
      );
    }
    return res;
  }
  listaAdminaKlinikaUKC() {
    let res = [];
    let lista = this.state.listaAdministratoraKlinika;
    for (var i = 0; i < lista.length; i++) {
      res.push(
        <tr key = {i}>
          <td key={lista[i].id}>{lista[i].id}</td>
          <td key={lista[i].ime}>{lista[i].ime}</td>
          <td key={lista[i].prezime}>{lista[i].prezime}</td>
          <td key={lista[i].email}>{lista[i].email}</td>
          <td ><Button type="submit">Izmeni</Button></td>
          <td ><Button type="submit">Obrisi</Button></td>
        </tr>
      );
    }
    return res;
  }
  listaAdminaUKC() {
    let res = [];
    let lista = this.state.listaAdministratoraKC;
    for (var i = 0; i < lista.length; i++) {
      res.push(
        <tr key = {i}>
          <td key={lista[i].id}>{lista[i].id}</td>
          <td >{lista[i].ime}</td>
          <td >{lista[i].prezime}</td>
          <td key={lista[i].email}>{lista[i].email}</td>
          <td ><Button type="submit">Izmeni</Button></td>
          <td ><Button type="submit">Obrisi</Button></td>
        </tr>
      );
    }
    return res;
  }
  handleChange = e => {
    e.preventDefault();
    
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
    console.log("On change !!!");
  };

  dodajKliniku = e => {
    e.preventDefault();

    console.log("--------------------------------");
    this.dialog.show({
      title: 'Dodavanje nove klinike',
      body: [
      <form className="formaZaDodavanjeNoveKlinike">
         <h4>Uneti podatke o klinici:</h4>
          <div className="nazivNKlinike" >
            <label className="nazivNKlinikeLabel" htmlFor="nazivNoveKlinike">Naziv: </label>
            <input className="nazivNKlinikeInput"
              type="text"
              name="nazivNoveKlinike"
              defaultValue = "" 
              // defaultValue= {za}
              // placeholder={this.state.ime}
              // noValidate
              onChange={this.handleChange}
            />
          </div>
          <div className="adresaNKlinike" >
            <label className="adresaNKlinikeLabel" htmlFor="adresaNoveKlinike">Adresa: </label>
            <input
              className="adresaNKlinikeInput"
              type="text"
              name="adresaNoveKlinike"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          <div className="opisNKlinike" >
            <label className="opisNKlinikeLabela" htmlFor="opisNoveKlinike">Opis: </label>
            <input className="opisNKlinikeInput"
              type="text"
              name="opisNoveKlinike"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          <h4>Uneti podatke o administratoru klinike:</h4>
          <div className="imeNAK" >
            <label className="imeNAKLabela" htmlFor="imeNAK">Ime: </label>
            <input className="imeNAKInput"
              type="text"
              name="imeNAK"
              defaultValue = "" 
              // defaultValue= {za}
              // placeholder={this.state.ime}
              // noValidate
              onChange={this.handleChange}
            />
          </div>
          <div className="prezimeNAK" >
            <label className="prezimeNAKLabel" htmlFor="prezimeNAK">Prezime: </label>
            <input
              className="prezimeNAKInput"
              type="text"
              name="prezimeNAK"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          <div className="emailNAK" >
            <label className="emailNAKLabel" htmlFor="emailNAK">Email: </label>
            <input className="emailNAKInput"
              type="text"
              name="emailNAK"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          <div className="lozinkaNAK" >
            <label className="lozinkaNAKLabel" htmlFor="lozinkaNAK">Lozinka: </label>
            <input className="lozinkaNAKInput"
              type="text"
              name="lozinkaNAK"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          <div className="telefonNAK" >
            <label className="telefonNAKLabel" htmlFor="telefonNAK">Telefon: </label>
            <input className="telefonNAKInput"
              type="text"
              name="telefonNAK"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          {/* <div className="klinikaNAK" >
            <label className="klinikaNAKLabela" htmlFor="klinikaNAK">Klinika: </label>
            <input className="klinikaNAKInput"
              type="text"
              name="klinikaNAK"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div> */}
          

      </form> 
      ],
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          
          console.log('OK je kliknuto!');
          const url3 = "http://localhost:8025/api/administratoriKC/dodavanjeKlinike";
          axios
            .post(url3, {
              naziv : this.state.nazivNoveKlinike,
              adresa : this.state.adresaNoveKlinike,
              opis : this.state.opisNoveKlinike,
              ocena : this.state.ocenaNoveKlinike
              
            })
            .then(response => {
              console.log("Dodavanje uspelo! ");
              console.log(response.data);
              console.log(response.data.id);

              const url4 = "http://localhost:8025/api/administratoriKC/dodavanjeAdminaKlinike";
              axios
              .post(url4, {
                ime : this.state.imeNAK,
                prezime : this.state.prezimeNAK,
                email : this.state.emailNAK,
                lozinka : this.state.lozinkaNAK,
                telefon : this.state.telefonNAK,
                idKlinike : response.data.id
              })
              .then(odgovor => {
                console.log("--------Dodavanje uspelo! ");
                console.log(odgovor.data);
                this.listaKlinika();
                this.listaAdministratoraKlinika();
  
              })
              .catch(greska => {
                console.log("Dodavanje novog administratora klinike nije uspelo! ");
              });
              // this.dodajAdminaKlinike(e);
             
              

            })
            .catch(error => {
              console.log("Dodavanje nove klinike nije uspelo! ");
            });
        })
      ],
      bsSize: 'medium',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })
    
  }

  dodajAdminaKlinike = e => {
    e.preventDefault();

    console.log("--------------------------------");
    
    this.dialog.show({
      title: 'Dodavanje novog administratora klinike',
      body: [
         <form className="formaZaDodavanjeNovogAdministratoraKlinike">
         {/* <h3>Podaci o klinici</h3> */}
          <div className="imeNAK" >
            <label className="imeNAKLabela" htmlFor="imeNAK">Ime: </label>
            <input className="imeNAKInput"
              type="text"
              name="imeNAK"
              defaultValue = "" 
              // defaultValue= {za}
              // placeholder={this.state.ime}
              // noValidate
              onChange={this.handleChange}
            />
          </div>
          <div className="prezimeNAK" >
            <label className="prezimeNAKLabel" htmlFor="prezimeNAK">Prezime: </label>
            <input
              className="prezimeNAKInput"
              type="text"
              name="prezimeNAK"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          <div className="emailNAK" >
            <label className="emailNAKLabel" htmlFor="emailNAK">Email: </label>
            <input className="emailNAKInput"
              type="text"
              name="emailNAK"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          <div className="lozinkaNAK" >
            <label className="lozinkaNAKLabel" htmlFor="lozinkaNAK">Lozinka: </label>
            <input className="lozinkaNAKInput"
              type="text"
              name="lozinkaNAK"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          <div className="telefonNAK" >
            <label className="telefonNAKLabel" htmlFor="telefonNAK">Telefon: </label>
            <input className="telefonNAKInput"
              type="text"
              name="telefonNAK"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          <div className="klinikaNAK" >
            <label className="klinikaNAKLabela" htmlFor="klinikaNAK">Klinika: </label>
            <input className="klinikaNAKInput"
              type="text"
              name="klinikaNAK"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          
      </form> 
      ],
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          
          console.log('OK je kliknuto!');
          console.log("Poslat razlog : ---------------");
          // console.log(this.state.za);
          // console.log(this.state.razlogOdbijanja);
          const url4 = "http://localhost:8025/api/administratoriKC/dodavanjeAdminaKlinike";
          axios
            .post(url4, {
              ime : this.state.imeNAK,
              prezime : this.state.prezimeNAK,
              email : this.state.emailNAK,
              lozinka : this.state.lozinkaNAK,
              telefon : this.state.telefonNAK,
              idKlinike : this.state.klinikaNAK

              
            })
            .then(response => {
              console.log("Dodavanje uspelo! ");
              console.log(response.data);
              this.listaAdministratoraKlinika();

            })
            .catch(error => {
              console.log("Dodavanje novog administratora klinike nije uspelo! ");
            });
        })
      ],
      bsSize: 'medium',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })
    
  }

  render() {
    const kc = this.state.kCentar;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Row>
                <Card
                  className="listaKlinika"
                  title="Lista klinika"
                  // category="Here is a subtitle for this table"
                  
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <div>
                    <Button className="DodajKlinikuDugme"  onClick={e => this.dodajKliniku(e)}>Dodaj kliniku</Button>
                    <Dialog ref={(el) => { this.dialog = el }} ></Dialog>
                    <Table striped hover>
                      <thead>
                        <tr>
                          {/*                             
                            {listaKlinika.map((prop, key) => {
                              return <th key={key}>{prop}</th>;
                            })} */}
                          <th id="Id">Id</th>
                          <th id="Naziv">Naziv</th>
                          <th id="Adresa"> Adresa</th>
                          <th id="Opis">Opis</th>
                          <th id="Ocena">Ocena</th>
                        </tr>
                      </thead>
                      <tbody>{this.listaKlinikaUKC()}</tbody>
                    </Table>
                    </div>
                  }
                />
              </Row>
              <Row>
                <Card
                  title="Lista administratora klinika"
                  // category="Here is a subtitle for this table"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <div>
                      <Button className="DodajKlinikuDugme"  onClick={e => this.dodajAdminaKlinike(e)}>Dodaj administratora</Button>
                      <Dialog ref={(el) => { this.dialog = el }} ></Dialog>
                      <Table striped hover>
                        <thead>
                          <tr>
                            <th id="IdAdminaKlinike">Id</th>
                            <th id="ImeAdminaKlinike">Ime</th>
                            <th id="PrezimeAdminaKlinike"> Prezime</th>
                            <th id="EmailAdminaKlinike">Email</th>
                          
                          </tr>
                        </thead>
                        <tbody>
                          {this.listaAdminaKlinikaUKC()}
                        
                        </tbody>
                      </Table>
                    </div>
                  }
                />
              </Row>
              <Row>
                <Card
                  title="Lista administratora klinickog centra"
                  // category="Here is a subtitle for this table"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th id="IdAdminaKC">Id</th>
                          <th id="ImeAdminaKC">Ime</th>
                          <th id="PrezimeAdminaKC"> Prezime</th>
                          <th id="EmailAdminaKC">Email</th>
                          {/* {thArray.map((prop, key) => {
                              return <th key={key}>{prop}</th>;
                            })} */}
                        </tr>
                      </thead>
                      <tbody>
                        {this.listaAdminaUKC()}
                        {/* {tdArray.map((prop, key) => {
                            return (
                              <tr key={key}>
                                {prop.map((prop, key) => {
                                  return <td key={key}>{prop}</td>;
                                })}
                              </tr>
                            );
                          })} */}
                      </tbody>
                    </Table>
                  }
                />
              </Row>
              
            </Col>
            <Col md={4}>
              <Card
                // statsIcon="fa fa-clock-o"
                title="O klinickom centru"
                category={kc.naziv}
                content={
                  <div id="opisKlinickogCentra">
                    <div className="slikaKCdiv">
                      <h2>
                        <img className="slikaKC" src={slikaKC}></img>
                      </h2>
                    </div>

                    <div className="typo-line">
                      <h2>
                        <p className="category">Adresa</p>
                        <label className="adresaKC">{kc.adresa}</label>
                      </h2>
                    </div>
                    <div className="typo-line">
                      <h2>
                        <p className="category">Opis</p>
                        <label className="opisKC">{kc.opis}</label>
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

          {/* <Row>
              <Col md={6}>
                <Card
                  id="chartActivity"
                  title="2014 Sales"
                  category="All products including Taxes"
                  stats="Data information certified"
                  statsIcon="fa fa-check"
                  content={
                    <div className="ct-chart">
                      <ChartistGraph
                        data={dataBar}
                        type="Bar"
                        options={optionsBar}
                        responsiveOptions={responsiveBar}
                      />
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend(legendBar)}</div>
                  }
                />
              </Col>

              <Col md={6}>
                <Card
                  title="Tasks"
                  category="Backend development"
                  stats="Updated 3 minutes ago"
                  statsIcon="fa fa-history"
                  content={
                    <div className="table-full-width">
                      <table className="table">
                        <Tasks />
                      </table>
                    </div>
                  }
                />
              </Col>
            </Row> */}
        </Grid>
      </div>
    );
  }
}

export default KlinickiCentarPocetna;
