import React, { useState, useCallback } from "react";

import InfiniteList from "@components/InfiniteList";
import api from "@services/api";

interface PaginationResponse {
  total: number;
  data: any[];
}

interface Response {
  data: PaginationResponse;
}

interface OwnProps{
  url: string,
  renderItem(item:any):React.ReactNode | React.ReactNode[]
  search:string
}

type Props = OwnProps;

const List: React.FC<Props> = ({ url, renderItem, search }) => {
  const [items, setItems] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const load = useCallback((page:number) => {
    api
      .get(`${url}?search=${search}&page=${page}`)
      .then(({ data: { total, data } }: Response) => {
        setItems([...items, ...data]);
        setHasMore(page !== total);
      });
  }, [items, search, url]);

  return (
    <InfiniteList
      items={items}
      renderItem={item => renderItem(item)}
      loader={<div>Carregando</div>}
      loadMore={page => load(page)}
      hasMore={hasMore}
    />
  );
};

export default List;
