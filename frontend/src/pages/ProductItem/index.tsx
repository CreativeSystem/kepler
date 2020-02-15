import React from "react";

import { SessionState } from "@ducks/session/types";

import DataTable from "./DataTable";
import { Container } from "./styles";

type StateProps = SessionState

type Props = StateProps;

const ProductItem: React.FC = () => (
  <Container className="row col-md-12">
    <DataTable />
  </Container>
);

export default ProductItem;
