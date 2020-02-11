import React from "react";
import Table from "@components/Table";
import { IDataTableColumn } from "react-data-table-component";
import { format } from "date-fns";
import { IFilter, FilterDataType } from "~/components/Filter";

const columns: IDataTableColumn<any>[] = [
  {
    name: "ID",
    selector: "id",
    sortable: true
  },
  {
    name: "Nome",
    selector: "name",
    sortable: true
  },
  {
    name: "Criado em",
    selector: "created_at",
    sortable: true,
    format: row => {
      return format(new Date(row.created_at), "dd/MM/yyyy HH:mm");
    }
  }
];

const filters: IFilter[] = [
  {
    name: "ID",
    selector: "id",
    type: FilterDataType.NUMBER
  }
];
const DataTable: React.FC = () => {
  return (
    <Table
      title="Lista de Ingredientes"
      url="/api/product-items/"
      columns={columns}
      filters={filters}
      defaultSortField="id"
    />
  );
};

export default DataTable;
