import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import "izmenaProfila.css";

//dodam link za sliku  mozda od doktora!!

import "login.js";
import { log } from "util";
import Login from "login";
import slikaLekar from "assets/img/images.jpg"
import axios from "axios";

class izmenaProfila extends Component {
  constructor(props){
    super(props);
    console.log("IZMENA PROFILA LEKARA LEKARA");
    console.log(this.props.token)
    this.state = {
      email: props.email,
      uloga: props.uloga, 
      token: props.token,
      ime: "",
      telefon: "",
      prezime: "",
      imeN: "",
      telefonN: "",
      prezimeN: "",

    }

  }


  componentWillMount(){

    console.log("wmount")
    console.log("LEKAR SA EMAIL-OM: " + this.state.email)
    var config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    const url = 'http://localhost:8025/api/lekari/getLekarByEmail';
    axios.get(url, config)
      .then(Response => {
        console.log("Preuzet lekar: ");
        console.log(Response.data);
      
        this.setState({
          email: Response.data.email
        });
        this.setState({
          ime: Response.data.ime
        });

        this.setState({
          prezime: Response.data.prezime
        });
        this.setState({
          telefon: Response.data.telefon
        });
      })
      
      .catch(error => {
        console.log("Lekar  nije preuzet")
      })

      
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
    console.log(this.state)
    console.log("On change !!!")

  };
  
  handleSumbit = e => {
    e.preventDefault();
    console.log("KLIK SUBMITTT")
    // let formErrors = { ...this.state.formErrors };
      console.log("Izmjena : ---------------")  
      console.log(this.state.ime);
      console.log(this.state.prezime);
      var config = {
        headers: {
          Authorization: "Bearer " + this.state.token,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      };
    axios
      .put("http://localhost:8025/api/lekari/update", {
        ime: this.state.ime,
        prezime: this.state.prezime,
        telefon: this.state.telefon,
        email: this.state.email
      }, config)
      .then(response => {
        console.log(response.data);
 
      
        this.setState({
          ime: response.data.ime
        });

        this.setState({
          prezime: response.data.prezime
        });

        this.setState({
          telefon: response.data.telefon
        });

        // this.setState({
        //   redirectToReferrer: true
        // });
      })
      .catch(error => {
        console.log("Izmena nije uspela! ")
      });
  };

  render() {
    const email = this.state.email;
    const uloga = this.state.uloga;
    const ime = this.state.ime;
    const prezime = this.state.prezime;
    const telefon = this.state.telefon;


    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Izmena podataka"
                content={
                  <form onSubmit={this.handleSumbit} className="formaIzmenaProfilaLekara">
                     <div className="ime">
                        <label htmlFor="ime">Ime: </label>
                        <input
                          type="text"
                          name="ime"
                          
                          defaultValue={ime}
                          // placeholder={this.state.ime}
                          // noValidate
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="prezime">
                        <label htmlFor="prezime">Prezime: </label>
                        <input
                          type="text"
                          name="prezime"
                          defaultValue={prezime}
                          // placeholder="prezime"
                          // noValidate
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="email">
                        <label htmlFor="email">Email: </label>
                        <input
                          type="email"
                          name="email"
                          value={email}
                          disabled="disabled"
                          // placeholder="email"
                          // noValidate
                          // onChange={this.handleChange}
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
                      <div className="telefon">
                        <label htmlFor="telefon">Broj telefona: </label>
                        <input
                          type="text"
                          name="telefon"
                          defaultValue={this.state.telefon}
                          // placeholder="telefon"
                          // noValidate
                          onChange={this.handleChange}
                        />
               
                      {/* <div className="">
                        <label htmlFor="">: </label>
                        <input
                          type="text"
                          name=""
                          placeholder=""
                          // noValidate
                          // onChange={this.handleChange}
                        />*/}
                      </div> 
                      <div className="izmeniPodatkePacijent">
                         <Button type="submit">Izmeni podatke</Button>
                      </div>
                  </form>
                  // <form className="formUserProfile">
                  //   <FormInputs
                  //     ncols={["col-md-100", "col-md-10"]}
                  //     properties={[
                  //       {
                  //         // label: "Klinika (disabled)",
                  //         label: "Klinika ",
                  //         type: "text",
                  //         bsClass: "form-control",
                  //         placeholder: "Company",
                  //         defaultValue: "staviti ime od klinike",
                  //         disabled: true
                  //       },
                  //       {
                  //         label: "Email adresa",
                  //         type: "email",
                  //         bsClass: "form-control",
                  //         placeholder: "Email",
                  //         defaultValue: "Emai"
                  //       }
                  //     ]}
                  //   />
                  //    <FormInputs
                  //     ncols={["col-md-10", "col-md-10"]}
                  //     properties={[
                  //       {
                  //         label: "Ime",
                  //         type: "text",
                  //         bsClass: "form-control",
                  //         placeholder: "First name",
                  //         defaultValue: "ime"
                  //       },
                  //       {
                  //         label: "Prezime",
                  //         type: "text",
                  //         bsClass: "form-control",
                  //         placeholder: "Last name",
                  //         defaultValue: "Neko prezime"
                  //       }
                  //     ]}
                  //   />
                  //   <FormInputs
                  //     ncols={["col-md-10000"]}
                  //     properties={[
                  //       {
                  //         label: "Adress",
                  //         type: "text",
                  //         bsClass: "form-control",
                  //         placeholder: "Home Adress",
                  //         defaultValue:
                  //           "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                  //       }
                  //     ]}
                  //   />

                  //   <Row>
                  //     <Col md={12}>
                  //     </Col>
                  //   </Row>
                  //   <Button bsStyle="info" pullRight fill type="submit">
                  //     Izmeni profil
                  //   </Button>
                  //   <div className="clearfix" />
                  // </form>
                }
              />
            </Col>
            <Col md={4}>
            <Card
                // statsIcon="fa fa-clock-o"
                title="O lekaru"
                // category="Ime"
                content={
                  <div id="a">
                    <div className="slikaKCdiv">
                      <h2> 
                        <img className="slikaLekar" src={slikaLekar}></img>
                      </h2>
                    </div>
                    
                    {/* <div className="typo-line">
                      <h2>
                        <p className="category">Klinika:</p>
                        <label className="adresaKC">ucitati data</label>
                      </h2>
                    </div> */}
                    {/* <div className="typo-line">
                      <h2>
                        <p className="category">Ime:</p>
                  <label className="opisKC">{this.state.ime}</label>
                      </h2>
                    </div>
                    <div className="typo-line">
                      <h2>
                        <p className="category">Prezime:</p>
                  <label className="opisKC">{this.state.prezime}</label>
                      </h2>
                    </div> */}
                      <Table striped hover>
                      <thead className="thead-dark">
                        <tr>
                          <td>E-mail:</td>
                          <td>{email}</td>
                        </tr>
                        <tr>
                          <td>Klinika:</td>
                          <td>{email}</td>
                        </tr>
                      </thead>
                    </Table>
                    
                    
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

export default izmenaProfila;
