import React from 'react';
import { connect } from 'react-redux';

function Rocket( {currentProgress, totalLength}) {


  // To build dynamic rocket icons
  // https://icons8.com/icons/set/rocket

  return (
      <div className="rocket-container flex-column">
        <div className="rocket-above" style={{height: `${(totalLength - currentProgress) *100}px`}}>
        </div>
        <img src="https://img.icons8.com/color/96/ffffff/launched-rocket.png" />
        <div className="rocket-below" style={{height: `${currentProgress * 100}px`}}> 
        <pre> </pre>
        </div>
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
