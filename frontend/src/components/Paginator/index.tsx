import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import { usePaginatedQuery } from "react-query";

import { range } from "lodash";

import api, { PaginationResponse } from "@services/api";


interface Props<T>{
  url: string,
  pageSize: number,
  renderItem(item:T): React.ReactNode
}

function Paginator<T>({ url, pageSize = 10, renderItem }:Props<T>) {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  async function loadPage(key:string, page = 1) {
    const { data } = await api.get<PaginationResponse<T>>(`${url}?page=${page}&page_size=${pageSize}`);

    const { data: items, total } = data;

    setMaxPage(Math.ceil(total / pageSize));

    return items;
  }
  const { resolvedData } = usePaginatedQuery(["services", page], loadPage);


  return (
    <>
      {resolvedData?.map(item => renderItem(item))}
      <Col md={12} className="d-flex justify-content-end">

        <Pagination>
          <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
          <Pagination.Prev disabled={page === 1} onClick={() => setPage(page => page - 1)} />

          <Pagination.Next disabled={page === maxPage} onClick={() => setPage(page => page + 1)} />
          <Pagination.Last disabled={page === maxPage} onClick={() => setPage(maxPage)} />
        </Pagination>
      </Col>
    </>
  );
}

export default Paginator;
