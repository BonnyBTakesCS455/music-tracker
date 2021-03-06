import React from "react";
import { connect } from "react-redux";
import { toggleDarkMode } from "../state/management/userSettings";
import Toggle from "./Toggle";
import Button from "./Button";

function mapStateToProps(state) {
  return {
    isDarkModeEnabled: state.userSettings.isDarkModeEnabled,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleDarkMode: (mode) => dispatch(toggleDarkMode(mode)),
  };
}

function Settings({ logout, isDarkModeEnabled, toggleDarkMode }) {
  return (
    <>
      <h1>Account Settings</h1>
      <label>
        <Toggle
          checked={isDarkModeEnabled}
          onChange={() => toggleDarkMode(!isDarkModeEnabled)}
        />
        <span>Dark mode</span>
      </label>
      <br />
      <Button onClick={logout}>Logout</Button>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
