import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import "klinickiCentar.css";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import Dialog from 'react-bootstrap-dialog';
import IzmenaLekara from 'views/IzmenaProfila.jsx';
import "klinickiCentar.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

class SlobodniTermini extends Component {
  constructor(props) {
    super(props);
    console.log("LISTA PREGLEDA");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      idAdmina: "",
      idKlinike: "",
      listaLekara: [],
      listaKlinika: [], 
      emailLekara: "",
      imeLekara: "",
      prezimeLekara: "",
      lozinkaLekara: "",
      telefonLekara: "",
      klinikaLekara: 0,
      reirectToIzmeniLekar: false,
    };
     this.listaSalaK = this.listaSalaK.bind(this);
    // this.dodajLekara = this.dodajLekara.bind(this);
    // this.obrisiLekara = this.obrisiLekara.bind(this);
    // this.proslediKliniku = this.proslediKliniku.bind(this);

    // this.getKlinikaValue = this.getKlinikaValue.bind(this);

  }

  getKlinikaValue(){
    console.log('get klinika value');
    return this.state.idKlinike;
  }
  handleChange = e => {
    e.preventDefault();
    
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state);
    console.log("On change !!!");
  };

  // listaKlinikaIzbor(){
  //   let res = [];
    
  //   let lista = this.state.listaKlinika;

  //   for (var i = 0; i < lista.length; i++) {
  //     res.push(
  //       <option value={lista[i].id} >{lista[i].naziv}</option>
  //        //<MenuItem eventKey={lista[i].id}>{lista[i].naziv}</MenuItem>
  //     );
  //   }
  //   return res;
  // }
  proslediKliniku(klinika) {
    
    console.log("prosledjena klinika");

    console.log("I==================D" + klinika.target.value);
    console.log("-------------------------" + this.state.idKlinike);
    this.setState({
      klinikaLekara : klinika.target.value
      
    },() => console.log(this.state));
   


  };
  listaLekara() {
    console.log("Ponovo ispisi listu bez obrisanog lekara");
    console.log("!!!!!!!!!!!!!!!11111 ID KL " + this.state.idKlinike);
    
        console.log("ID KLINIKE OD KOJE TRAZIM LEKARE: " + this.state.idKlinike);
        console.log("ucitaj mi kliniku");
        const urlKlinike = 'http://localhost:8025/api/klinike/listaLekaraKlinika/' + this.state.idKlinike;    
        axios.get(urlKlinike)
          .then(klinika => {
            console.log("Preuzeta klinika");
            console.log(klinika.data);
   
            this.setState({
                idKlinika: klinika.data.id,
                listaLekara: klinika.data,
             
            });
       
          })
      

  }

obrisiLekara = e => {
  e.preventDefault();
  console.log("CLick brisanje lekara");
  console.log("LLL: " + e.target.id);
  console.log("--------------------------------");
  const url6 = "http://localhost:8025/api/klinike/brisanjeLekara";
        axios
          .post(url6, {
            email : e.target.id
            
          })
          .then(response => {
            console.log("Brisanje lekara uspelo! ");
            console.log(response.data);
            this.listaLekara();

          })
          .catch(error => {
            console.log("Brisanje leka nije uspelo! ");
          });

}

componentWillMount(){
    console.log("wmount")
    console.log("Preuzimanje admina klinike.....")
    const url = 'http://localhost:8025/api/adminKlinike/getAdminKlinikeByEmail/' + this.state.email;
    axios.get(url)
      .then(Response => {
        console.log("Preuzet admin klinike: ");
        console.log(Response.data);

        this.setState({
          email: Response.data.email,
        //   ime: Response.data.ime,
        //   prezime: Response.data.prezime,
        //   telefon: Response.data.telefon,
        idKlinike: Response.data.idKlinike,
        });
        console.log("Ucitaj mi kliniku sa id " + this.state.idKlinike);
        console.log("ucitaj mi kliniku");
        const urlKlinike = 'http://localhost:8025/api/klinike/listaLekaraKlinika/' + this.state.idKlinike;    
        axios.get(urlKlinike)
          .then(klinika => {
            console.log("Preuzeta klinika");
            console.log(klinika.data);
   
            this.setState({
                // idKlinike: klinika.data.id,
                listaLekara: klinika.data,
             
            });
                console.log("++++++++++++++++++ Id k: " + this.state.idKlinike);
         
                console.log("Preuzmi mi sale za tu kliniku");
                const urlKlinike = 'http://localhost:8025/api/pregledi/preuzmiPregledeKlinike/' + this.state.idKlinike;    
                 axios.get(urlKlinike)
                    .then(klinika => {
                        console.log("Preuzeta lista klinika");
                        console.log(klinika.data);
            
                        this.setState({
                            // idKlinike: klinika.data.id,
                            listaLekara: klinika.data,
                        
                        });
         
                 })
         
            })
      
      })
      
      .catch(error => {
        console.log("Administrator klinike  nije preuzet")
      })
      console.log("************* ID KLINIKE JE:" + this.state.idKlinike);

    
  }
 
  onDropdownSelected(e) {
    console.log("THE VAL", e.target.value);
    //here you will see the current selected value of the select input
}
  dodajLekara = e => {
    e.preventDefault();

    console.log("--------------------------------");
    this.dialog.show({
      title: 'Dodavanje novog lekara',
      body: [
      <form className="formaZaDodavanjeNovogLekara">
         
          <div className="imeLekara" >
            <label className="lekarImeLabel" htmlFor="imeLekara">Ime: </label>
            <input className="lekarImeLabel"
              type="text"
              name="imeLekara"
              defaultValue = "" 
              onChange={this.handleChange}
            />
          </div>
          <div className="prezimeLekara" >
            <label className="lekarPrezimeLabel" htmlFor="prezimeLekara">Prezime: </label>
            <input className="lekarPrezimeLabel"
              type="text"
              name="prezimeLekara"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          <div className="telefonLekara" >
            <label className="lekarTelefonLabel" htmlFor="telefonLekara">Telefon: </label>
            <input className="lekarTelefonLabel"
              type="text"
              name="telefonLekara"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          <div className="emailLekara" >
            <label className="lekarMailLabel" htmlFor="emailLekara">Email: </label>
            <input className="lekarMailLabel"
              type="text"
              name="emailLekara"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          <div className="lozinkaLekara" >
            <label className="lekarLozinkaLabel" htmlFor="lozinkaLekara">Lozinka: </label>
            <input className="lekarLozinkaLabel"
              type="password"
              name="lozinkaLekara"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          {/* <div className="klinikaLekara" >
            <label className="lekarKlinikaLabel" htmlFor="lekarKlinika">Klinika: </label>
            <div>
            <select name="odabirKlinike"  onChange={e => {this.proslediKliniku(e)}}>
            {this.listaKlinikaIzbor()} 
            
            </select>
          </div>
          </div> */}
      </form> 
      ],
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          
          console.log('OK je kliknuto!');

          const url3 = "http://localhost:8025/api/adminKlinike/dodavanjeLekara";
          axios
            .post(url3, {
              ime: this.state.imeLekara,
              prezime: this.state.prezimeLekara,
              telefon: this.state.telefonLekara,
              lozinka: this.state.lozinkaLekara,
              email: this.state.emailLekara,
              klinikaID: this.state.idKlinike,
            })
            .then(response => {
              
              console.log("Dodavanje lekra je uspjelo! ");
              console.log(response.data);
              this.listaLekara();

            })
            .catch(error => {
              console.log("Dodavanje novog lekaara nije uspjelo! ");
              console.log("+++++++++++" + this.state.idKlinike);
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
handleIzmeni = e => {
    e.preventDefault();
    console.log(e.target.id);
    console.log("handle IZMENIIII LEKARA")
    this.setState({
      reirectToIzmeniLekar: true,
      emailLekara: e.target.id,
    });
    // const url2 = "http://localhost:8025/api/lekari/update/" + e.target.id;
    // axios
    // .post(url2, {})
    // .then(response => {
    //   console.log("ODOBRENOOOO");
    //   console.log(response);
    //   this.ucitajPonovo();
    // })
    // .catch(error => {
    //     console.log(error.response);
    // });

  };

 

  listaSalaK() {
    let res = [];
    let lista = this.state.listaLekara;

    for (var i = 0; i < lista.length; i++) {
      
      res.push(

        <tr key={i}>
       
         
          <td>{lista[i].datum}</td>
          <td>{lista[i].tipPregledaID}</td>
        
       
          <td>{lista[i].telefon}</td>   
        <td >
             <Button  id={lista[i].id} onClick={e => this.obrisiLekara(e)}>Obrisi</Button>
             <Dialog ref={(el) => { this.dialog = el }} ></Dialog>     
       </td>
         <td>
            <Button className="OdobrenZahtev" id={lista[i].id} onClick={e => this.handleIzmeni(e)}>
              Izmeni
            </Button>
          </td>
 
        </tr>
      );
    }
    return res;
  }

  render() {
//     const lista = this.state.listaKlinika;
//     const reirectToIzmeniLekar = this.state.reirectToIzmeniLekar;
//    console.log("LEKARRRRRRR : "  + this.state.emailLekara);
//    const emailLekara = this.state.emailLekara;
//     if (reirectToIzmeniLekar === true) {
//       return (
//         <BrowserRouter>
//           <Switch>
//             <Route
            
//               path="/izmenaProfilaLekara"
//               render={props => <IzmenaProfila {...props} email={emailLekara} />}
//             />
//             <Redirect from="/" to="/izmenaProfilaLekara" />
//           </Switch>
//         </BrowserRouter>
//       );
//    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <Row>
                <Card
                  title="Lista sala klinike"
                  // category="Here is a subtitle for this table"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <div>
                    <Button className="DodajKlinikuDugme"  onClick={e => this.dodajLekara(e)}>Dodaj lekara</Button>
                    <Dialog ref={(el) => { this.dialog = el }} ></Dialog>
                    
                   
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th id="IdPacijenta">Datum</th>
                          <th id="ImePacijenta">Tip</th>
      
                  
                        </tr>
                      </thead>
                      <tbody>{this.listaSalaK()}</tbody>
                    </Table>
                    </div>
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

export default SlobodniTermini;