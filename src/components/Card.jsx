  
import styled from 'styled-components'

const Card = styled.div`
  box-shadow: 2px 2px 10px #000000ee;
  width: ${p => p.width || '200px'};
  height: ${p => p.height || '300px'};
  // margin: 2em 2em 0 0;
  background-color: #fff;
  border-radius: 14px;
  padding: ${p => p.padding || '1em'};
  text-align: left;
`

export default Card