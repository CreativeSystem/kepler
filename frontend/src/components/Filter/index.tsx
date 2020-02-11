import React, { useState, useEffect } from "react";

import { Container } from "./styles";
import { DropdownItemProps, DropdownProps } from "semantic-ui-react";
import FilterContext from "./context";
import FilterValue from "./FilterValue";

export enum FilterDataType {
  TEXT = "TEXT",
  DATE = "DATE",
  NUMBER = "NUMBER"
}

export interface IFilter {
  name: string;
  selector: string;
  type: FilterDataType;
}

interface OwnProps {
  filters: IFilter[];
}

type Props = OwnProps;

const Filter: React.FC<Props> = ({ filters }) => {
  const [options, setOptions] = useState<DropdownItemProps[]>();
  const [currentFilter, setCurrentFilter] = useState<IFilter>();

  useEffect(() => {
    setOptions(
      filters.map<DropdownItemProps>((filter, index) => ({
        key: index,
        text: filter.name,
        value: index
      }))
    );
  }, [filters]);

  function handleFilterOnChange(
    _event: React.SyntheticEvent<HTMLElement>,
    { value }: DropdownProps
  ) {
    const filter = filters.find((_, index) => {
      return index === value;
    });

    setCurrentFilter(filter);
  }

  return (
    <FilterContext.Provider value={null}>
      <Container
        text="Filtros"
        icon="filter"
        labeled
        button
        floating
        className="icon"
        onChange={handleFilterOnChange}
        options={options}
      />
      {currentFilter && <FilterValue filter={currentFilter} />}
    </FilterContext.Provider>
  );
};

export default Filter;
