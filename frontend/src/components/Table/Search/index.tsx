import React from "react";
import { InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

import { Form } from "@unform/web";
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
    <Form onSubmit={handleSubmit} initialData={initialData}>
      <InputGroup className="text-primary font-weight-bold">
        <InputGroup.Append>
          <Button type="submit" variant="primary">
            <FaSearch />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default Search;
