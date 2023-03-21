import React from 'react';
import { QueryFilterInput, QueryFilterRadio, QueryFilterCheckbox, QueryListContext } from 'rct-query-list';
import CustomInput from './CustomInput';

const ProductFilterBar = () => {
  const { filterValues } = React.useContext(QueryListContext);

  return (
    <div className='product-filters'>
      <div>Filter</div>
      <QueryFilterInput source="q" />
      <div className='product-filters-section'>
        <QueryFilterRadio
          label="All"
          component={CustomInput}
          source="category"
          value=""
          checked={!filterValues.category}
        />
        <QueryFilterRadio
          label="Smartphone"
          component={CustomInput}
          source="category"
          value="smartphones"
        />
        <QueryFilterRadio
          label="Laptop"
          component={CustomInput}
          source="category"
          value="laptops"
        />
        <QueryFilterRadio
          label="Fragrance"
          source="category"
          component={CustomInput}
          value="fragrances"
        />
        <QueryFilterRadio
          label="Skincare"
          component={CustomInput}
          source="category"
          value="skincare"
        />
      </div>
      <div className='product-filters-section'>
        <QueryFilterCheckbox
          label="Samsung"
          component={CustomInput}
          source="brand"
          name="Samsung"
        />
        <QueryFilterCheckbox
          label="Infinix"
          component={CustomInput}
          source="brand"
          name="Infinix"
        />
        <QueryFilterCheckbox
          label="HP Pavilion"
          component={CustomInput}
          source="brand"
          name="HP Pavilion"
        />
      </div>
      <div className='product-filters-section'>
        <QueryFilterInput source="price_gte" type="range" min={0} max={10000} />
        {`${filterValues.price_gte}$`}
        <QueryFilterInput source="price_lte" type="range" min={0} max={10000} />
        {`${filterValues.price_lte}$`}
      </div>
    </div>
  )
}

export default ProductFilterBar;