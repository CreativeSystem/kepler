import React, { useEffect, useState, useMemo } from "react";
import { IDataTableColumn } from "react-data-table-component";

import Filter, { IFilter } from "@components/Filter";
import api from "@services/api";


import Search from "./Search";
import {
  Loader,
  Container,
  DataTable,
  FilterContainer,
  Filters,
} from "./styles";

interface OwnProps {
  title?: string;
  columns: IDataTableColumn<any>[];
  filters: IFilter[];
  url: string;
  defaultSortField: string;
}

type Props = OwnProps;

interface PaginationResponse {
  total: number;
  data: Array<any>;
}

interface Response {
  data: PaginationResponse;
}

const paginationOptions = {
  rowsPerPageText: "Items por página",
  rangeSeparatorText: "de",
};

const Table: React.FC<Props> = ({
  title,
  columns,
  url,
  defaultSortField,
  filters,
}) => {
  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState(defaultSortField);
  const [search, setSearch] = useState("");

  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false,
  );

  useEffect(() => {
    setLoading(true);
    api
      .get(
        `${url}?page=${page}&page_size=${perPage}&ordering=${order}&search=${search}`,
      )
      .then(({ data: { total, data } }: Response) => {
        setTotalRows(total);
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [url, page, perPage, order, search]);

  const subHeaderComponentMemo = useMemo(() => {
    const onSearch = (search: string) => {
      setResetPaginationToggle(!resetPaginationToggle);
      setSearch(search);
    };

    return (
      <FilterContainer>
        <Search onSearch={onSearch} search={search} />
        <Filters>
          <Filter filters={filters} />
        </Filters>
      </FilterContainer>
    );
  }, [search, resetPaginationToggle, filters]);

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    setPerPage(newPerPage);
    setPage(page);
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const handleSort = (column: IDataTableColumn<any>, sortDirection: string) => {
    setOrder(`${sortDirection === "desc" && "-"}${column.selector}`);
  };

  return (
    <Container>
      <DataTable
        columns={columns}
        data={data}
        title={title}
        persistTableHead
        fixedHeader
        fixedHeaderScrollHeight="90%"
        progressPending={loading}
        progressComponent={<Loader />}
        pagination
        paginationComponentOptions={paginationOptions}
        paginationServer
        paginationTotalRows={totalRows}
        paginationResetDefaultPage={resetPaginationToggle}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        sortServer
        onSort={handleSort}
        defaultSortField={defaultSortField}
        subHeader
        subHeaderAlign="start"
        subHeaderComponent={subHeaderComponentMemo}
      />
    </Container>
  );
};
export default Table;
