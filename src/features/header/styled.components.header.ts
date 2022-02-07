import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`
w-full
text-gray-300
flex
justify-around
items-center
pt-3
pb-1
border-b border-solid border-gray-500
`}
`;

export const BPMBox = styled.div`
  ${tw`
p-2
w-max
border border-black border-solid 
text-tiny
rounded-sm
`}
  box-shadow:inset 0px 0px 2px 0px white;
  span {
    ${tw`
    text-red-300
    font-bold
    `}
  }
`;
export const DurationBox = styled.div`
  ${tw`
p-2
w-max
text-tiny
`}
  span {
    ${tw`
    text-red-300
    font-bold
    `}
  }
`;
