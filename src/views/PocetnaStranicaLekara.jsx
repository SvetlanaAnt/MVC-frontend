
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table , NavItem, Nav, NavDropdown, MenuItem} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import ProfilPacijenta from "views/ProfilPacijenta.jsx"
import Button from "components/CustomButton/CustomButton.jsx";
import Dialog from 'react-bootstrap-dialog';


import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import slikaLekar from "assets/img/images.jpg";
import Login from "login.js";
import axios from "axios";
import { render } from "react-dom";
import events from "events.js";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"; 
import Slikalekari from "assets/img/lekari.jpg";
import slikaPregledi from "assets/img/pregled.jpg"
import slikaSala from "assets/img/sala.jpg"
import slikaST from "assets/img/lekari.jpg"
import kalendarSlika from "assets/img/calendar.png"
import moment from 'moment';
 

const localizer = momentLocalizer(moment);
class PocetnaStranicaLekara extends React.Component {
  constructor(props){
    super(props);
    console.log("POCETNA STRANICA LEKARA");
    console.log(props);
    this.state = {
      email: props.email,
      uloga: props.uloga, 
      token: props.token,
      ime: "",
      telefon: "",
      prezime: "",
      lbo: "",
      klinikaID: "", 
      listaPacijenata:[],
      redirectToProfilPacijenta: false,
      emailPacijenta: "",
      pretraziPolje: "",
    };
    this.listaPacijenataLekara = this.listaPacijenataLekara.bind(this);
    this.sortMyArray = this.sortMyArray.bind(this);
    
  }

  handleClick = e => {
    e.preventDefault();
    console.log("CLICK *** ");  
    console.log("PPPPPPPPPPPP: " + e.target.id);
    // this.props.onClick(this.props.value);
    // console.log(e.lista.email);
    console.log("prikaz profila pacijenta");
    this.setState({
      redirectToProfilPacijenta: true,
      emailPacijenta: e.target.id,
  
    });
    console.log("----------------------------------------------------");
    console.log(this.state.emailPacijenta);
  };

  componentWillMount(){
    console.log("wmount")
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    const url = 'http://localhost:8025/api/lekari/getLekarByEmail';
    // console.log('Email: ' + this.state.email);
    // console.log('url: ' + url);
    axios.get(url, config)
      .then(Response => {
        console.log("Preuzet lekar: //////////////////////////////////////////");
        console.log(Response.data);
        this.setState({
          email: Response.data.email,
          klinikaID: Response.data.klinikaID,
          ime: Response.data.ime,
          prezime: Response.data.prezime,
          telefon: Response.data.telefon
        });
        console.log("Klinika id: " + this.state.klinikaID);
        const url1 = 'http://localhost:8025/api/klinike/pacijentiKlinike/' + this.state.klinikaID; 
        console.log(url1);
        axios.get(url1, config)
          .then(response => {
            console.log("URL 111");
            console.log(response);
            this.setState({
              listaPacijenata: response.data
            });
          })
          .catch(error => {
              console.log("nisu preuzeti pacijenti klinike");
              console.log(error);
          })
      })
      
      .catch(error => {
        console.log("Lekar  nije preuzet")
      })

  }


  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  handleChange = e => {
      e.preventDefault();
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state);
      console.log("On click !!!");
  };

  listaPacijenataLekara(){
    let res=[];
    let lista = this.state.listaPacijenata;
    const pretraga = this.state.pretraziPolje;
    if (pretraga == "" || pretraga == undefined){
      for(var i=0; i< lista.length;i++){
        console.log( "Pacijent : "  + lista[i].email);

        res.push(
        
          <tr key = {i}>
            {/* <td key={lista[i].id}>{lista[i].id}</td>
            <td key={lista[i].naziv}>{lista[i].ime}</td>
            <td key={lista[i].adresa}>{lista[i].prezime}</td>
            <td key={lista[i].opis}>{lista[i].email}</td> */}
            <td key={lista[i].id}>{lista[i].id}</td>
            <td>{lista[i].ime}</td>
            <td>{lista[i].prezime}</td>
            <td>{lista[i].lbo}</td>
            <td key={lista[i].email}>{lista[i].email}</td>
            <td ><Button className="OdobrenZahtev"
                id={lista[i].email}
                onClick={e => this.handleClick(e)}> Prikazi profil </Button></td>
            {/* <td><link to="/admin/login">Prikazi profil</link></td> */}
          {/* <td key={lista[i].ocena}>{lista[i].ocena}</td> */}
      
          </tr>
        );
      }
  }else{
    console.log(pretraga);
    let lista = this.state.listaPacijenata;
    for (var i = 0; i < lista.length; i++) {
      var lbo = lista[i].lbo;
      var ime = lista[i].ime;
      var prezime = lista[i].prezime;

      if(lbo.toLowerCase().includes(pretraga.toLowerCase()) || 
      ime.toLowerCase().includes(pretraga.toLowerCase()) ||
      prezime.toLowerCase().includes(pretraga.toLowerCase()) ){
        res.push(
          <tr key = {i} >
      <td>{lista[i].ime}</td>
            <td>{lista[i].prezime}</td>
            <td>{lista[i].lbo}</td>
            <td >{lista[i].email}</td>
            
            <td ><Button className="OdobrenZahtev"
                id={lista[i].email}
                onClick={e => this.handleClick(e)}> Prikazi profil </Button></td>
          
          </tr>
        );
      }
    }
  }
    return res;
  }
  sortMyArray(sortBy) {
    console.log("sort funkcija");
    console.log(sortBy.target.value);
    const lista = this.state.listaPacijenata;
    if (sortBy.target.value  === "lbo") {
      console.log("lbo");
      this.setState({
        listaPacijenata: lista.sort((a, b) => a.lbo - b.lbo)
      });
    } else if (sortBy.target.value  === "ime") {
      console.log("ime");
      this.setState({
        listaPacijenata: lista.sort((a, b) => a.ime.localeCompare(b.ime))
      });
    } else if (sortBy.target.value  === "prezime") {
      console.log("prezime");
      this.setState({
        listaPacijenata: lista.sort((a, b) => a.prezime.localeCompare(b.prezime))
      });
    } else if (sortBy.target.value  === "email") {
      console.log("email");

      this.setState({
        listaPacijenata: lista.sort((a, b) => a.email.localeCompare(b.email))
      });
    
    } else if (sortBy.target.value  === "idOpadajuce") {
      console.log("idOpadajuce");

      this.setState({
        listaPacijenata: lista.sort((a, b) => b.id - a.id)
      });
    } else if (sortBy.target.value  === "idRastuce") {
      console.log("idRastuce");

      this.setState({
        listaPacijenata: lista.sort((a, b) => a.id - b.id)
      });
    }
    
  }
  render() {
    // console.log("Ispisi  props u pocetna stranica lekara: "); 
    // console.log(this.props);
    const emailPacijenta = this.state.emailPacijenta;
    const redirectToProfilPacijenta = this.state.redirectToProfilPacijenta;
    const email = this.state.email;
    const uloga = this.state.uloga;
    const ime = this.state.ime;
    const prezime = this.state.prezime;
    const lbo = this.state.lbo;
    const telefon = this.state.telefon;
    // console.log("Render ps email: " + email);
    // console.log("Render ps uloga: " + uloga);
    // console.log("Render ps ime: " + ime);
    // console.log("Render ps prezime: " + prezime);
    // console.log("Render ps telefon: " + telefon)
    if (redirectToProfilPacijenta === true) {
      return (
        <BrowserRouter>
          <Switch>
            <Route
              path="/profilPacijenta"
              render={props => <ProfilPacijenta {...props} emailPacijenta={emailPacijenta} />}
            />
            <Redirect from="/" to="/profilPacijenta" />
          </Switch>
        </BrowserRouter>
      );
    }

    
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<div> <img src = { kalendarSlika} width="30" height="20" /></div>}
                // statsText="Lista pacijenata"
                // statsValue="105GB"
                // statsIcon={<i className="fa fa-refresh" />}
                 statsIconText="Kalendar"
                
                //  <BigCalendar
                //    events={events}
                //    views={["month"]}
                //    defaultDate={new Date(2018, 3, 1)}
                //  />
             
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<div> <img src = { slikaPregledi} width="30" height="20" /></div>}
                // statsText="Pocetak pregleda"
                // statsValue="$1,345"
                // statsIcon={<i className="fa fa-calendar-o" />}
                 statsIconText="Pocetak pregleda"
              />
            </Col>
            <Col lg={3} sm={6} >
              <StatsCard
                bigIcon={<div> <img src = { Slikalekari} width="30" height="20" /></div>}
                // statsText="Profil korisnika"
                // statsValue="23"
                // statsIcon={<i className="fa fa-clock-o" />}
                 statsIconText="Zahtev za odmor/odsustvo"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<div> <img src = { slikaPregledi} width="30" height="20" /></div>}
                statsText=""
                // statsValue="+45"
                // statsIcon={<i className="fa fa-refresh" />}
                 statsIconText="Zakazivanje pregleda i operacija"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card
                title="Lista pacijenata"
                // category="24 Hours performance"
                // stats="Updated 3 minutes ago"
                content={
                  <form
                  onSubmit={this.handleSumbit}
                  className="formaIzmenaProfilaPacijent"
                  >
                     <div className="pretraga">
                      <input
                        className="pretraga"
                        placeholder="Pretrazi"
                        type="text"
                        aria-label="Search"
                        name="pretraziPolje"
                        margin= "2px"
                        onChange={this.handleChange}
                      />

             </div>
                    <div className="pretraga">
                      <select onChange={e => {this.sortMyArray(e) }}>
                        <option value={"idRastuce"} >Id (rastuce)</option>
                        <option value={"idOpadajuce"} >Id (opadajuce)</option>
                        <option value={"lbo"}>LBO</option>
                        <option value={"ime"}>Ime</option>
                        <option value={"prezime"}>Prezime</option>
                        <option value={"email"}>Email</option>
                      </select>
              </div>
             <Card 
                ctTableFullWidth
               // ctTableResponsive
                className="pretraga"
                 content={
                  <Table className="TabelaListePacijenata" striped hover style={{ width: 100 }}>
                  <thead>
                    <tr>
                      {/*                             
                      {listaKlinika.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })} */}
                      <th id="Id">Id</th>
                      <th id="Ime">Ime</th>
                      <th id="Prezime"> Prezime</th>
                      <th id="Lbo"> Lbo</th>
                      <th id="Email">Email</th>
                  
                    </tr>
                   
                  </thead>
                  <tbody>
                      {this.listaPacijenataLekara()}
                    
                  </tbody>
                </Table>
                 }
           
                />
                </form>
              }
             />
                
          </Col>
          <Col md={6} >
              <Card
                title=""
                // category="24 Hours performance"
                // stats="Updated 3 minutes ago"
                content={
              
                     <div style={{ height: 500 }}  className="ct-chart">
                       <Calendar
                        localizer={localizer}
                        events={events }
                        views={["month"]}
                        defaultDate={new Date()}
                    />
                    </div>
                 
                }
                // legend={
                //   <div className="legend">{this.createLegend(legendSales)}</div>
                // }
              />
            </Col>
          </Row>
          <Row>
           
            </Row>
        </Grid>
      </div>
    );
  }
}

export default PocetnaStranicaLekara;
