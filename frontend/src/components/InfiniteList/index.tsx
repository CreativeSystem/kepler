/* eslint-disable no-plusplus */
import React, { useRef } from "react";
import {
  InfiniteLoader, List, WindowScroller, AutoSizer, IndexRange,
} from "react-virtualized";

interface Props{
  hasMore: boolean,
  items : any[],
  loadMore(params:IndexRange): Promise<any>,
  onEmpityList?():JSX.Element,
  renderRow(itemIndex:any):React.ReactNode,
  container: React.ComponentType<any>

}

const InfiniteList: React.FC<Props> = ({
  hasMore, items, loadMore, onEmpityList, renderRow, container: Container,
}) => {
  const infiniteLoaderRef = useRef<InfiniteLoader>(null);

  function generateIndexesForRow(rowIndex:number, maxItemsPerRow:number, itemsAmount:number) {
    const result = [];
    const startIndex = rowIndex * maxItemsPerRow;

    for (let i:number = startIndex; i < Math.min(startIndex + maxItemsPerRow, itemsAmount); i++) {
      result.push(i);
    }

    return result;
  }

  function getMaxItemsAmountPerRow(width:number) {
    return Math.max(Math.floor(width / 341.5), 1);
  }

  function getRowsAmount(width:number, itemsAmount:number, hasMore:boolean) {
    const maxItemsPerRow = getMaxItemsAmountPerRow(width);

    return Math.ceil(itemsAmount / maxItemsPerRow) + (hasMore ? 1 : 0);
  }

  return (
    <AutoSizer disableHeight>
      {({ width }) => {
        const rowCount = getRowsAmount(width, items.length, hasMore);

        return (
          <InfiniteLoader
            ref={infiniteLoaderRef}
            rowCount={rowCount}
            isRowLoaded={({ index }) => {
              const maxItemsPerRow = getMaxItemsAmountPerRow(width);
              const allItemsLoaded = generateIndexesForRow(index, maxItemsPerRow, items.length).length > 0;

              return !hasMore || allItemsLoaded;
            }}
            loadMoreRows={loadMore}
          >
            {({ onRowsRendered, registerChild }) => (
              <WindowScroller>
                {({ height, scrollTop }) => (
                  <List
                    autoHeight
                    ref={registerChild}
                    height={height}
                    scrollTop={scrollTop}
                    width={width}
                    rowCount={rowCount}
                    rowHeight={391.583}
                    onRowsRendered={onRowsRendered}
                    rowRenderer={({ index, style, key }) => {
                      const maxItemsPerRow = getMaxItemsAmountPerRow(width);
                      const itemsIds = generateIndexesForRow(index, maxItemsPerRow, items.length).map<number>(itemIndex => items[itemIndex]);

                      return (
                        <Container>
                          {itemsIds.map(itemId => renderRow(itemId))}
                        </Container>
                      );
                    }}
                    noRowsRenderer={onEmpityList}
                  />
                )}
              </WindowScroller>
            )}
          </InfiniteLoader>
        );
      }}
    </AutoSizer>
  );
};

export default InfiniteList;
