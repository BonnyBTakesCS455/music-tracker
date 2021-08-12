import styled from "styled-components";
import profile_icon from "../icons/Dot_Hollow.png";
import copy_icon from "../icons/copy.png";

const Img = styled.img`
  position: relative;
  padding: 16px 16px;
`;

const Title = styled.h1`
  font-size: 1.5em;
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

const Icon = styled.img`
  position: relative;
  max-width: 24px;
  max-height: 24px;
`;

const CopyText = styled.div`
  font-size: 10px;
`;

const Copy = styled.div`
  cursor: pointer;
`;

function PageHeader(props) {
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(props.spotifyId);
    } catch (err) {
      // Oh well
    }
  };

  return (
    <PageHeaderContainer>
      <Img src={profile_icon} width={72} height={72} />
      <Title>{props.title}</Title>
      <Copy onClick={handleClick}>
        <Icon alt="copy" src={copy_icon} />
        <CopyText>Copy ID</CopyText>
      </Copy>
    </PageHeaderContainer>
  );
}

export default PageHeader;
