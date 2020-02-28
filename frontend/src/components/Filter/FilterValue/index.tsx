import React from "react";
import { IFilter } from "..";

export interface IFilterType {
  label: "string";
  prefix:
    | ""
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "range"
    | "in"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "between"
    | "like"
    | "ilike"
    | "in"
    | "start"
    | "istart"
    | "end"
    | "iend";
}

const selectOptions = {
  NUMBER: [
    { label: "É igual a", prefix: "" },
    { label: "Está em", prefix: "in" },
    { label: "Maior", prefix: "gt" },
    { label: "Maior igual", prefix: "gte" },
    { label: "Menor", prefix: "lt" },
    { label: "Menor igual", prefix: "lte" },
    { label: "Está entre", prefix: "between" }
  ],
  TEXT: [
    { label: "É igual a", prefix: "" },
    { label: "Contém", prefix: "like" },
    { label: "Está em", prefix: "in" },
    { label: "Começa com", prefix: "start" },
    { label: "Termina com", prefix: "end" }
  ],
  DATE: [
    { label: "É igual a", prefix: "" },
    { label: "Maior", prefix: "gt" },
    { label: "Maior igual", prefix: "gte" },
    { label: "Menor", prefix: "lt" },
    { label: "Menor igual", prefix: "lte" },
    { label: "Está entre", prefix: "between" }
  ]
};

export interface OwnProps {
  filter: IFilter;
}
type Props = OwnProps;
const FilterValue: React.FC<Props> = ({ filter }) => {
  function handleSubmit() {}
  function handleFilterChange() {}
  return (
    <i>CARAIO</i>
  );
};

export default FilterValue;
