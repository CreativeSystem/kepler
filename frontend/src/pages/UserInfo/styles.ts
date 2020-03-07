import { Card as BCard } from "react-bootstrap";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
`;

export const Card = styled(BCard)`
  display: flex;
  .card-title {
    text-align: center;
  }
  width:100%;
  max-width:450px;
`;

export const InterestsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;
