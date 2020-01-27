import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import "klinickiCentar.css";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Dialog from 'react-bootstrap-dialog';
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import moment from 'moment';
import ListaSala from "./ListaSala.jsx";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
class ListaZahtevaPregled extends Component {
  constructor(props) {
    super(props);
    console.log("LISTA ZAHTJEVA ZA PREGLED");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      token: props.token,
      idKlinike: "",
      redirectToListaSala: false,
      listaZahtevaZaOregled: [], 
      
      salaN: "", 
      salaBR: "",
      datumPregleda: "",
      idPregleda: "",

    };
    this.listaZahtevaZaPregled = this.listaZahtevaZaPregled.bind(this);

   
  }

  ucitajPonovo(){
    const url1 =
      "http://localhost:8025/api/pregledi/listaZahtevaZaRegistraciju/" +
      this.state.email;

    console.log(url1);
    axios
      .get(url1)
      .then(response => {
        console.log("URL zahtevi za reg");
        console.log(response);
        this.setState({
          listaZahtevaZaRegistraciju: response.data
        });
      })
      .catch(error => {
        console.log("nije uspeo url1");
        console.log(error);
      });
  }
  handleClickDodeliSalu = e => {
    e.preventDefault();
    console.log("CLICK *** ");  
    console.log("Dodijeli salu pregledu sa id-em: " + e.target.id);
    // this.props.onClick(this.props.value);
    // console.log(e.lista.email);
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    const urlPRegled = 'http://localhost:8025/api/pregledi/' +  e.target.id;    
    axios.get(urlPRegled, config)
      .then(pregled => {
        console.log("*******************************Preuzeti PREGLEDDDDD");
        console.log(pregled.data);

        this.setState({
            // idKlinike: klinika.data.id,
            datumPregleda: pregled.data.datum,
            salaN: pregled.data.salaN,
            salaBR: pregled.data.salaBR,
         
        }, () => {console.log(pregled.data); 
          console.log(moment(pregled.data.datum).format("DD.MM.YYYY"))
         
          console.log(this.state.salaN);
        });
          
        console.log("*******************************Preuzeti PREGLEDDDDD");
        console.log(pregled.data);
        console.log(pregled.data.salaN);
        console.log(pregled.data.salaBR);
        console.log(moment(pregled.data.datum).format("DD.MM.YYYY"));

      })
   

    this.setState({
      redirectToListaSala: true,
      idPregleda: e.target.id,
  
    });
    console.log("----------------------------------------------------");

  };
  componentWillMount(){
    console.log("wmount")
    console.log("Preuzimanje admina klinike.....")
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    const url = 'http://localhost:8025/api/adminKlinike/getAdminKlinikeByEmail';
    axios.get(url, config)
      .then(Response => {
        console.log("Preuzet admin klinike: ");
        console.log(Response.data);

        this.setState({
          email: Response.data.email,
        //   ime: Response.data.ime,
        //   prezime: Response.data.prezime,
        //   telefon: Response.data.telefon,
         idKlinike: Response.data.idKlinike,
        }, () => {
          console.log("Ucitaj mi kliniku sa id " + this.state.idKlinike);
          console.log("ucitaj mi kliniku");
          const urlKlinike = 'http://localhost:8025/api/pregledi/preuzmiZahtevePregledaKlinike/' + this.state.idKlinike;    
          axios.get(urlKlinike, config)
            .then(k => {
              console.log("Preuzeti zahtjevi");
              console.log(k.data);
     
              this.setState({
                  // idKlinike: klinika.data.id,
                  listaZahtevaZaOregled: k.data,
               
              });
                
           
              })
        });


        
      
      })
      
      .catch(error => {
        console.log("Administrator klinike  nije preuzet")
      })
      console.log("************* ID KLINIKE JE:" + this.state.idKlinike);

    
  }
  handleChange = e => {
    e.preventDefault();
    
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
    console.log("On change !!!");
  };
 
  handleOdobren = e => {
    e.preventDefault();
    console.log(e.target.id);
    const url2 = "http://localhost:8025/api/administratoriKC/potvrda/" + e.target.id;
    axios
    .post(url2, {})
    .then(response => {
      console.log("ODOBRENOOOO");
      console.log(response);
      this.ucitajPonovo();
    })
    .catch(error => {
        console.log(error.response);
    });

  };
  handleOdbijen = e => {
    
    e.preventDefault();
    let zaKoga = e.target.id;
    let raz = "Bez razloga";
    this.setState({
      za : zaKoga
    })
    this.setState({
      razlogOdbijanja : raz
    })
    console.log("--------------------------------");

    this.dialog.show({
      title: 'Odbijanje zahteva za registraciju',
      body: [
        <form className="formaZaSlanjeRazlogaOdbijanja">
          <div className="za">
            <label className="zaLabel" htmlFor="za">Za: </label>
            <input className="zaLabel"
              type="text"
              name="za"
              value = {zaKoga}
              disabled="disabled"
              // defaultValue= {za}
              // placeholder={this.state.ime}
              // noValidate
              // onChange={this.handleChange}
            />
          </div>
          <div className="razlogOdbijanja" >
            <label className="razlogOdbijanjaLabel" htmlFor="razlogOdbijanja">Razlog odbijanja: </label>
            <input className="razlogOdbijanjaLabel"
              type="text"
              name="razlogOdbijanja"
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
          console.log(this.state.za);
          console.log(this.state.razlogOdbijanja);
          const url3 = "http://localhost:8025/api/administratoriKC/odbijanje/" + this.state.za + "/" + this.state.razlogOdbijanja;
          axios
            .post(url3, {})
            .then(response => {
              console.log("Odbijanje uspelo! ");
              console.log(response.data);
              this.ucitajPonovo();

            })
            .catch(error => {
              console.log("Odbijanje nije uspelo! ");
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

  listaZahtevaZaPregled() {
    let res = [];
    console.log("lista kl");
    const odbij = <Tooltip id="remove_tooltip">Odbij</Tooltip>;
    const potvrdi = <Tooltip id="remove_tooltip">Potvrdi</Tooltip>;

    // const pretraga = this.state.pretraziPoljeKlinika;
    // const oc = this.state.ocenaKlinike;
    // console.log(oc);
    // if ((pretraga == "" || pretraga == undefined) && oc < 5) {
    let lista = this.state.listaZahtevaZaOregled;

    for (var i = 0; i < lista.length; i++) {

      console.log(lista[i]);
      if (lista[i].salaN == "" || lista[i].salaN == undefined) {
        res.push(
          <tr key={i}>
            
            <td key={lista[i].lekarID}>
              {lista[i].imeL} {lista[i].prezimeL}
            </td>
            <td key={lista[i].nazivTP}>{lista[i].nazivTP}</td>
        <td>  {moment(lista[i].datum).format("DD.MM.YYYY")}</td>
            <td key={lista[i].cena}>{lista[i].cena} RSD</td>
        <td>{lista[i].imeP} {lista[i].prezimeP}</td>
        <td>
                <Button id={lista[i].id} onClick={e => this.handleClickDodeliSalu(e)}> 
                  Dodeli salu
                </Button>  
              </td>
        {/* <td key={lista[i].salaID}>{lista[i].salaN} {lista[i].salaBR}</td> */}
            {/* <td align={"center"}>
              <i className="pe-7s-clock text-warning" />
            </td>
            <td align={"center"}>
              <i className="pe-7s-clock text-warning" />
            </td> */}
            {/* <td></td>
            <td></td> */}
          </tr>
        );
      } else {
        if (lista[i].status == 1) {
          res.push(
            <tr key={i}>
              <td key={lista[i].nazivKl}>{lista[i].nazivKl}</td>
              <td key={lista[i].lekarID}>
                {lista[i].imeL} {lista[i].prezimeL}
              </td>
              <td key={lista[i].nazivTP}>{lista[i].nazivTP}</td>
              <td>  {moment(lista[i].datum).format("DD.MM.YYYY")}</td>
              <td key={lista[i].cena}>{lista[i].cena} RSD</td>

              <td align={"center"} key={lista[i].status}>
                {" "}
                <i className="pe-7s-check text-success" />
              </td>
              {/* <td key={lista[i].sala}>
                {lista[i].salaN} {lista[i].salaBR}
              </td> */}
              <td></td>
              <td></td>
            </tr>
          );
        } else if (lista[i].status == 0) {
          console.log("LISTAAAAAAA PREGLEDAAA");
          console.log(lista[i].id);
          res.push(
            <tr key={i}>
              <td key={lista[i].lekarID}>
              {lista[i].imeL} {lista[i].prezimeL}
            </td>
            <td key={lista[i].nazivTP}>{lista[i].nazivTP}</td>
            <td>  {moment(lista[i].datum).format("DD.MM.YYYY")}</td>
            <td key={lista[i].cena}>{lista[i].cena} RD</td>
            <td >
                {lista[i].imeP} {lista[i].prezimeP}
            </td>
            {/* <td key={lista[i].salaID}>{lista[i].salaN} {lista[i].salaBR}</td> */}
              {/* <td key={lista[i].status} align={"center"}>
                <i className="pe-7s-timer text-warning" />
              </td> */}
              {/* <td key={lista[i].sala}>
                {lista[i].salaN} {lista[i].salaBR}{" "}
              </td> */}
              {/* <td>
                <OverlayTrigger placement="top" overlay={potvrdi}>
                  <Button
                    bsStyle="success"
                    simple
                    type="button"
                    bsSize="sm"
                    value={lista[i].id}
                    onClick={e => this.handleOdobren(e)}
                  >
                    <i className="pe-7s-check text-success" />
                  </Button>
                </OverlayTrigger>
              </td> */}
              {/* <td>
                <OverlayTrigger placement="top" overlay={odbij}>
                  <Button
                    bsStyle="danger"
                    simple
                    type="button"
                    bsSize="sm"
                    value={lista[i].id}
                    onClick={e => this.handleOdbijen(e)}
                  >
                    <i className="pe-7s-close-circle text-danger" />
                  </Button>
                </OverlayTrigger>
              </td> */}
              <td>
                <Button id={lista[i].id} onClick={e => this.handleClickDodeliSalu(e)}> 
                  Dodeli salu
                </Button>  
              </td>
            </tr>
          );
        } else if (lista[i].status == 2) {
          res.push(
            <tr key={i}>
              <td key={lista[i].nazivKl}>{lista[i].nazivKl}</td>
              <td key={lista[i].lekarID}>
                {lista[i].imeL} {lista[i].prezimeL}
              </td>
              <td key={lista[i].nazivTP}>{lista[i].nazivTP}</td>
              <td>  {moment(lista[i].datum).format("DD.MM.YYYY")}</td>
              <td key={lista[i].cena}>{lista[i].cena} RSD</td>

              <td align={"center"} key={lista[i].status}>
                {" "}
                <i className="pe-7s-close-circle text-danger" />
              </td>
              {/* <td key={lista[i].sala}>
                {lista[i].salaN} {lista[i].salaBR}
              </td> */}
              <td></td>
              <td></td>
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
    //   }
    // }
    //   }
    // }

    return res;
  }

  render() {
    const redirectToListaSala = this.state.redirectToListaSala;
    // console.log("-----LISTA ZAHTJVEVA ZA PREGLED = PROVJERI PROPS")
    // console.log(this.state.salaN);
    // console.log(this.state.salaBR);
    // console.log(moment(this.state.datumPregleda).format("DD.MM.YYYY"));

    if (redirectToListaSala === true) {
      return (
        <BrowserRouter>
          <Switch>
            <Route
              path="/listaSala"
              // salaN={this.state.salaN} salaBR={this.state.salaBR}
              render={props => <ListaSala {...props} idKlinike={this.state.idKlinike}  datumPregleda={this.state.datumPregleda} redirectToListaSala={this.state.redirectToListaSala} token={this.state.token} />}
            />
            <Redirect from="/" to="/listaSala" />
          </Switch>
        </BrowserRouter>
      );
    }

    return (

      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Row>
                <Card
                  title="Lista zahteva za pregled"
                  // category="Here is a subtitle for this table"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th id="lekar">Lekar</th>
                          <th id="tipP">tip pregleda</th>
                          <th>datum</th>
                          <th id="cijena"> cijena</th>
                          <th id="PrezimePacijenta">pacijent</th>
                        
                          {/* <th id="LozinkaPacijenta">Lozinka</th> */}
                          {/* <th id="sala">sala</th> */}
                          {/* <th id="prihvatiZ">odobri</th>
                          <th id="odbijZ">odbij</th> */}
                          {/* <th id="TelefonPacijenta">Telefon</th> */}
                          {/* {thArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })} */}
                        </tr>
                      </thead>
                      <tbody>{this.listaZahtevaZaPregled()}</tbody>
                    </Table>
                  }
                />
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ListaZahtevaPregled;
