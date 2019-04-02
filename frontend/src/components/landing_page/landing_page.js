import React from 'react';
// import { Link } from 'react-router-dom';


class LandingPage extends React.Component {

    componentDidMount() {
        this.props.fetchTopRaces();
    }

    render () {
        return (
            <div className="landing-page-container">
            </div>
        )
    }
}

export default LandingPage;