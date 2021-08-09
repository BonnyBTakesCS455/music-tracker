import React from "react";
import { connect } from "react-redux";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(p) => p.theme.background};
  }
`;

function mapStateToProps(state) {
  return {
    isDarkModeEnabled: state.userSettings.isDarkModeEnabled,
  };
}

const darkTheme = {
  background: "#262626",
  body: "#1DB954",
};

const lightTheme = {
  ...darkTheme,
  background: "#fff",
};

const CustomThemeProvider = ({ children, isDarkModeEnabled }) => {
  const selectedTheme = isDarkModeEnabled ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default connect(mapStateToProps, null)(CustomThemeProvider);
