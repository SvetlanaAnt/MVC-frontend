
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";
import "klinickiCentar.css";


class Pregled extends React.Component {
  constructor(props) {
    super(props);
    console.log("LEKAR");
    console.log(this.props);
    this.state = {
      uloga: props.uloga,
      email: props.email,
      token: props.token,
      id: "",
      tipOdmorOdsustvo: "ODMOR",
      datumPocetka: new Date(),
      datumKraja : new Date(),
      opis: "",
      idMedSestre: 0, 
      imeMS: "",
      prezimeMS: ""

      
    };
    this.config = {
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
    this.izaberiTip = this.izaberiTip.bind(this);
    this.zahtevOdmorOdsustvo = this.zahtevOdmorOdsustvo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDatePocetka = this.handleChangeDatePocetka.bind(this);
    this.handleChangeDateKraja = this.handleChangeDateKraja.bind(this);
    console.log(this.state.uloga);
    console.log(this.state.email);
  }

  izaberiTip(izbor) {
    
    console.log("izbor odmor odsustvo");

    console.log(izbor.target.value);

    this.setState({
      tipOdmorOdsustvo : izbor.target.value
      
    },() => console.log(this.state.tipOdmorOdsustvo));
  
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({ [name]: value }, () => console.log(this.state));
  };
  handleChangeDatePocetka = date => {
    console.log(date)
    this.setState(
      {
        datumPocetka: date
      },
      () => console.log(this.state)
    );
  };
  handleChangeDateKraja = date => {
    console.log(date)
    this.setState(
      {
        datumKraja: date
      },
      () => console.log(this.state)
      
    );
  };

  componentWillMount() {
    const url =
    "http://localhost:8025/api/lekari/getLekarByEmail" ;
  axios
    .get(url, this.config)
    .then(Response => {
      console.log("Preuzet lekar: ");
      console.log(Response.data);

      this.setState({
        id: Response.data.id
      });
      this.setState({
        imeMS: Response.data.ime
      })
      this.setState({
        prezimeMS: Response.data.prezime
      })

     
    })
    .catch(error => {
      console.log("Med sestra nije preuzeta");
    });
  }
  zahtevOdmorOdsustvo() {

    const url = "http://localhost:8025/api/odmorodsustvo/posaljiZahtevLekar";
    axios
      .post(url,{ 
        datumOd : this.state.datumPocetka,
        datumDo : this.state.datumKraja,
        opis : this.state.opis,
        status: false,
        idLekara : this.state.id,
        imeL: this.state.imeMS,
        prezimeL: this.state.prezimeMS,
        emailL: this.state.email,
        tip : this.state.tipOdmorOdsustvo
      }, this.config)
      .then(Response => {
        
        console.log("uspesno poslat zahtev")
        console.log(Response.data);

      })
      .catch(error => {
        console.log("Zahtev nije poslat");
      });
  };

  render() {
    console.log(this.props);
    return (
        <Grid>
            <Row>
                <div className="content">

                    <Card
                        title="Pregled"
                        // category="24 Hours performance"
                        // stats="Updated 3 minutes ago"
                        content={
                            <div className="formaPregleda" >
                            <Grid fluid>
                                <Row>
                                <Col lg={3} sm={6}> 
                                    <h5>Tip (odmor/odsustvo): </h5>
                                    <div>
                                    <select className="izbor"
                                    // name="odabir" 
                                        // defaultValue={this.state.klinikaIzmenjenogAK}
                                    onChange={e => {this.izaberiTip(e)}}
                                    >
                                        <option 
                                        value="ODMOR"
                                        >ODMOR</option>

                                        <option 
                                        value="ODSUSTVO"
                                        >ODSUSTVO</option>
                                    
                                    </select>
                                    </div>
                                </Col>
                                <Col lg={3} sm={6}>
                                    <h5>Datum pocetka:</h5>
                                    <DatePicker
                                    placeholderText="Izaberi datum"
                                    selected={this.state.datumPocetka}
                                    onSelect={this.handleChangeDatePocetka}

                                    />
                                </Col>
                                <Col lg={3} sm={6}>
                                    <h5>Datum kraja:</h5>
                                    <DatePicker
                                        placeholderText="Izaberi datum"
                                        selected={this.state.datumKraja}
                                        onSelect={this.handleChangeDateKraja}

                                    />
                                </Col>
                                
                                </Row>
                                <Row >
                                <Col lg={3} >
                                <h5 >Razlog: </h5>
                                <input className="razlogPolje"
                                    type="text"
                                    name="opis"
                                // defaultValue={ime}
                                    // placeholder={this.state.ime}
                                    // noValidate
                                    onChange={this.handleChange}
                                /> 
                                </Col>
                                </Row>
                                <Row >
                                <Col lg={3} >
                                    <Button className="dugmePosalji" onClick={this.zahtevOdmorOdsustvo}>Pošalji</Button>
                                </Col>
                                </Row>
                            </Grid>
                        
                            </div>
                        }
                    />
                </div>
            </Row>
        </Grid>
     
    );
  }
}

export default Pregled;
