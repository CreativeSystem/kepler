import React, { useState } from "react";
import Col from "react-bootstrap/Col";

import Paginator from "~/components/Paginator";
import ServiceCard from "~/components/ServiceCard";
import { Service } from "~/types";

// import { Container } from './styles';

const HiredServices: React.FC = () => {
  const [t, setT] = useState(1);

  return (
    <div className="d-flex flex-column w-100">
      <h3 className="text-center text-bold">Histórico de Serviços</h3>
      <div className="d-flex flex-wrap">
        <Paginator<Service>
          url="/api/services/"
          pageSize={30}
          renderItem={item => (
            <Col xl="3" lg="4" md="4" sm="6" xs="12" className="mb-3 d-flex justify-content-center" key={item.id}>
              <ServiceCard data={item} />
            </Col>
          )}
        />
      </div>
    </div>
  );
};

export default HiredServices;
