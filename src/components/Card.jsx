  
import styled from 'styled-components'

// CSS added to button for Spotify Login Component to make it look nicer

const Card = styled.div`
  box-shadow: 2px 2px 10px #000000ee;
  width: ${p => p.width || '200px'};
  height: ${p => p.height || '300px'};
  // margin: 2em 2em 0 0;
  background-color: #fff;
  border-radius: 14px;
  padding: ${p => p.padding || '1em'};
  text-align: left;
  & > button {
    padding-right: 1rem;
  }
`

export default Card