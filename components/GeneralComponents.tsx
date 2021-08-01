import Colours from './Colours';
import styled, { css } from 'styled-components';

export const H1 = styled.div`
font-family: Circular Std;
font-style: normal;
font-weight: 900;
font-size: 36px;
line-height: 46px;
`;

export const H2 = styled.div`
font-style: normal;
font-weight: bold;
font-size: 24px;
line-height: 30px;
color: ${Colours.DarkGrey};
`;
export const P1 = styled.div`
font-style: normal;
font-weight: normal;
color: ${Colours.DarkGrey};
`;
export const P2 = styled.div`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 18px;
color: ${Colours.MediumGrey};
`;
export const H3 = styled.div`
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 25px;
color: ${Colours.DarkGrey};
`;
export const Input = styled.input`
height: 50px;
width: 400px;
background: ${Colours.White};
border: 2px solid ${Colours.OffWhite};
box-sizing: border-box;
border-radius: 5px;
font-size: 17px;
padding: 5px;
margin-bottom: 5px;
padding-left: 20px;
@media (max-width: 600px){
  width: 100%;
}
`;
export const Header = styled.div`
font-family: 'CircularStd-Black';
font-size: 40px;
line-height: 1.2;
margin-bottom: 10px;
@media(max-width:900px){
  line-height: 1;
}
`;
export const SubHeader = styled.div`
color: '#000';
margin-top: 15px;
font-size: 17px;
margin-bottom: 25px;
`;
export const Button = styled.a`
display: flex;
align-items: center;
justify-content: center;
height: 45px;
border-radius: 6px;
border: 2px solid ${Colours.Blue};
padding: 15px;
font-size: 14px;
background: white;
margin-right: 10px;
color: ${Colours.Blue};
&:hover {
  color: ${Colours.Blue};
  transform: scale(1.05);
}
  ${props => props.primary && css`
    background: ${Colours.Blue};
    color: white;
    &:hover {
      color: white;
      transform: scale(1.05);
    }
  `}
`;
export const JPButton = styled.div`
font-weight: bold;
display: flex;
align-items: center;
text-align: center;
justify-content: center;
background: ${Colours.Blue};
padding: 5px;
width: 210px;
height: 45px;
border-radius: 20px;
color: ${Colours.White};
cursor: pointer;
&:hover {
  color: ${Colours.White};
  transform: scale(1.05);
}
@media (max-width:600px){
  width: 100%;
}

  ${props => props.disabled && css`
    background: ${Colours.LightGrey};
    color: white;
    &:hover {
      color: white;
      transform: scale(1);
      cursor: default;
    }
  `}
`;

export const JPTransparentButton = styled.div`
display: flex;
align-items: center;
text-align: center;
justify-content: center;
border: 1px solid ${Colours.Blue};
padding: 5px;
width: 210px;
height: 45px;
cursor: pointer;
border-radius: 20px;
background: ${Colours.White};
color: ${Colours.Blue};
&:hover {
  color: ${Colours.Blue};
  transform: scale(1.05);
}
@media (max-width:600px){
  width: 100%;
}
`;

const Image = styled.img`
height: 145px;
width: 145px;
border-radius: 72.5px;
border: 5px solid ${Colours.BrightYellow};
`;

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  text-align: center;
  align-items: center;
`;
