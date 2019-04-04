import React from 'react';
import { connect } from 'react-redux';

function Rocket( {currentProgress, totalLength}) {
  return (
      <div className="rocket-container flex-column">
        <div className="rocket-above" style={{height: `${(totalLength - currentProgress) *100}px`}}>
        </div>
        <div className="rocket-below" style={{height: `${currentProgress * 100}px`}}> 
        <i className="fas fa-rocket"/>
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
