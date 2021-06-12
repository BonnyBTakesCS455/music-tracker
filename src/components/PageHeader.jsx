import styled from "styled-components";
import profile_icon from '../icons/profile_icon.png';

const Img = styled.img`
  position: relative;
  padding: 16px 16px;
`;

const Title = styled.div`
  font-size: 72px;
  font-weight: bold;
  white-space: nowrap;
  position: relative;
  padding: 16px 16px;
`;

const PageHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

function PageHeader(props) {
    return (
        <PageHeaderContainer>
            <Img src={profile_icon} width={128} height={128} />
            <Title>{props.title}</Title>
        </PageHeaderContainer>
    )
}

export default PageHeader;