import React from "react";
import { IDataTableColumn } from "react-data-table-component";

import Table from "@components/Table";
import { IFilter, FilterDataType } from "~/components/Filter";
import { format } from "date-fns";

const columns: IDataTableColumn<any>[] = [
  {
    name: "ID",
    selector: "id",
    sortable: true,
  },
  {
    name: "Nome",
    selector: "name",
    sortable: true,
  },
  {
    name: "Criado em",
    selector: "created_at",
    sortable: true,
    format: row => format(new Date(row.created_at), "dd/MM/yyyy HH:mm"),
  },
];

const filters: IFilter[] = [
  {
    name: "ID",
    selector: "id",
    type: FilterDataType.NUMBER,
  },
];
const DataTable: React.FC = () => (
  <Table
    title="Lista de Ingredientes"
    url="/api/product-items/"
    columns={columns}
    filters={filters}
    defaultSortField="id"
  />
);

export default DataTable;
