import React from 'react';
import { Link } from 'react-router-dom';


class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            numRaces: 20,
            averageSpeed: 100,
        };
        this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutCurrentUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.getLinks();
        }
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className="modal-buttons flex">
                    <span className="nav-bar-stats flex">
                    <div className="nav-bar-stats-item" >Welcome <span><Link to={'/profile'}>{this.props.user.username}</Link></span></div>
                    |
                    <div className="nav-bar-stats-item" >Total Races <span>{ this.state.numRaces }</span></div>
                    |
                    <div className="nav-bar-stats-item" >Average Speed <span>{ this.state.averageSpeed } WPM</span></div>
                    </span>
                    <button className="button" onClick={this.logoutCurrentUser}>Logout </button>
                </div>
            );
        } else {
            return (
                <div className="modal-buttons flex">
                    <button className="button" onClick={() => this.props.openModal('login')}>Login</button>
                    <button className="button" onClick={() => this.props.openModal('signup')}>Signup</button>
                </div>
            )
        }
    }

    render () {
        return (
            <div className="navbar-container flex">
                <div className="navbar-logo">
                    <Link to={'/'}>
                        <i className="fas fa-user-astronaut"></i>
                        <span className="logo">Rocket Typer</span>
                        {/* <i className="fas fa-rocket"></i> */}
                    </Link>
                </div>
                { this.getLinks() }
            </div>
        )
    }
}

export default NavBar;