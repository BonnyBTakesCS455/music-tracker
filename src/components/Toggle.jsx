import styled from 'styled-components'

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
border: 0;
clip: rect(0 0 0 0);
clippath: inset(50%);
height: 1px;
margin: -1px;
overflow: hidden;
padding: 0;
position: absolute;
white-space: nowrap;
width: 1px;
`

const StyledCheckbox = styled.div`
display: inline-block;
width: 44px;
height: 28px;
background: ${p => p.checked ? p.theme.body : '#ccc'};
border-radius: 1000px;
transition: all 150ms;
margin-right: 0.5em;
`

const CheckboxContainer = styled.div`
display: inline-block;
vertical-align: middle;
position: relative;
`

const Slider = styled.div`
position: absolute;
top: 4px;
${p => p.checked ? 'left: 4px;' : 'left: 20px;'}
transition: all 150ms;
width: 20px;
height: 20px;
border-radius: 40px;
background: white;
`

const Checkbox = ({ className, checked, ...props }) => (
<CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked} />
    <Slider checked={checked} />
</CheckboxContainer>
)

export default Checkbox