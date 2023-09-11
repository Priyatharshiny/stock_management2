import React from 'react'
import { Select } from 'antd';

const Selected = ({selectedStock, setSelectedStock, setSelectedMarket, marketOptions, stockOptions, setAvailableQuantity}) => {

    const onChangeMarket = (value) => {
        setSelectedMarket(value);
        console.log(`selected ${value}`);
    };

    const onChangeStock = (value) => {
        setSelectedStock(value)
        const selectedStockObject = stockOptions.find((stock) => stock.value === value);
        if (selectedStockObject) {
            const { value, availableQuantity } = selectedStockObject;
            setAvailableQuantity(availableQuantity);
            console.log(`selected stock: ${value}, available quantity: ${availableQuantity}`);
        }
        
    };
      
    const onSearch = (value) => {
        console.log('search:', value);
    };
      
    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // const isMarketSelectDisabled = !selectedStock;
    
  return (
    <div className='2col'>
        <div className='select1'>
            <Select
                // mode="multiple"
                value={selectedStock}
                showSearch
                placeholder="Select a stock"
                // optionFilterProp="children"
                onChange={onChangeStock}
                onSearch={onSearch}
                filterOption={filterOption}
                style={{
                    width: '300px',
                }}
                options={stockOptions}
            />
        </div>
        <div className='select2'>
            <Select
                showSearch
                placeholder="Select a market"
                optionFilterProp="children"
                onChange={onChangeMarket}
                onSearch={onSearch}
                filterOption={filterOption}
                style={{
                    width: '300px',
                }}
                options={marketOptions}
            />
        </div>
        
    </div>
  )
}

export default Selected