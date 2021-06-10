import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./login.css";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import $ from "jquery";
import checkuser from './checkuser';
class Login extends Component {

 
 
    state = {
    email: "",
    password: "",
    errors: {},
    err: "",
  };

  schema = {
    email: Joi.string()
      .email()
      .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      .required()
      .error(() => {
        return { message: " *Enter a Valid email address" };
      }),
    password: Joi.string()
      .min(7)
      .required()
      .error(() => {
        return { message: " *password must be 6 characters or more" };
      }),
  };
  
  handlechange = async (e) => {
    var state = { ...this.state };
    state[e.currentTarget.name] = e.currentTarget.value;
    await this.setState(state);
    this.validate();
  };

  validate = () => {
    var errors = {};
    var state = { ...this.state };
    delete state.users;
    delete state.errors;
    delete state.err;
    const res = Joi.validate(state, this.schema, { abortEarly: false });

    if (res.error === null) {
      this.setState({ errors: {} });
      $("#login-button").prop("disabled", false);
      return;
    }
    for (const error of res.error.details) {
      errors[error.path] = error.message;
    }
    this.setState({ errors });
    $("#login-button").prop("disabled", true);
    return errors;
  };

  handelsubmit = (e) => {
    e.preventDefault();
    this.validate();
    const errors = this.validate();
    if (errors) return;
    const state = { ...this.state };
    delete state.errors;
    delete state.users;
    delete state.err;
    this.login(state);
  };

  login(state) {
    this.validate();
    const errors = this.validate();
    if (errors) {
      this.setState({ err: " *Please enter valid credentials" });
    }


    const user=checkuser(state) ;
    if(user){
        this.setState({ err: "" });
        window.location.replace("/home");
    }
else{
    this.setState({ err: "Your email and/or password are incorrect" });
}

  }

scroll(){
    $('html, body').animate({ scrollTop: $("#target" ).offset().top}, 1000);
}
  render() {
    return (
      <React.Fragment>
        <div className="login-container">
          <div className="half">
            <div className="slide">
              <Carousel
                autoPlay={true}
                stopOnHover={true}
                showArrows={false}
                showStatus={false}
                showThumbs={false}
              >
                <div  className="car-slide">
                  <img
                    src="./images/Product-overview.svg"
                    className="img-size"
                    alt="Product-overview"
                  />
                  <p className="text  ">
                    Accelerate Your Entire Mobile Team Workflow
                  </p>
                </div>
                <div  className="car-slide">
                  <img
                    src="./images/Products-bug-reporting.svg"
                    className="img-size m-img"
                    alt="Products-bug"
                  />
                  <p className="text ">
                    The Most Comprehesive Bug Reporting Tool for Mobile Apps
                  </p>
                </div>
                <div className="car-slide">
                  <img
                    src="./images/Products-crash-reporting.svg"
                    className="img-size"
                    alt="Products-crash"
                  />
                  <p className="text ">
                    Secure Crash Reporting With Real-Time Alerts
                  </p>
                </div>
              </Carousel>
              <div id="arr-down-phone" className="down-arrow" onClick={this.scroll}>
                <i className="down-icon fas fa-chevron-down"></i>
              </div>

              <div></div>
            </div>
          </div>
          <div id="target" className="half">
            <div className="login-side">
              <div>
                <img src="./images/Instabug-icon.svg" alt="Instabug" />
                <h2 style={{ margin: "0" }}>Login in to Instabug</h2>
              </div>

              <div className="login-data">
                <button className="button-login btn-google">
                  <span className="login-tex-icon">
                    <span className="btn-icon">
                      <svg viewBox="0 0 38 38" className="login-way-icon">
                        <g fill="none" fillRule="evenodd">
                          <rect
                            fill="#FFF"
                            width="38"
                            height="38"
                            rx="3"
                          ></rect>

                          <path
                            d="M27.64 19.205c0-.639-.057-1.252-.164-1.841H19v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                            fill="#4285F4"
                          ></path>
                          <path
                            d="M19 28c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711h-3.007v2.332A8.997 8.997 0 0 0 19 28z"
                            fill="#34A853"
                          ></path>
                          <path
                            d="M13.964 20.71a5.41 5.41 0 0 1-.282-1.71c0-.593.102-1.17.282-1.71v-2.332h-3.007A8.996 8.996 0 0 0 10 19c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                            fill="#FBBC05"
                          ></path>
                          <path
                            d="M19 13.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C23.463 10.891 21.426 10 19 10a8.997 8.997 0 0 0-8.043 4.958l3.007 2.332c.708-2.127 2.692-3.71 5.036-3.71z"
                            fill="#EA4335"
                          ></path>
                          <path d="M10 10h18v18H10z"></path>
                        </g>
                      </svg>
                    </span>
                    <span className="btn-tex">Google</span>
                  </span>
                </button>

                <button className="button-login btn-git ">
                  <span className="login-tex-icon">
                    <span className="btn-icon">
                      <i
                        className="fab fa-github"
                        style={{ fontSize: "25px" }}
                      ></i>
                    </span>
                    <span className="btn-tex">GitHub</span>
                  </span>
                </button>

                <button className="button-login btn-microsoft ">
                  <span className="login-tex-icon">
                    <span className="btn-icon">
                      <svg viewBox="0 0  19 19" className="login-way-icon">
                        <g fill="none" fillRule="evenodd">
                          <path fill="#F25022" d="M0 0h9v9H0z"></path>
                          <path fill="#00A4EF" d="M0 10h9v9H0z"></path>
                          <path fill="#7FBA00" d="M10 0h9v9h-9z"></path>
                          <path fill="#FFB900" d="M10 10h9v9h-9z"></path>
                        </g>
                      </svg>
                    </span>
                    <span className="btn-tex">Microsoft</span>
                  </span>
                </button>
              </div>
              <div className="login-data">
                <p className="hr">
                  <span>OR</span>
                </p>
                <div>
                  {this.state.err ? (
                    <span className=" boxerrer">{this.state.err}</span>
                  ) : (
                    <span></span>
                  )}

                  <form onSubmit={this.handelsubmit}>
                    <div className="inp-lab">
                      <label htmlFor="Email">Work Email</label>
                      <input
                        name="email"
                        type="email"
                        onChange={this.handlechange}
                        className="input-login"
                        id="email"
                        placeholder="you@company.com"
                        aria-describedby="email"
                      />
                      <span className="error">
                        {this.state.email.length > 0 && this.state.errors.email
                          ? ($(`#email`).removeClass("input-login"),
                            $(`#email`).addClass("input-error"),
                            this.state.errors.email)
                          : ($(`#email`).removeClass("input-error"),
                            $(`#email`).addClass("input-login"),
                            (<span></span>))}
                      </span>
                    </div>
                    <div className="inp-lab">
                      <label htmlFor="Password" className="lable-lab">
                        Password
                        <Link to="/login" className="forget-pass">
                          Froget Password?
                        </Link>
                      </label>
                      <input
                        name="password"
                        type="password"
                        onChange={this.handlechange}
                        className="input-login"
                        id="Password"
                        placeholder="8+ Characters"
                        aria-describedby="Password"
                      />
                      <span className="error">
                        {this.state.password.length > 0 &&
                        this.state.errors.password
                          ? ($(`#Password`).removeClass("input-login"),
                            $(`#Password`).addClass("input-error"),
                            this.state.errors.password)
                          : ($(`#Password`).removeClass("input-error"),
                            $(`#Password`).addClass("input-login"),
                            (<span></span>))}
                      </span>
                    </div>
                    <div>
                      <button
                        id="login-button"
                        className="button-login btn-login"
                        disabled="disabled"
                      >
                        Log in
                      </button>
                      <p className="lable-lab signup-line">
                        <p className="p-m">
                          Don't have an account?{" "}
                          <Link to="/login" className=" signup">
                            {" "}
                            Sign up
                          </Link>
                        </p>
                        <Link to="/" className="signup"><p className="p-m">Login via SSO</p></Link>{" "}
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              <div className="login-data">
                <p className="trusted-company">Trusted by the top companies.</p>
                <p className="lable-lab logos p-m">
                 
                    <svg viewBox="0 0 39 28" className="lo-loges" style={{ width: "30" }}>
                      <path d="M0 .462h5.925v16.156c0 2.563 1.14 4.076 2.068 4.724-.966.855-3.895 1.62-6.108-.226C.59 20.036 0 18.24 0 16.56V.462zm37.009 13.426v-1.7h1.817V6.246h-1.991C36.071 2.662 32.94 0 29.19 0c-4.311 0-7.82 3.565-7.82 7.946v13.877c1.228.177 2.697-.02 3.944-1.09 1.295-1.08 1.885-2.877 1.885-4.557v-.52h2.957V9.704H27.2V7.906c0-1.12.889-2.023 1.99-2.023 1.102 0 1.992.904 1.992 2.023v5.962c0 4.39 3.508 7.955 7.819 7.955v-5.932a1.994 1.994 0 0 1-1.991-2.003zM14.595 6.227v8.75a.909.909 0 0 1-.909.895.9.9 0 0 1-.899-.894V6.227H6.93V16.49c0 1.847.609 4.184 3.431 4.95 2.813.757 4.427-.825 4.427-.825-.155 1.041-1.102 1.808-2.658 1.965-1.18.117-2.677-.285-3.421-.6v5.442c1.904.58 3.914.766 5.905.363 3.586-.697 5.848-3.742 5.848-7.808V6.187h-5.867v.04z"></path>
                    </svg>
                

                    <svg viewBox="0 0 853.3 150.1"className="lo-loges" style={{ width: "70" }}>
                      <path d="M0,147.3V0h65.7c28,0,42.4,17.9,42.4,37.5c0,18.3-11.5,30.9-25.4,33.8c15.9,2.4,28.3,17.7,28.3,36   c0,22.3-14.6,40-42.8,40H0z M76.1,43.1c0-9.1-6.6-15.5-17.2-15.5H31.4v30.9h27.5C69.5,58.5,76.1,52.6,76.1,43.1z M79,102.9   c0-9.3-6.6-16.8-18.8-16.8H31.4v33.6h28.9C71.9,119.7,79,113.5,79,102.9z" />
                      <path d="M119.6,104.6v-64h28.2v63.1c0,12.7,7.7,21.9,22.7,21.9c14.8,0,22.6-9.2,22.6-21.9V40.6h28.1v63.9   c0,26.8-16.1,45.6-50.6,45.6C136.1,150.1,119.6,131.1,119.6,104.6z" />
                      <path d="M230.5,147.3v-21l48.1-61.2h-48.1V40.6h86.3v20.1l-49,62.1h49.9v24.5H230.5z" />
                      <path d="M326.9,147.3v-21L375,65.1h-48.1V40.6h86.3v20.1l-49,62.1h49.9v24.5H326.9z" />
                      <path d="M424.6,147.3V0h102.2v27.6H456v30.9h53.3v27.6H456v61.2H424.6z" />
                      <path d="M517.2,93.9c0-30.9,23-55.9,55.2-55.9c32,0,53.4,23.9,53.4,58.5v6.6h-79.3c2,13,12.6,23.9,30.7,23.9   c9.1,0,21.4-3.8,28.3-10.4l12.6,18.6c-10.6,9.7-27.4,14.8-43.9,14.8C541.7,150,517.2,128.1,517.2,93.9z M572.4,61   c-17.4,0-25,12.1-26.1,22.7h52.6C598,73.5,590.9,61,572.4,61z" />
                      <path d="M633.4,93.9c0-30.9,23-55.9,55.2-55.9c32,0,53.4,23.9,53.4,58.5v6.6h-79.3c2,13,12.6,23.9,30.7,23.9   c9.1,0,21.4-3.8,28.3-10.4l12.6,18.6c-10.6,9.7-27.4,14.8-43.9,14.8C657.9,150,633.4,128.1,633.4,93.9z M688.6,61   c-17.4,0-25,12.1-26.1,22.7h52.6C714.2,73.5,707.1,61,688.6,61z" />
                      <path d="M752.3,147.5V40.4h43c33.7,0,58,20.2,58,53.5c0,33.2-24.2,53.6-57.8,53.6H752.3z M826,93.9   c0-16.6-10-30.4-29.6-30.4H779v60.9h17.4C815.1,124.4,826,109.8,826,93.9z" />
                    </svg>
               
                
                    <svg viewBox="0 0 66 17" className="lo-loges" style={{ width: "70" }}>
                      <path d="M13.296 9.43c-1.965 0-3.558 1.558-3.558 3.479s1.593 3.479 3.558 3.479c1.965 0 3.558-1.558 3.558-3.48 0-1.92-1.593-3.478-3.558-3.478zM7.116 12.91c0-1.922-1.593-3.48-3.558-3.48-1.966 0-3.559 1.558-3.559 3.48 0 1.92 1.593 3.478 3.559 3.478 1.965 0 3.558-1.557 3.558-3.479zM7.87.865c1.921 0 3.48 1.593 3.48 3.558 0 1.966-1.559 3.559-3.48 3.559-1.92 0-3.479-1.593-3.479-3.559 0-1.965 1.558-3.558 3.48-3.558zM26.785 11.219c-1.426 0-2.582-1.143-2.582-2.552 0-1.41 1.156-2.552 2.583-2.552 1.426 0 2.582 1.142 2.582 2.552 0 1.41-1.156 2.552-2.582 2.552zm2.59.323c0 .234.415.89.923.89h.328c.128 0 .232-.1.232-.224V5.225h-.001a.228.228 0 0 0-.23-.212h-1.02a.229.229 0 0 0-.23.212h-.001v.567c-.624-.743-1.608-1.051-2.594-1.051-2.243 0-4.06 1.757-4.06 3.926 0 2.168 1.817 3.926 4.06 3.926.986 0 2.061-.37 2.594-1.052v.002zm3.916-1c.68.455 1.422.677 2.135.677.68 0 1.382-.341 1.382-.934 0-.791-1.53-.914-2.492-1.23-.962-.316-1.79-.97-1.79-2.027 0-1.62 1.492-2.288 2.884-2.288.882 0 1.792.282 2.382.685.204.148.08.32.08.32l-.564.777c-.063.088-.194.158-.332.069-.38-.243-.803-.477-1.566-.477-.945 0-1.361.38-1.361.85 0 .564.665.741 1.444.933 1.357.354 2.838.78 2.838 2.388 0 1.427-1.38 2.308-2.905 2.308-1.155 0-2.14-.319-2.964-.904-.172-.166-.052-.32-.052-.32l.56-.775c.115-.145.258-.094.321-.052zm12.678 1c0 .234.414.89.921.89h.33c.127 0 .23-.1.23-.224V5.225a.229.229 0 0 0-.23-.212H46.2a.229.229 0 0 0-.23.212h-.001v.567c-.624-.743-1.608-1.051-2.594-1.051-2.243 0-4.061 1.757-4.061 3.926 0 2.168 1.818 3.926 4.06 3.926.987 0 2.062-.37 2.595-1.052v.001zm-2.59-.323c-1.427 0-2.583-1.143-2.583-2.552 0-1.41 1.156-2.552 2.582-2.552s2.583 1.142 2.583 2.552c0 1.41-1.157 2.552-2.583 2.552zm13.197.563V8.17c0-2.037-1.33-3.412-3.45-3.412-1.011 0-1.839.566-2.132 1.052v-.007l-.002.006c0-.492-.413-.778-.921-.778h-.327a.229.229 0 0 0-.232.224v6.984h.001a.228.228 0 0 0 .23.212h1.02c.015 0 .03-.002.045-.005l.02-.005.022-.007.026-.013.012-.007a.252.252 0 0 0 .029-.022l.005-.004a.219.219 0 0 0 .07-.15h.002V8.114c0-1.094.917-1.982 2.05-1.982 1.13 0 2.048.888 2.048 1.982v3.448l.001-.001v.678h.002a.228.228 0 0 0 .23.212h1.019c.016 0 .03-.002.046-.005.006 0 .011-.003.017-.005l.025-.007.024-.013.014-.007a.268.268 0 0 0 .027-.02l.007-.006a.218.218 0 0 0 .07-.149h.002v-.456zm7.942-.24c0 .234.414.89.921.89h.33c.127 0 .231-.1.231-.224V5.225h-.001a.229.229 0 0 0-.23-.212H64.75a.228.228 0 0 0-.23.212h-.002v.567c-.624-.743-1.608-1.051-2.595-1.051-2.242 0-4.06 1.757-4.06 3.926 0 2.168 1.818 3.926 4.06 3.926.987 0 2.062-.37 2.595-1.052v.001zm-2.59-.323c-1.427 0-2.583-1.143-2.583-2.552 0-1.41 1.156-2.552 2.583-2.552 1.425 0 2.581 1.142 2.581 2.552 0 1.41-1.156 2.552-2.581 2.552z"></path>
                    </svg>
                  
                 
                    <svg className="lo-loges"
                      viewBox="0 0 640 185"
                      style={{ width: "70" }}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#fff"
                        stroke="#fff"
                        strokeWidth=".094"
                        d="M0 0h640v185H0V0m133.1 18.2c-.1 6.7-.1 13.4-.1 20.1-6.9.1-13.8.1-20.7 0v10.2c6.9 0 13.8-.1 20.7.1v20.2c3.3 0 6.6 0 9.9.1.1-6.8 0-13.6 0-20.3 6.6-.1 13.3-.2 19.9.1.4-3.5.2-7 .1-10.4-6.7.1-13.3.1-20 0V18.2h-9.8M20.4 38.3v122.3c40.8 0 81.6-.1 122.5.1.2-24.9 0-49.8 0-74.7H133v64.3c-34.1.2-68.3.1-102.4.1V48.5c21.5 0 43 .1 64.5-.1-.2-3.4 0-6.8-.2-10.1-24.9.2-49.7 0-74.5 0m160.9.1c-.2.3-.6.7-.8.9-.1 38.6 0 77.2 0 115.8.1 1.8-.4 3.9.6 5.6 146.2-.2 292.3-.1 438.5-.1V38.4c-146.1.1-292.2 0-438.3 0M61.2 69.1c.1 3.3.1 6.6 0 9.8 5.7.2 11.3.1 17 .1 0 13.7.1 27.3 0 41-5.7.1-11.4-.1-17 .1.1 3.3.1 6.6 0 9.8 14.6.1 29.2 0 43.8.1v-10c-5.5-.1-11.1.3-16.6-.3.1-16.9 0-33.8 0-50.7-9.1.1-18.1-.1-27.2.1z"
                      />
                      <path
                        fill="black"
                        stroke="black"
                        strokeWidth=".094"
                        d="M133.1 18.2h9.8v20.1c6.7.1 13.3.1 20 0 .1 3.4.3 6.9-.1 10.4-6.6-.3-13.3-.2-19.9-.1 0 6.7.1 13.5 0 20.3-3.3-.1-6.6-.1-9.9-.1V48.6c-6.9-.2-13.8-.1-20.7-.1V38.3c6.9.1 13.8.1 20.7 0 0-6.7 0-13.4.1-20.1zM20.4 38.3c24.8 0 49.6.2 74.5 0 .2 3.3 0 6.7.2 10.1-21.5.2-43 .1-64.5.1v101.9c34.1 0 68.3.1 102.4-.1V86h9.9c0 24.9.2 49.8 0 74.7-40.9-.2-81.7-.1-122.5-.1V38.3zM181.3 38.4c146.1 0 292.2.1 438.3 0v122.2c-146.2 0-292.3-.1-438.5.1-1-1.7-.5-3.8-.6-5.6 0-38.6-.1-77.2 0-115.8.2-.2.6-.6.8-.9m52.2 31.4c-6.8 1.7-13.2 5.7-17.1 11.6-8.3 12.4-6.9 30.8 4.1 41.1 12.4 11.3 34.4 10.3 45-3 9.8-12.4 8.8-32.3-3.1-43.1-7.7-6.9-18.9-8.9-28.9-6.6m49.2-.9c-.1 20.4-.1 40.9-.1 61.3 3.4 0 6.8 0 10.2-.1-.2-14 .3-28.1-.2-42.1l1.1.6c9.8 13.1 19.7 26.1 29.5 39.2 2.2 3.6 7.1 2.3 10.6 2.1-.2-20.2-.1-40.5-.1-60.7-3.4-.1-6.9-.5-10.3 0 .2 14-.2 28 .2 41.9-10.7-13.2-20.9-26.9-31.4-40.3-2.1-3-6.4-1.2-9.5-1.9m64.5.1c.1 20.4 0 40.7 0 61 12.5.1 25.1.2 37.6-.1-.1-2.9-.1-5.8-.1-8.7-9 0-18-.2-27 0-.4-6.1-.4-12.3 0-18.5 6.7.2 13.4.1 20.1.1 0-2.8 0-5.7-.1-8.6-6.7.2-13.4-.1-20.1.2-.5-5.4.1-10.9-.3-16.3 9.1-.7 18.3-.1 27.5-.3-.1-2.9-.1-5.9 0-8.8-12.5-.2-25.1-.2-37.6 0m51 .1c.1 20.2.1 40.5 0 60.8 2.8 0 5.5 0 8.2.1v-23.8c6.5-.2 13.3.7 19.6-1.3 5-1.6 9.6-5.1 11.6-10 2.8-6.6 1.8-15-3.3-20.2-4.2-4.2-10.5-5.6-16.3-5.8-6.6 0-13.2-.2-19.8.2m51.4 61.1c11.3-.2 22.5 0 33.8 0 0-2.4.1-4.7-.1-7-8.6.2-17.1 0-25.7.1 0-18.1-.1-36.1.1-54.1-2.7-.5-5.4-.3-8.1-.4-.3 20.5-.4 41 0 61.4M490.2 69c.1 11.7 0 23.3 0 35-.2 5.5.7 11.3 3.8 16 6.7 10.9 22.5 13.3 33 7 6.9-4.1 10.7-12.1 10.8-20 .1-12.7 0-25.4 0-38.1-2.7 0-5.4-.1-8.1-.1V106c.1 4.9-1.5 10.1-5.2 13.4-5.9 5.3-15.8 5.1-21.5-.5-3.3-3.3-4.7-8.2-4.7-12.9 0-12.4.1-24.8 0-37.1-2.7-.1-5.4-.1-8.1.1m69.7 2.8c-7.9 4.6-10.1 16.5-4.2 23.5 3.8 4.4 9.8 5.7 15.2 7.5 3.8 1.2 8.2 2.7 9.8 6.7 1.7 4.8-.7 10.8-5.4 12.8-4.8 2.1-10.7 1.6-15.3-1.1-2.1-1-3.7-3.1-6.1-3.7-2.2.7-3 3.3-4 5.3 7.6 7.5 20.2 10.1 29.9 4.9 8.7-4.6 12.2-17.6 6-25.5-5.9-6.7-15.9-6.3-22.9-11.3-4.7-3.3-3.5-11.1 1.3-13.7 5.8-3.2 13.1-1.5 18.1 2.4 3.1 2 4.1-2.8 5.3-4.7-7.3-6.7-19.2-8.3-27.7-3.1z"
                      />
                      <path
                        fill="black"
                        stroke="black"
                        strokeWidth=".094"
                        d="M61.2 69.1c9.1-.2 18.1 0 27.2-.1 0 16.9.1 33.8 0 50.7 5.5.6 11.1.2 16.6.3v10c-14.6-.1-29.2 0-43.8-.1.1-3.2.1-6.5 0-9.8 5.6-.2 11.3 0 17-.1.1-13.7 0-27.3 0-41-5.7 0-11.3.1-17-.1.1-3.2.1-6.5 0-9.8z"
                      />
                      <path
                        fill="#fff"
                        stroke="#fff"
                        strokeWidth=".094"
                        d="M233.5 69.8c10-2.3 21.2-.3 28.9 6.6 11.9 10.8 12.9 30.7 3.1 43.1-10.6 13.3-32.6 14.3-45 3-11-10.3-12.4-28.7-4.1-41.1 3.9-5.9 10.3-9.9 17.1-11.6m.9 9.8c-5.8 2-9.9 7.3-11.1 13.2-1.4 6.8-1 14.3 2.8 20.2 6.8 10.5 25 10.4 31.4-.5 2.9-4.9 3.5-10.8 2.9-16.4-.5-5.4-2.8-11-7.3-14.2-5.3-3.9-12.6-4.3-18.7-2.3zM282.7 68.9c3.1.7 7.4-1.1 9.5 1.9 10.5 13.4 20.7 27.1 31.4 40.3-.4-13.9 0-27.9-.2-41.9 3.4-.5 6.9-.1 10.3 0 0 20.2-.1 40.5.1 60.7-3.5.2-8.4 1.5-10.6-2.1-9.8-13.1-19.7-26.1-29.5-39.2l-1.1-.6c.5 14 0 28.1.2 42.1-3.4.1-6.8.1-10.2.1 0-20.4 0-40.9.1-61.3zM347.2 69c12.5-.2 25.1-.2 37.6 0-.1 2.9-.1 5.9 0 8.8-9.2.2-18.4-.4-27.5.3.4 5.4-.2 10.9.3 16.3 6.7-.3 13.4 0 20.1-.2.1 2.9.1 5.8.1 8.6-6.7 0-13.4.1-20.1-.1-.4 6.2-.4 12.4 0 18.5 9-.2 18 0 27 0 0 2.9 0 5.8.1 8.7-12.5.3-25.1.2-37.6.1 0-20.3.1-40.6 0-61zM398.2 69.1c6.6-.4 13.2-.2 19.8-.2 5.8.2 12.1 1.6 16.3 5.8 5.1 5.2 6.1 13.6 3.3 20.2-2 4.9-6.6 8.4-11.6 10-6.3 2-13.1 1.1-19.6 1.3V130c-2.7-.1-5.4-.1-8.2-.1.1-20.3.1-40.6 0-60.8m8.2 6.2v24.4c4.1 0 8.2.1 12.3-.1 4.2-.3 8.7-2.3 10.7-6.2 2.8-5.2 1.9-13-3.7-16.1-6-3.1-12.9-1.6-19.3-2zM449.6 130.2c-.4-20.4-.3-40.9 0-61.4 2.7.1 5.4-.1 8.1.4-.2 18-.1 36-.1 54.1 8.6-.1 17.1.1 25.7-.1.2 2.3.1 4.6.1 7-11.3 0-22.5-.2-33.8 0zM490.2 69c2.7-.2 5.4-.2 8.1-.1.1 12.3 0 24.7 0 37.1 0 4.7 1.4 9.6 4.7 12.9 5.7 5.6 15.6 5.8 21.5.5 3.7-3.3 5.3-8.5 5.2-13.4V68.8c2.7 0 5.4.1 8.1.1 0 12.7.1 25.4 0 38.1-.1 7.9-3.9 15.9-10.8 20-10.5 6.3-26.3 3.9-33-7-3.1-4.7-4-10.5-3.8-16 0-11.7.1-23.3 0-35zM559.9 71.8c8.5-5.2 20.4-3.6 27.7 3.1-1.2 1.9-2.2 6.7-5.3 4.7-5-3.9-12.3-5.6-18.1-2.4-4.8 2.6-6 10.4-1.3 13.7 7 5 17 4.6 22.9 11.3 6.2 7.9 2.7 20.9-6 25.5-9.7 5.2-22.3 2.6-29.9-4.9 1-2 1.8-4.6 4-5.3 2.4.6 4 2.7 6.1 3.7 4.6 2.7 10.5 3.2 15.3 1.1 4.7-2 7.1-8 5.4-12.8-1.6-4-6-5.5-9.8-6.7-5.4-1.8-11.4-3.1-15.2-7.5-5.9-7-3.7-18.9 4.2-23.5z"
                      />
                      <path
                        fill="black"
                        stroke="black"
                        strokeWidth=".094"
                        d="M406.4 75.3c6.4.4 13.3-1.1 19.3 2 5.6 3.1 6.5 10.9 3.7 16.1-2 3.9-6.5 5.9-10.7 6.2-4.1.2-8.2.1-12.3.1V75.3zM234.4 79.6c6.1-2 13.4-1.6 18.7 2.3 4.5 3.2 6.8 8.8 7.3 14.2.6 5.6 0 11.5-2.9 16.4-6.4 10.9-24.6 11-31.4.5-3.8-5.9-4.2-13.4-2.8-20.2 1.2-5.9 5.3-11.2 11.1-13.2z"
                      />
                    </svg>
                  
                 
                    <svg viewBox="0 0 600 100" className="lo-loges" style={{ width: "120" }}>
                      <path
                        d="M72.64,64.86c-3.46,8.06-11.21,13.35-19.98,13.39c-7.53,0-13.83-5.39-17.81-9.96c-4.28-5.42-7.93-11.32-10.87-17.58
		c-1.03-2.93-1.11-4.72,0-5.68c1.11-0.97,3.34-0.26,4.54,1.23c1.2,1.49,8.79,11.51,9.02,12.01c0.24,0.51,0.81,0.75,1.35,0.59
		c0.48-0.4,0.55-1.12,0.15-1.61l0,0L26.67,39.66c-1.11-1.53-0.78-3.67,0.75-4.79c0.04-0.02,0.07-0.05,0.1-0.07
		c1.62-1.11,3.82-0.73,4.98,0.85l10.49,14.33c0.24,0.49,0.84,0.7,1.33,0.45c0.02-0.01,0.05-0.02,0.07-0.04
		c0.5-0.35,0.35-1.05,0-1.55L32.56,30.82c-1.11-1.53-0.78-3.67,0.75-4.79c0.04-0.02,0.07-0.05,0.1-0.07
		c1.61-1.12,3.83-0.75,4.98,0.85L51.16,45.5c0.35,0.47,1,0.85,1.49,0.5c0.5-0.35,0.29-1.08,0-1.61c-1.61-2.67-7.21-12.25-8.14-13.94
		s-1.14-3.4,0-4.19s3.66-0.38,6.86,2.93c3.9,4.79,7.36,9.9,10.37,15.29c0.26,0.45,0.57,0.85,0.94,1.2c1.23,1.2,2.08,0.97,2.61-0.18
		s1.23-9.26,5.86-9.08c1.67,0,2.93,1.67,3.54,5.86C76.1,49.84,75.39,57.66,72.64,64.86z M80.75,41.42
		c-0.85-7.15-4.16-10.84-9.26-10.99c-3.42-0.2-6.69,1.43-8.58,4.28c-2.06-3.39-4.39-6.61-6.97-9.61c-6.5-7-11.72-6.09-14.65-4.04
		c-3.35-2.43-7.87-2.52-11.31-0.21c-2.7,1.81-4.3,4.86-4.25,8.12c-2.97,1.27-5.09,3.94-5.65,7.12c-0.28,1.35-0.28,2.75,0,4.1
		l-0.5,0.44c-2.93,2.93-3.54,6.97-1.52,12.39c3.22,6.89,7.27,13.37,12.04,19.31c7,8.03,14.65,12.1,22.47,12.1
		c11.29-0.01,21.47-6.78,25.84-17.2c3.19-8.24,4.02-17.21,2.4-25.9"
                      />

                      <path
                        d="M66.16,63.54c-1.77-3.67-2.76-7.65-2.93-11.72c0-0.86-0.7-1.55-1.55-1.55c-0.84,0-1.52,0.68-1.52,1.52
		c0,0.01,0,0.02,0,0.03c0.16,4.57,1.27,9.06,3.25,13.18c0.41,0.75,1.35,1.03,2.11,0.62l0,0c0.74-0.4,1.03-1.32,0.62-2.06
		c0-0.01-0.01-0.01-0.01-0.02 M56.82,50.94c0.49,0.69,0.33,1.64-0.36,2.12c-0.01,0.01-0.01,0.01-0.02,0.01
		c-3.59,2.88-6.58,6.43-8.79,10.46c-0.44,0.73-1.38,0.97-2.11,0.53c-0.73-0.44-0.97-1.38-0.53-2.11l0,0
		c2.42-4.4,5.71-8.26,9.67-11.37c0.7-0.5,1.66-0.34,2.17,0.35l0,0"
                      />
                      <path
                        d="M502.65,60.3l-7.9-23.8h-14.5l15.5,38.8c-0.9,1.2-1.9,1.6-3.3,1.6c-1.5,0-3.8-0.8-6.1-2.1l-4.2,9.7
		c3.6,2.1,7.7,3.4,12.6,3.4c7.9,0,11.6-3.6,15-12.8l14.5-38.5h-14.2L502.65,60.3z"
                      />
                      <path
                        d="M468.55,76.8c3.9,0,7.2-0.9,9.6-2.3V63.7c-1.7,0.8-3.4,1.3-5.3,1.3c-2.6,0-3.8-1.2-3.8-3.9V47.6h9.2
		V36.5h-9.2v-10h-13.7v10h-4.7v11.1h4.7v16.1C455.35,73.2,460.25,76.8,468.55,76.8L468.55,76.8z"
                      />
                      <path d="M420.85,76h13.9V63.7c0-9.1,4.1-13.2,11.3-13.2h1.2V35.9c-6.6-0.3-10.2,3.2-12.5,8.6v-8h-13.9V76z" />
                      <path
                        d="M410.6,40.7c-3.1-3.1-8-4.8-15-4.8c-6.8,0-11.5,1.2-16,3.1l2.8,9.7c3.6-1.3,6.8-2.2,11-2.2
		c5.3,0,7.9,2.3,7.9,6.5v0.7c-2.3-0.9-5.8-1.5-9.5-1.5c-9.3,0-15.5,4.2-15.5,12.4v0.1c-0.1,7.8,5.6,12.2,13.1,12.2
		c5.2,0,8.9-2,11.7-5V76h13.7V53.3C414.8,47.8,413.6,43.7,410.6,40.7z M401.3,61.7c0,3.9-2.9,6.5-7,6.5c-2.8,0-4.9-1.6-4.9-4.3v-0.1
		c0-3,2.3-4.9,6.4-4.9c2,0,4,0.4,5.5,1V61.7z"
                      />
                      <path
                        d="M354.75,35.7c-5.9,0-9.3,2.8-12,6.1v-5.3h-13.9v51.2h0.1h13.9V71.2c2.6,3,6.1,5.7,12,5.7
		c9.3,0,17.4-7.8,17.4-20.7v-0.1C372.25,43.5,364.15,35.7,354.75,35.7z M358.75,56.3c0,5.3-3.7,9-8.1,9c-4.5,0-8.1-3.7-8.1-9v-0.1
		c0-5.3,3.6-9,8.1-9s8.1,3.7,8.1,9V56.3z"
                      />
                      <path
                        d="M323.25,57.2c0-11.6-6.3-21.6-19.9-21.6c-11.7,0-19.9,9.1-19.9,20.7v0.1c0,12.2,8.8,20.5,21.2,20.5
		c7.8,0,13.3-3.2,17.1-8l-7.7-6.4c-2.8,2.8-5.4,4-8.8,4c-4.3,0-7.4-2.2-8.5-6.5h26.4C323.25,59.1,323.25,58,323.25,57.2z M296.55,53
		c0.7-4.4,3.2-7.2,6.9-7.2c3.8,0,6.4,2.8,6.9,7.2H296.55z"
                      />
                      <path
                        d="M263.15,76.9c9.6,0,16.1-4.5,16.1-13.2v-0.1c0-7.7-6.2-10.4-14-12.6c-4.1-1.2-6.4-2-6.4-3.5v-0.1
		c0-1.2,1.1-2,3.2-2c3.1,0,7.6,1.4,11.7,3.7l4.7-8.8c-4.5-2.9-10.5-4.6-16.3-4.6c-9.1,0-15.8,4.7-15.8,13.1v0.1
		c0,7.9,6.2,10.5,14,12.6c4.2,1.2,6.4,1.8,6.4,3.4V65c0,1.4-1.2,2.1-3.6,2.1c-4.1,0-9-1.5-13.5-4.5l-5.2,8.3
		C249.95,74.9,256.55,76.9,263.15,76.9L263.15,76.9z"
                      />
                      <path
                        d="M214.65,76.9c5.6,0,9.3-3.1,11.8-6.4V76h13.8V36.5h-13.8v21.4c0,4.3-2.5,6.6-5.8,6.6
		c-3.4,0-5.6-2.3-5.6-6.6V36.5h-13.9v25.8C201.15,71.3,206.25,76.9,214.65,76.9z"
                      />
                      <path
                        d="M174.35,76.9c12.7,0,21.9-9.4,21.9-20.7v-0.1c0-11.2-9.1-20.5-21.8-20.5c-12.6,0-21.8,9.4-21.8,20.7
		v0.1C152.65,67.7,161.85,76.9,174.35,76.9L174.35,76.9z M174.55,65.2c-4.9,0-8.4-4.1-8.4-8.9v-0.1c0-4.8,3.2-8.8,8.2-8.8
		c4.9,0,8.5,4.1,8.5,9v0.1C182.85,61.2,179.55,65.2,174.55,65.2z"
                      />

                      <polygon
                        points="99.75,76 113.95,76 113.95,56.6 132.15,56.6 132.15,76 146.25,76 146.25,24.9 132.05,24.9 
		132.05,44 113.85,44 113.85,24.9 99.75,24.9 	"
                      />
                    </svg>
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
