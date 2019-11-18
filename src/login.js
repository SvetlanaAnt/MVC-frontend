import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./registracija.css";
import AdminLayout from "layouts/Admin.jsx";
import axios from "axios";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Registracija from "registracija.js";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = formErrors => {
  let valid = true;
  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   email: null,
      email: null,
      lozinka: null,
      //   pacijent: {
      //     ki: korisnickoIme,
      //     l: lozinka
      //   },
      redirectToReferrer: false,
      redirectToRegistration: false,
      errorF: false,
      formErrors: {
        log: "",
        email: "",
        lozinka: ""
      }
    };
  }
  handleSumbit = e => {
    e.preventDefault();
    // formErrors.log = "";
    // this.setState({ formErrors }, () => console.log(this.state));
    let formErrors = { ...this.state.formErrors };

    axios
      .post("http://localhost:8021/api/pacijenti/login", {
        email: this.state.email,
        lozinka: this.state.lozinka
      })
      .then(response => {
        console.log(response);
        this.setState({
          redirectToReferrer: true
        });
      })
      .catch(error => {
        //   console.log(error.response);
        formErrors.log = "Pogresni kredencijali";
        this.setState({ formErrors }, () => console.log(this.state));
      });
  };
  handleClick = e => {
    e.preventDefault();
    console.log("registracijaa");
    this.setState({
      redirectToRegistration: true
    });
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email =
          value.length < 3 && value.length > 0 ? "min 3 karaktera  " : "";
        break;
      case "lozinka":
        formErrors.lozinka =
          value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
        break;
    }
    if (formErrors.email.length > 0 && formErrors.lozinka.length > 0) {
      formErrors.log = "";
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));

    // switch (name) {
    //   case "ime":
    //     formErrors.ime =
    //       value.length < 3 && value.length > 0 ? "min 3 karaktera  " : "";
    //     break;
    //   case "prezime":
    //     formErrors.prezime =
    //       value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
    //     break;
    //   case "adresa":
    //     formErrors.adresa =
    //       value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
    //     break;
    //   case "grad":
    //     formErrors.grad =
    //       value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
    //     break;
    //   case "drzava":
    //     formErrors.drzava =
    //       value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
    //     break;
    //   case "email":
    //     formErrors.email =
    //       value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
    //     break;
    //   case "telefon":
    //     formErrors.telefon =
    //       value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
    //     break;
    //   case "brojOsiguranika":
    //     formErrors.brojOsiguranika =
    //       value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
    //     break;
    //   case "korisnickoIme":
    //     formErrors.korisnickoIme =
    //       value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
    //     break;
    //   case "lozinka":
    //     formErrors.lozinka =
    //       value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
    //     break;
    //   case "potvrdaLozinke":
    //     formErrors.potvrdaLozinke =
    //       value.length < 3 && value.length > 0 ? "min 3 karaktera" : "";
    //     break;
    // }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  componentDidMount() {
    // fetch("/login", {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json, text/plain, */*",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ data: this.state })
    // })
    //   .then(res => res.json())
    //   .then(res => console.log(res));
  }

  render() {
    const { formErrors } = this.state;
    const errorF = this.state.errorF;
    const redirectToReferrer = this.state.redirectToReferrer;
    const redirectToRegistration = this.state.redirectToRegistration;
    if (redirectToReferrer === true) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </BrowserRouter>
      );
    }
    if (redirectToRegistration === true) {
      return (
        <BrowserRouter>
          <Switch>
            <Route
              path="/registration"
              render={props => <Registracija {...props} />}
            />
            <Redirect from="/" to="/registration" />
          </Switch>
        </BrowserRouter>
      );
    }

    return (
      <div>
        <div className="logForm">
          <div className="form-logForm">
            <h1>Uloguj se</h1>
            <form onSubmit={this.handleSumbit} noValidate>
              <div className="email">
                <label htmlFor="email">E-mail: </label>
                <input
                  type="text"
                  name="email"
                  placeholder="E-mail"
                  noValidate
                  onChange={this.handleChange}
                />
              </div>
              <div className="lozinka">
                <label htmlFor="lozinka">Lozinka: </label>
                <input
                  type="password"
                  name="lozinka"
                  placeholder="Lozinka"
                  noValidate
                  onChange={this.handleChange}
                />
              </div>
              <div className="signIn">
                {formErrors.log.length > 0 && (
                  <span className="errorMessage">{formErrors.log}</span>
                )}
                <button type="submit">Uloguj se</button>

                <small onClick={this.handleClick}>Napravi nalog</small>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
