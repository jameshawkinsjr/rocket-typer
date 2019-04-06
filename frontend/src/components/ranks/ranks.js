import React from 'react';
import SkillLevelContainer from "../profile/skill";
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function Ranks() {

  return (
    <div className="skills-container flex-column">
        <div className="skills-container-row flex"><div><h1>Ranks</h1></div></div>
        <div className="skills-container-row flex"><div><p> 0 - 30 wpm </p></div><SkillLevelContainer wpm={0}/></div>
        <div className="skills-container-row flex"><div><p> 30 - 60 wpm </p></div><SkillLevelContainer wpm={40}/></div>
        <div className="skills-container-row flex"><div><p> 60 - 80 wpm </p></div><SkillLevelContainer wpm={70}/></div>
        <div className="skills-container-row flex"><div><p> 80 - 100 wpm </p></div><SkillLevelContainer wpm={90}/></div>
        <div className="skills-container-row flex"><div><p> 100 - 200 wpm </p></div><SkillLevelContainer wpm={110}/></div>
    </div>
  )

}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Ranks));