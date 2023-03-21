import { QueryListProvider } from 'rct-query-list';
import React from 'react';
import ProductCard from './ProductCard';
import ProductFilterBar from './ProductFilterBar';
import InfiniteScroll from "react-infinite-scroll-component";
import { getFetch } from './utils';

const ProductList = () => {
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState([]);
  const [filters, setFilters] = React.useState({
    _limit: 8,
    price_gte: 10,
    price_lte: 5000,
  });

  React.useEffect(() => {
    getFetch('/products', filters).then((newData) => {
      setPage(1);
      setHasMore(true);
      setData(newData);
    })
  }, [filters]);

  const handleQueryFilterChange = (newFilters) => {
    setFilters(newFilters);
  }

  const fetchMoreData = () => {
    if (data.length !== 0) {
      const newPage = page + 1;
      getFetch('/products', { ...filters, _page: newPage }).then((newData) => {
        if (!newData.length) {
          setHasMore(false);
        }
        setData([...data, ...newData])
      })
      setPage(newPage);
    }
  }

  return (
    <QueryListProvider
      enableReinitialize
      data={data}
      onQueryFilterChange={handleQueryFilterChange}
      filters={filters}
    >
      {({ items }) => (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className='product-list-container'>
            <ProductFilterBar />
            <div className="product-list">
              {items?.map(item => (
                <ProductCard item={item} />
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </QueryListProvider>
  )
}

export default ProductList;