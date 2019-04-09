import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import SocketContext from '../../api/socket-context';
import WaitingRoom from './waiting_room';

const WaitingRoomWithSocket = props => (
	<SocketContext.Consumer>
		{socket => <WaitingRoom {...props} socket={socket} />}
	</SocketContext.Consumer>
)

const mapStateToProps = (state) => ({
    user: state.session.user,
    loggedIn: state.session.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
	openModal: (modal) => dispatch(openModal(modal)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WaitingRoomWithSocket));