import React from "react";

import { InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Button from "~/components/Button";
interface OwnProps {
  onSearch(seach: string): void;
  search?: string;
}
type Props = OwnProps;

const Search: React.FC<Props> = ({ onSearch, search }) => {
  const initialData = {
    search
  };

  const handleSubmit = ({ search }: any) => {
    onSearch(search);
  };

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "") {
      onSearch("");
    }
  };

  return (
    <></>
  );
};

export default Search;
