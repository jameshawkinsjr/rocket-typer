import React from 'react';
import { Link } from 'react-router-dom';


class NavBar extends React.Component {
    constructor(props){
        super(props);
        let { numRaces, avgSpeed } = this.props;
        this.state = {
            numRaces,
            avgSpeed,
        };
        this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutCurrentUser(e) {
        this.props.logout();
    }
    componentDidMount() {
        if (this.props.loggedIn){
            this.props.fetchUserStats(this.props.user.username)
            .then( res => {
                if (res.userStats) {
                    let numRaces = res.userStats.data[0] ? res.userStats.data[0].numRaces : 0;
                    let avgSpeed = res.userStats.data[0] ? Math.floor(res.userStats.data[0].avgSpeed) : 0;
                    this.setState( {numRaces: numRaces, avgSpeed: avgSpeed});
                }
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.getLinks();
            if (this.props.loggedIn){
                this.props.fetchUserStats(this.props.user.username)
                .then( res => {
                    if (res.userStats) {
                        let numRaces = res.userStats.data[0] ? res.userStats.data[0].numRaces : 0;
                        let avgSpeed = res.userStats.data[0] ? Math.floor(res.userStats.data[0].avgSpeed) : 0;
                        this.setState( {numRaces: numRaces, avgSpeed: avgSpeed});
                    }
                });
            }
        }
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className="modal-buttons flex">
                    <span className="nav-bar-stats flex">
                    <div className="nav-bar-stats-item" >Welcome <span><Link to={'/profile'}>{this.props.user.username}</Link></span></div>
                    <div className="nav-bar-stats-item" >Total Races <span>{ this.state.numRaces }</span></div>
                    <div className="nav-bar-stats-item" >Average Speed <span>{ this.state.avgSpeed } WPM</span></div>
                    <div className="nav-bar-stats-item" ><span><Link to={'/profile'}>Your Profile</Link></span></div>
                    <div className="nav-bar-stats-item logout-button" onClick={() => this.logoutCurrentUser()}>Logout</div>
                    </span>
                </div>
            );
        } else {
            return (
                <div className="modal-buttons flex">
                    <button className="button" onClick={() => this.props.openModal({ type: 'login'})}>Login</button>
                    <button className="button" onClick={() => this.props.openModal({ type: 'signup'})}>Signup</button>
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
                    </Link>
                </div>
                { this.getLinks() }
            </div>
        )
    }
}

export default NavBar;