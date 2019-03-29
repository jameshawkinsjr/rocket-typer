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
            name: this.state.name,
            username: this.state.username,
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
            username: this.state.username,
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
                <div className="session-form flex">
                    <input type="text"
                        value={this.state.username}
                        onChange={this.handleUpdate('username')}
                        placeholder="Username"
                    />
                    <input type="password"
                        value={this.state.password}
                        onChange={this.handleUpdate('password')}
                        placeholder="Password"
                    />
                    <input className="input-submit" type="submit" value="Submit" />
                </div>
                </form>
            </div>
            <div className="alternate-buttons" style={altButtonStyle}>
                { this.props.formType === 'signup' ?
                    <>
                        <span>Already a member?</span>
                        <button onClick={this.props.openLoginModal}>Login</button>
                    </>
                    :
                    <>
                        <span>Don't have an account?</span>
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
