import styled from "styled-components";

import Loading from "@components/Loading";
import DT from "react-data-table-component";

export const Container = styled.div`
  position: relative;
  width: 100%;
  box-shadow: 1px 1px 5px rgba(33, 33, 33, 0.4);
  margin: 10px 0px;
`;

export const DataTable = styled(DT)``;

export const Loader = styled(Loading)`
  height: 20%;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-self: flex-start;
  -webkit-justify-self: flex-start;
  align-items: center;
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;
