import React, { useState, useEffect, useCallback } from "react";


interface OwnProps<>{
  items: any[],
  renderItem(item:any):React.ReactNode | React.ReactNode[]
  loader: React.ReactNode | React.ReactNode[],
  loadMore(page:number):void,
  hasMore: boolean
}

type Props = OwnProps
const InfiniteList :React.FC<Props> = ({
  items, renderItem, loader, loadMore, hasMore,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isFetching) return;
    setPage(page + 1);
  }, [isFetching, loader, page]);

  useEffect(() => {
    if (hasMore) loadMore(page);
  }, [hasMore, loadMore, page]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <ul>
        {items.map(item => (
          renderItem(item)
        ))}
      </ul>
      {isFetching && loader}
    </>
  );
};

export default InfiniteList;
