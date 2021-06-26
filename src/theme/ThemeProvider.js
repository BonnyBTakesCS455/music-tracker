import React from 'react'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components'

function mapStateToProps(state) {
    return {
        isDarkModeEnabled: state.userSettings.isDarkModeEnabled
    }
}

const darkTheme = {
    background: '#262626',
    body: '#1DB954'
}

const lightTheme = {
    ...darkTheme,
    background: '#fff',
}

const CustomThemeProvider = ({ children, isDarkModeEnabled }) => {
    const selectedTheme = isDarkModeEnabled ? darkTheme : lightTheme
    
    return <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
}

export default connect(mapStateToProps, null)(CustomThemeProvider);