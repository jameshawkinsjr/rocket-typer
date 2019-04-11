import React from 'react';

class SessionForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            formType: '',
            errors: {}
          };
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.clearedErrors = false;
    }


    componentDidMount() {
        this.checkFormType();
    }

    componentWillReceiveProps(nextProps) {
      this.setState({errors: nextProps.errors});
    }

    checkFormType() {
        if (this.props.formType === 'login'){
            this.setState( {formType: "Login"});
        } else if (this.props.formType === 'signup'){
            this.setState( {formType: "Signup"});
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.formType!== prevProps.formType) {
            this.checkFormType();
            this.props.clearErrors();
        }

    }

    handleUpdate(field) {
        return e => this.setState({
          [field]: e.currentTarget.value
        });
      }

    handleSignup(e) {
        e.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password,
        };
        this.props.signup(user, this.props.history)
            .then ( () =>  {
                if (this.props.errors.length === 0 ) {
                    this.props.closeModal();
                    this.props.history.push("/profile");
                }
        });
    }

    handleLogin(e) {
        e.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password,
        };

        this.props.login(user)
        .then ( () =>  {
            if (this.props.errors.length === 0 ) {
                this.props.loadingModal();
                this.props.history.push("/profile");
            }
        });
    }
    
    renderErrors() {
        return (
            <> 
                {Object.keys(this.state.errors).map( (error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </>
        );
    }
    

    render() {
        return (
            <div className="session-form-container flex-column">
                <div className="session-form-header flex">
                    <h2> {this.state.formType === "Signup" ? "Sign Up" : "Login" }</h2>
                </div>
                <form className="session-form" onSubmit={ this.state.formType === "Signup" ? this.handleSignup : this.handleLogin }>
                    <div className="session-form-inputs flex-column">
                            <div className="session-form-input flex">
                                <span>Username: </span><input type="text"
                                value={this.state.username}
                                onChange={this.handleUpdate('username')}
                            />
                            </div>
                            <div className="session-form-input flex"> 
                                <span>Password:</span><input type="password"
                                value={this.state.password}
                                autoComplete="current-password"
                                onChange={this.handleUpdate('password')}
                            />
                            </div>
                            <input className="submit-button button" type="submit" value="Submit" />
                    </div>
                </form>
            <div className="alternate-buttons flex-column">
                <div className="flex">
                { this.props.formType === 'signup' ?
                    <>
                        <p>Already a Rocketnaut?</p>
                        <button className="button" onClick={this.props.openLoginModal}>Login</button>
                    </>
                    :
                    <>
                        <p>Don't have an account?</p>
                        <button className="button" onClick={this.props.openSignupModal}>Sign Up</button>
                    </>
                }
                </div>
                <ul className="errors">{this.renderErrors()}</ul>
            </div>
            </div>
        );
      }




}

export default SessionForm;