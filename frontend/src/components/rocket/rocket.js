import React from 'react';
import { connect } from 'react-redux';

function Rocket( {currentProgress, totalLength}) {

  // To build dynamic rocket icons
  // https://icons8.com/icons/set/rocket

  let leftWidth = (currentProgress / totalLength) * 100;
  let rightWidth = ((totalLength - currentProgress) / totalLength) * 100;

  return (
      <div className="rocket-container flex">
        <div className="rocket-left" style={{width: `${leftWidth}%`} }> </div>
        <img className="rocket-img" alt="rocket-ship" src="https://img.icons8.com/color/96/ffffff/launched-rocket.png" />
        <div className="rocket-right" style={{width: `${rightWidth}%`}}><pre> </pre></div>
      </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
    currentProgress: ownProps.currentProgress,
    totalLength: ownProps.totalLength,
});

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Rocket);
