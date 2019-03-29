import React from 'react';
import {Animated} from "react-animated-css";
import 'react-awesome-button/dist/styles.css';

class SessionForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        };

        this.props.signup(user, this.props.history)
            .then ( () =>  {
                if (this.props.errors.length === 0 ) {
                    this.props.closeModal();
                }
        });
    }

    handleLogin(e) {
        e.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.login(user)
        .then ( () =>  {
            if (this.props.errors.length === 0 ) {
                this.props.closeModal();
            }
        });
    }
    
    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map( (error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }
    

    render() {
        const altButtonStyle = this.props.formType === 'login' ? {top: '320px'} : {top: '390px'}

        return (
            <>
            <div className="session-form-container flex">
                <form className="flex" onSubmit={ this.state.formType === "Signup" ? this.handleSignup : this.handleLogin }>
                <Animated animationIn="bounceInLeft" animationOut="rubberBand" isVisible={true}>
                <div className="session-form flex">
                    { this.state.formType === "Signup" ? (
                    <input type="text"
                    value={this.state.name}
                    onChange={this.handleUpdate('name')}
                    placeholder="Name"
                    />
                    ) : ( "" )
                    }
                    <input type="text"
                        value={this.state.email}
                        onChange={this.handleUpdate('email')}
                        placeholder="Email"
                    />
                    <input type="password"
                        value={this.state.password}
                        onChange={this.handleUpdate('password')}
                        placeholder="Password"
                    />
                    <input className="input-submit" type="submit" value="Submit" />
                    {/* <button onClick={() => this.props.openModal('login')}>Login</button> */}

                </div>
                    </Animated>
                </form>
                <div className="session-img">
                    <img src="https://media.giphy.com/media/RLxLgDyVSxs9G/giphy.gif" alt="session" />
                </div>
            </div>
            <div className="alternate-buttons" style={altButtonStyle}>
                { this.props.formType === 'signup' ?
                    <>
                        <span>Already a member?</span>
                        <button onClick={this.props.openLoginModal}>Login</button>
                    </>
                    :
                    <>
                        <span>New to <span role="img" aria-label="flexing-emoji">️💪</span> Invest?</span>
                        <button onClick={this.props.openSignupModal}>Sign Up</button>
                    </>
                }
                <span>{this.renderErrors()}</span>
            </div>
            </>
        );
      }




}

export default SessionForm;
