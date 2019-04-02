import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { randomPhrase } from './phrases'

import Game from './game';

const mapStateToProps = (state) => ({
		phrase: randomPhrase()
});

export default withRouter(connect(mapStateToProps, null)(Game));