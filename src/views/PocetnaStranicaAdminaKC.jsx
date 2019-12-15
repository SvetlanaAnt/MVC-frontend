import React, { Component } from "react";
import { Grid, Row, Col, Table, NavItem, Nav, NavDropdown, MenuItem  } from "react-bootstrap";
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
      //za dodavanje nove klinike
      nazivNoveKlinike: "",
      adresaNoveKlinike: "",
      opisNoveKlinike: "",
      ocenaNoveKlinike: 0,
      //za izmenu postojece klinike
      idIzmenjeneKlinike: 0,
      nazivIzmenjeneKlinike: "",
      adresaIzmenjeneKlinike: "",
      opisIzmenjeneKlinike: "",
      ocenaIzmenjeneKlinike: 0,
      //za dodavanje novog administratora klinike
      imeNAK: "",
      prezimeNAK: "",
      emailNAK: "",
      lozinkaNAK: "",
      telefonNAK: "",
      klinikaNAK: 0,
      //za izmenu postojeceg administratora klinike
      imeIzmenjenogAK: "",
      prezimeIzmenjenogAK: "",
      emailIzmenjenogAK: "",
      lozinkaIzmenjenogAK: "",
      telefonIzmenjenogAK : "",
      klinikaIzmenjenogAK : 0,
      menjanjeLozinke: "password",
      is_checked: false,
      //za dodavanje novog administratora klinickog centra
      imeNAKC: "",
      prezimeNAKC: "",
      emailNAKC: "",
      lozinkaNAKC: "",
      //za izmenu postojeceg admina klinickog centra
      idIzmenjenogAKC: 0,
      imeIzmenjenogAKC: "",
      prezimeIzmenjenogAKC: "",
      emailIzmenjenogAKC: "",
      lozinkaIzmenjenogAKC: ""


    };
    this.listaKlinikaUKC = this.listaKlinikaUKC.bind(this);
    this.listaAdminaKlinikaUKC = this.listaAdminaKlinikaUKC.bind(this);
    this.listaAdminaUKC = this.listaAdminaUKC.bind(this); 

    this.handleChange = this.handleChange.bind(this);

    this.dodajKliniku = this.dodajKliniku.bind(this);
    this.dodajAdminaKlinike = this.dodajAdminaKlinike.bind(this);
    this.dodajAdminaKC = this.dodajAdminaKC.bind(this);

    this.listaKlinikaIzbor = this.listaKlinikaIzbor.bind(this);
    this.proslediKliniku = this.proslediKliniku.bind(this);

    this.izmeniKliniku = this.izmeniKliniku.bind(this);
    this.izmeniAdminaKlinike = this.izmeniAdminaKlinike.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.izmeniAdminaKC = this.izmeniAdminaKC.bind(this);

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
          <td >{lista[i].id}</td>
          <td >{lista[i].naziv}</td>
          <td >{lista[i].adresa}</td>
          <td >{lista[i].opis}</td>
          <td >{lista[i].ocena}</td>
          <td >
          <Button id={lista[i].id} onClick={e => this.izmeniKliniku(e)}>Izmeni</Button>
          <Dialog ref={(el) => { this.dialog = el }} ></Dialog>
          </td>
          {/* <td ><Button type="submit">Obrisi</Button></td> */}
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
          <td>{lista[i].id}</td>
          <td >{lista[i].ime}</td>
          <td >{lista[i].prezime}</td>
          <td >{lista[i].email}</td>
          <td > 
          <Button id={lista[i].email} onClick={e => this.izmeniAdminaKlinike(e)}>Izmeni</Button>
          <Dialog ref={(el) => { this.dialog = el }} ></Dialog>
          </td>
          {/* <td ><Button type="submit">Obrisi</Button></td> */}
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
          <td >{lista[i].id}</td>
          <td >{lista[i].ime}</td>
          <td >{lista[i].prezime}</td>
          <td key={lista[i].email}>{lista[i].email}</td>
          <td >
          <Button id={lista[i].email} onClick={e => this.izmeniAdminaKC(e)} >Izmeni</Button>
          <Dialog ref={(el) => { this.dialog = el }} ></Dialog>
          </td>
          
          {/* <td ><Button type="submit">Obrisi</Button></td> */}
        </tr>
      );
    }
    return res;
  };
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
    
  };
  listaKlinikaIzbor(){
    let res = [];
    let lista = this.state.listaKlinika;

    for (var i = 0; i < lista.length; i++) {
      res.push(
        <option value={lista[i].id} >{lista[i].naziv}</option>
      );
    }
    return res;
  }
  proslediKliniku(klinika) {
    
    console.log("prosledjena klinika");

    console.log(klinika.target.value);

    this.setState({
      klinikaNAK : klinika.target.value,
      // klinikaIzmenjenogAK : klinika.target.value
      
    },() => console.log(this.state.klinikaNAK));
  
  };
  proslediKlinikuIzmena(klinika) {
    
    console.log("prosledjena klinika");

    console.log(klinika.target.value);

    this.setState({
      // klinikaNAK : klinika.target.value,
      klinikaIzmenjenogAK : klinika.target.value
      
    },() => console.log(this.state.klinikaNAK));
  
  };
  
  dodajAdminaKlinike = e => {
    e.preventDefault();
    // this.setState({
    //   klinikaNAK : this.state.klinikaNAK
    // });
    console.log("--------------------------------");
    const klin = this.state.klinikaNAK;
    console.log(klin);
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
          <div>
            <select name="odabirKlinike"  onChange={e => {this.proslediKliniku(e)}}>
            {this.listaKlinikaIzbor()} 
            
            </select>
          </div>

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
              console.log("***********************************Dodavanje uspelo! ");
              console.log(response.data);
              this.listaAdministratoraKlinika();

            })
            .catch(error => {
              console.log("**************Dodavanje novog administratora klinike nije uspelo! ");
            });
        })
      ],
      bsSize: 'medium',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })
    
  };

  dodajAdminaKC = e => {
    e.preventDefault();

    console.log("--------------------------------");
    
    this.dialog.show({
      title: 'Dodavanje novog administratora klinickog centra',
      body: [
         <form className="formaZaDodavanjeNovogAdministratoraKC">
         {/* <h3>Podaci o klinici</h3> */}
          <div className="imeNAK" >
            <label className="imeNAKLabela" htmlFor="imeNAK">Ime: </label>
            <input className="imeNAKInput"
              type="text"
              name="imeNAKC"
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
              name="prezimeNAKC"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          <div className="emailNAK" >
            <label className="emailNAKLabel" htmlFor="emailNAK">Email: </label>
            <input className="emailNAKInput"
              type="text"
              name="emailNAKC"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
          <div className="lozinkaNAK" >
            <label className="lozinkaNAKLabel" htmlFor="lozinkaNAK">Lozinka: </label>
            <input className="lozinkaNAKInput"
              type="text"
              name="lozinkaNAKC"
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
          const url4 = "http://localhost:8025/api/administratoriKC/dodavanjeAdminaKC";
          axios
            .post(url4, {
              ime : this.state.imeNAKC,
              prezime : this.state.prezimeNAKC,
              email : this.state.emailNAKC,
              lozinka : this.state.lozinkaNAKC

              
            })
            .then(response => {
              console.log("Dodavanje uspelo! ");
              console.log(response.data);
              this.listaAdministratora();

            })
            .catch(error => {
              console.log("Dodavanje novog administratora klinickog centra nije uspelo! ");
            });
        })
      ],
      bsSize: 'medium',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })
  };

  izmeniKliniku = e =>{
    e.preventDefault();
    console.log(e.target.id)
    const url = 'http://localhost:8025/api/klinike/' + e.target.id;
        axios.get(url)
          .then(Response => {
            console.log("Preuzeta klinike: ");
            console.log(Response.data);
          
            this.setState({
              idIzmenjeneKlinike: Response.data.id,
              nazivIzmenjeneKlinike: Response.data.naziv,
              adresaIzmenjeneKlinike: Response.data.adresa,
              ocenaIzmenjeneKlinike: Response.data.ocena,
              opisIzmenjeneKlinike: Response.data.opis,
            }, ()=>this.dialog.show({
              title: 'Izmena klinike',
              body: [
                
                <form className="formaIzmenaProfilaLekara">
                     <div className="ime">
                        <label htmlFor="naziv">Naziv: </label>
                        <input
                          type="text"
                          name="nazivIzmenjeneKlinike"
                          
                          defaultValue={this.state.nazivIzmenjeneKlinike}
                          // placeholder={this.state.ime}
                          // noValidate
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="ime">
                        <label htmlFor="adresa">Adresa: </label>
                        <input
                          type="text"
                          name="adresaIzmenjeneKlinike"
                          defaultValue={this.state.adresaIzmenjeneKlinike}
                          // placeholder="prezime"
                          // noValidate
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="ime">
                        <label htmlFor="opis">Opis: </label>
                        <input
                          type="text"
                          name="opisIzmenjeneKlinike"
                          defaultValue={this.state.opisIzmenjeneKlinike}
                          // placeholder="prezime"
                          // noValidate
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="ime">
                        <label htmlFor="ocena">Ocena: </label>
                        <input
                          type="text"
                          name="ocenaIzmenjeneKlinike"
                          defaultValue={this.state.ocenaIzmenjeneKlinike}
                          disabled="disabled"
                          // placeholder="prezime"
                          // noValidate
                          onChange={this.handleChange}
                        />
                      </div>
                     
                      {/* <div className="izmeniPodatkeLekar">
                         <Button type="submit">Izmeni podatke</Button>
                      </div> */}
                  </form>
              ],
              actions: [
                Dialog.CancelAction(),
                Dialog.OKAction(()=> {
                 
                      console.log("Izmjena klinike: ---------------")  
                      console.log(this.state.naziv);
                      console.log(this.state.idKlinike);
                      console.log(this.state.id);
                    axios
                      .put("http://localhost:8025/api/klinike/update", {
                        id: this.state.idIzmenjeneKlinike,
                        naziv: this.state.nazivIzmenjeneKlinike,
                        adresa: this.state.adresaIzmenjeneKlinike,
                        ocena: this.state.ocenaIzmenjeneKlinike,
                        opis: this.state.opisIzmenjeneKlinike
                      })
                      .then(response => {
                        console.log(response.data);
                        this.listaKlinika();

                        // this.setState({
                        //   id: response.data.id,
                        //   naziv: response.data.naziv,
                        //   adresa: response.data.adresa,
                        //   ocena: response.data.ocena,
                        //   opis: response.data.opis
                        // });
                      })
                      .catch(error => {
                        console.log("Izmena nije uspela! ")
                      });
                 
                })
              ],
              bsSize: 'medium',
              onHide: (dialog) => {
                dialog.hide()
                console.log('closed by clicking background.')
              }
            }) );
            
    
          })
          
          .catch(error => {
            console.log("klinika nije preuzeta")
          })

    
  }

  handleCheckBox() {
    if(this.state.is_checked == true){
      this.setState({ is_checked: false });
      this.setState({ menjanjeLozinke : "password"});
    }else{
      this.setState({ is_checked: true });
      this.setState({ menjanjeLozinke : "text"});
    }
    
  }
  izmeniAdminaKlinike = e => {
    e.preventDefault();
    console.log(e.target.id);
    const url5 = 'http://localhost:8025/api/adminKlinike/getAdminKlinikeByEmail/' + e.target.id;
    axios.get(url5)
      .then(Response => {
        console.log("Preuzet admin klinike: ");
        console.log(Response.data);

        this.setState({
          emailIzmenjenogAK: Response.data.email,
          imeIzmenjenogAK: Response.data.ime,
          prezimeIzmenjenogAK: Response.data.prezime,
          telefonIzmenjenogAK: Response.data.telefon,
          // lozinkaIzmenjenogAK: Response.date.lozinka,
          // klinikaIzmenjenogAK: Response.date.idKlinike
        }, 
        ()=> this.dialog.show({
          title: 'Izmena administratora klinike',
          body: [
            
            <form  className="formaIzmenaAdministratoraKlinike">
              <div className="imeNAK" >
                <label className="imeNAKLabela" htmlFor="imeNAK">Ime: </label>
                <input className="imeNAKInput"
                  type="text"
                  name="imeIzmenjenogAK"
                  defaultValue = {this.state.imeIzmenjenogAK} 
                  
                  onChange={this.handleChange}
                />
              </div>
              <div className="prezimeNAK" >
                <label className="prezimeNAKLabel" htmlFor="prezimeNAK">Prezime: </label>
                <input
                  className="prezimeNAKInput"
                  type="text"
                  name="prezimeIzmenjenogAK"
                  defaultValue={this.state.prezimeIzmenjenogAK}
                  onChange={this.handleChange}
                />
              </div>
              <div className="emailNAK" >
                <label className="emailNAKLabel" htmlFor="emailNAK">Email: </label>
                <input className="emailNAKInput"
                  type="text"
                  name="emailIzmenjenogAK"
                  defaultValue={this.state.emailIzmenjenogAK}
                  disabled="disabled"
                  //onChange={this.handleChange}
                />
              </div>
              <div className="lozinkaNAK" >
                <label className="lozinkaNAKLabel" htmlFor="lozinkaNAK">Lozinka: </label>
                <input className="lozinkaNAKInput"
                  type="text"
                  name="lozinkaIzmenjenogAK"
                  defaultValue={this.state.lozinkaIzmenjenogAK}
                  onChange={this.handleChange}
                />
                {/* <div className="checkbox">
                  <input
                    id="check"
                    type="checkbox"
                    onChange={this.handleCheckBox}
                    checked={this.state.is_checked}
                         
                  />
                  <label htmlFor="check">prikazi lozinku</label>
                </div>  */}
              </div>
              <div className="telefonNAK" >
                <label className="telefonNAKLabel" htmlFor="telefonNAK">Telefon: </label>
                <input className="telefonNAKInput"
                  type="text"
                  name="telefonIzmenjenogAK"
                  defaultValue={this.state.telefonIzmenjenogAK}
                  onChange={this.handleChange}
                />
              </div>
              <div className="klinikaNAK" >
                <label className="klinikaNAKLabela" htmlFor="klinikaNAK">Klinika: </label> 
                <div>
                  <select 
                    name="odabirKlinike" 
                    //defaultValue={this.state.klinikaIzmenjenogAK}
                    onChange={e => {this.proslediKlinikuIzmena(e)}}
                   >
                    {this.listaKlinikaIzbor()} 
                  
                  </select>
                </div>
              </div>
          
            </form>
          ],
          actions: [
            Dialog.CancelAction(),
            Dialog.OKAction(()=> {
             
                console.log("Izmjena admina klinike: ---------------")  
                axios
                .put("http://localhost:8025/api/medicinskaSestra/izmena", {
                  ime: this.state.imeIzmenjenogAK,
                  prezime: this.state.prezimeIzmenjenogAKC,
                  email: this.state.emailIzmenjenogAK,
                  brTelefona: this.state.telefonIzmenjenogAK,
                  lozinka: this.state.lozinkaIzmenjenogAK,
                  idKlinike: this.state.klinikaIzmenjenogAK
                })
                .then(response => {
                  console.log("izmena uspela");
                  console.log(response.data);
                  this.listaAdministratoraKlinika();

                })
                .catch(error => {
                  console.log("Izmena nije uspela! ");
                });

               
            })
          ],
          bsSize: 'medium',
          onHide: (dialog) => {
            dialog.hide()
            console.log('closed by clicking background.')
          }
        }));
        
        
       

        

      })
      .catch(error => {
        console.log("Admin klinike nije preuzet")
      })
  }
  izmeniAdminaKC = e => {
    e.preventDefault();
    console.log(e.target.id);
    const url =
    "http://localhost:8025/api/administratoriKC/pronadjenAdministratorKC/" + e.target.id;
  axios
    .get(url)
    .then(Response => {
      console.log("Preuzet admin: ");
      console.log(Response.data);

      this.setState({
        emailIzmenjenogAKC: Response.data.email,
        imeIzmenjenogAKC: Response.data.ime,
        prezimeIzmenjenogAKC: Response.data.prezime,
        lozinkaIzmenjenogAKC: Response.data.lozinka
      },() =>this.dialog.show({
        title: 'Izmena klinike',
        body: [
          
          <form className="formaIzmenaProfilaLekara">
                  <div className="ime">
                      <label htmlFor="ime">Email: </label>
                      <input
                        type="text"
                        name="emailIzmenjenogAKC"
                        defaultValue={this.state.emailIzmenjenogAKC}
                        disabled= "disabled"
                        // placeholder={this.state.ime}
                        // noValidate
                        // onChange={this.handleChange}
                      />
                    </div>
                  <div className="ime">
                      <label htmlFor="ime">Ime: </label>
                      <input
                        type="text"
                        name="imeIzmenjenogAKC"
                        defaultValue={this.state.imeIzmenjenogAKC}

                        // placeholder={this.state.ime}
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div>
                  <div className="prezime">
                      <label htmlFor="prezime">Prezime: </label>
                      <input
                        type="text"
                        name="prezimeIzmenjenogAKC"
                        defaultValue={this.state.prezimeIzmenjenogAKC}
                        // placeholder="prezime"
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div> 
                  <div className="lozinka">
                      <label htmlFor="lozinka">Lozinka: </label>
                      <input
                        type="text"
                        name="lozinkaIzmenjenogAKC"
                        defaultValue={this.state.lozinkaIzmenjenogAKC}
                        // placeholder={this.state.adresa}
                        // noValidate
                        onChange={this.handleChange}
                      />
                    </div>
            </form>
        ],
        actions: [
          Dialog.CancelAction(),
          Dialog.OKAction(()=> {
           
                console.log("Izmjena klinike: ---------------")  
                axios
                .put("http://localhost:8025/api/administratoriKC/izmena", {
                  ime: this.state.imeIzmenjenogAKC,
                  prezime: this.state.prezimeIzmenjenogAKC,
                  email: this.state.emailIzmenjenogAKC,
                  adresa: this.state.lozinkaIzmenjenogAKC
                })
                .then(response => {
                  console.log(response.data);
                  this.listaAdministratora();
          
                })
                .catch(error => {
                  console.log("Izmena nije uspela! ");
                });
           
          })
        ],
        bsSize: 'medium',
        onHide: (dialog) => {
          dialog.hide()
          console.log('closed by clicking background.')
        }
      }));

      
      
    })
    .catch(error => {
      console.log("Admin KC nije preuzet");
    });
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
                    <div>
                    <Button className="DodajKlinikuDugme"  onClick={e => this.dodajAdminaKC(e)}>Dodaj administratora </Button>
                    <Dialog ref={(el) => { this.dialog = el }} ></Dialog>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th id="IdAdminaKC">Id</th>
                          <th id="ImeAdminaKC">Ime</th>
                          <th id="PrezimeAdminaKC"> Prezime</th>
                          <th id="EmailAdminaKC">Email</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {this.listaAdminaUKC()}
                        
                      </tbody>
                    </Table>
                    </div>
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

               
              />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

export default KlinickiCentarPocetna;