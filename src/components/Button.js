import styled from 'styled-components'

const Button = styled.button`
    border: none;
    font-weight: bold;
    cursor: pointer;
    background: #1DB954;
    border-radius: 30px;
    padding: 1em;
    color: white;
    min-width: 100px;
    transition: background 200ms;
    &:hover {
        background: #1ED760;
    }
`

export default Button