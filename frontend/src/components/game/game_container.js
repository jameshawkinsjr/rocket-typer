import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { randomPhrase } from './phrases';

import Game from './game';

const mapStateToProps = function(state) {
		let phrase = randomPhrase();
		return ({
			phrase: phrase,
			phraseWords: phrase.split(" "),
			phraseLength: phrase.split("").length,
		});
};

export default withRouter(connect(mapStateToProps, null)(Game));