import React, { useEffect, useCallback, useRef } from "react";

interface OwnProps{
  loading?: boolean
  loader?(): React.ReactNode
  threshold?:number
  hasMore?: boolean
  onScrollEnd?():void
}

type Props = JSX.IntrinsicElements["div"] & OwnProps;

const Pagination : React.FC<Props> = ({
  children, threshold = 0, hasMore = true, loader, loading = false, onScrollEnd, ...rest
}) => {
  const paginationRef = useRef<HTMLDivElement>(null);
  const isBottom = useCallback(() => {
    const bottom = paginationRef.current?.getBoundingClientRect().bottom;

    return bottom && bottom <= ((1 + threshold) * window.innerHeight);
  }, [threshold]);

  const onScroll = useCallback(() => {
    if (isBottom()) {
      document.removeEventListener("scroll", onScroll);
      if (onScrollEnd) {
        onScrollEnd();
      }
    }
  }, [isBottom, onScrollEnd]);

  useEffect(() => {
    if (hasMore) {
      document.addEventListener("scroll", onScroll);
    } else {
      document.removeEventListener("scroll", onScroll);
    }
  }, [onScroll, hasMore]);

  return (
    <>
      <div ref={paginationRef} {...rest}>
        {children}
      </div>
      {loading && loader && loader()}
    </>
  );
};

export default Pagination;
