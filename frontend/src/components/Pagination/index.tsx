import React, { useEffect, useCallback, useRef } from "react";

interface OwnProps{
  loading?: boolean
  loader?(): React.ReactNode
  threshold?:number
  hasMore?: boolean
  onScrollEnd?():void
  onRenderFinish?():void
}

type Props = JSX.IntrinsicElements["div"] & OwnProps;

const Pagination : React.FC<Props> = ({
  children, threshold = 0, hasMore = true, loader, loading = false, onScrollEnd, onRenderFinish, ...rest
}) => {
  const paginationRef = useRef<HTMLDivElement>(null);
  const isBottom = useCallback(() => {
    const domRect = paginationRef.current?.getBoundingClientRect();
    const bottom = domRect?.bottom || 0;
    const height = domRect?.height || 0;
    return bottom <= threshold * height + window.innerHeight;
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
    if (onRenderFinish) {
      onRenderFinish();
    }
  }, [onRenderFinish]);

  useEffect(() => {
    if (hasMore && !loading) {
      document.addEventListener("scroll", onScroll);
    } else {
      document.removeEventListener("scroll", onScroll);
    }
  }, [onScroll, hasMore, loading]);

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
