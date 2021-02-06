import './ToggleSwitch.css';
import React, { Component } from 'react';

class ToggleSwitch extends Component {
  render() {
    return (
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          onClick={() => this.props.toggleValue('gameOn')}
          name={this.props.Name}
          id={this.props.Name}
        />
        <label className="toggle-switch-label" htmlFor={this.props.Name}>
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
    );
  }
}

export default ToggleSwitch;
