import React from "react";


class SkillLevel extends React.Component {
  render() {
    let skillLevel;
    switch (true) {
      case (this.props.wpm < 30):
        skillLevel = "Cadet"
        break;
      case (this.props.wpm > 30 && this.props.wpm < 60):
        skillLevel = "Pilot"
        break;
      case (this.props.wpm >= 60 && this.props.wpm < 80):
        skillLevel = "Flight Engineer"
        break;
      case (this.props.wpm >= 80 && this.props.wpm < 100):
        skillLevel = "Commander"
        break;
      case (this.props.wpm >= 100 && this.props.wpm < 200):
        skillLevel = "Cosmonaut"
        break;
      case (this.props.wpm >= 200):
        skillLevel = "Cheater";
        break;
      default:
        skillLevel = "Calibrating...";
    }
    return (
      <p className="profile-skill-level">{skillLevel}</p>
      )
  }
}

export default SkillLevel