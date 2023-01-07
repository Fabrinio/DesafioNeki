import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 6%;
  background-color: #2d939c;
  align-items: center;
  align-content: center;
  display: flex;
  padding-top: 0%;
`;

export const ButtonExit = styled.div`
  margin-right: 100%;
  /* margin-left: 10%; */
`;

export const Logotype = styled.div`
  margin-right: 72rem;
  margin-left: 2rem;
  flex-direction: column;
`;

export const Image = styled.img`
  width: 100%;
`;

export const BemVindo = styled.h2`
  text-align: center;
  margin-top: 3%;
`;

export const DivRefresh = styled.h2`
  text-align: center;
  align-items: center;
  margin-top: 3%;
  width: 100%;
`;

export const DivModal = styled.h2`
  text-align: center;
  align-items: center;
  margin-left: -15%;
  margin-right: 5%;
  width: 20%;
`;

export const Span = styled.span`
  color: whitesmoke;
  font-family: "League Spartan", sans-serif;
  font-weight: 300;
`;

export const ContainerList = styled.ul`
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
  list-style: none;
  display: grid;
  /* aqui ta deixando responsivo com o minmax */
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  column-gap: 3rem;
  row-gap: 4rem;
`;

export const ContainerButtons = styled.div`
  flex-direction: column;
  justify-content: space-between;
  margin-left: 4%;
`;

export const ContainerGridLevel = styled.div`
  margin-left: 10%;
  margin-top: -2%;
`;

export const ContainerSpans = styled.div`
  flex-direction: column;
`;
