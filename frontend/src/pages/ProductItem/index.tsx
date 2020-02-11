import React from "react";

import { SessionState } from "@ducks/session/types";
import { Container } from "./styles";
import DataTable from "./DataTable";

interface StateProps extends SessionState {}

type Props = StateProps;

const ProductItem: React.FC = () => {
  return (
    <Container className="row col-md-12">
      <DataTable />
    </Container>
  );
};

export default ProductItem;
