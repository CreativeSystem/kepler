/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from "react";
import AutoSizer from "react-virtualized/dist/es/AutoSizer";
import Grid from "react-virtualized/dist/es/Grid";
import InfiniteLoader from "react-virtualized/dist/es/InfiniteLoader";

import Pagination from "@components/Pagination";
import api, { PaginationResponse } from "@services/api";


import SeviceCard, { CardData } from "./Card";
import { Container } from "./styles";

type Response = PaginationResponse<CardData>

const Services : React.FC = () => {
  const [services, setServices] = useState<CardData[]>();
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadServices() {
      setLoading(true);
      const { data } = await api.get<Response>(`/api/services/?page=${page}&page_size=10`);
      setLoading(false);
      const { data: services, page_size, total } = data;
      setPageTotal(Math.floor(total / page_size));
      setServices((oldServices) => {
        if (!oldServices) {
          return services;
        }

        return [...oldServices, ...services];
      });
    }

    loadServices();
  }, [page]);

  return (
    <Pagination
      hasMore={page !== pageTotal}
      loading={loading}
      onScrollEnd={() => setPage(page + 1)}
      loader={() => <div>Carregando</div>}
      threshold={0.4}
    >
      <Container>
        {services?.map(service => <SeviceCard key={service.id} data={service} />)}
      </Container>
    </Pagination>
  );
};

export default Services;
