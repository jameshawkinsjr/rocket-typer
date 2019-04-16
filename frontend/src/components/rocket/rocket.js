import React from 'react';
import { connect } from 'react-redux';

function Rocket( {progress, username}) {

  // To build dynamic rocket icons
  // https://icons8.com/icons/set/rocket

  let leftWidth = (progress);
  let rightWidth = (100-progress);

  return (
      <div className="rocket-container flex">
        <div className="rocket-left" style={{width: `${leftWidth}%`} }><p>{ username }</p></div>
        <img className="rocket-img" alt="rocket-ship" src="https://img.icons8.com/color/96/ffffff/launched-rocket.png" />
        <div className="rocket-right" style={{width: `${rightWidth}%`}}><pre> </pre></div>
      </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  progress: ownProps.progress,
  username: ownProps.username,
});

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Rocket);
