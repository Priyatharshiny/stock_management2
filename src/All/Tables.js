import React from 'react'
import { SearchOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table } from 'antd';

const Tables = ({selectedMarket, selectedStock, data, setData, availableQuantity}) => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Market',
      dataIndex: 'market',
      key: 'market',
      width: '25%',
      ...getColumnSearchProps('market'),
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: '25%',
      ...getColumnSearchProps('stock'),
    },
    {
      title: 'Available Quantity',
      dataIndex: 'availableQuantity',
      key: 'availableQuantity',
      width: '25%',
      render: (text, record) => {
        if (record.stock === selectedStock) {
          return availableQuantity;
        }
        return '-';
      }
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '25%',
      render: (text, record) => {
        const increaseQuantity = () => {
          if (record.quantity < availableQuantity) {
            const newQuantity = record.quantity + 1;
            handleQuantityChange(record, newQuantity);
          }
        };

        const decreaseQuantity = () => {
          if (record.quantity > 0) {
            const newQuantity = record.quantity - 1;
            handleQuantityChange(record, newQuantity);
          }
        };

        return (
          <div className="quantity-buttons">
            <Button type="primary" icon={<MinusOutlined />} onClick={decreaseQuantity} />
            <input type='number' min={0} className='inputQuantity' value={text} readOnly onChange={(e) => handleQuantityChange(record, e.target.value)} />
            <Button type="primary" icon={<PlusOutlined />} onClick={increaseQuantity} />
          </div>
        )
      }
    },
  ];

  const handleQuantityChange = (record, value) => {
    const newData = [...data];
    const targetRow = newData.find((row) => row.key === record.key);
    if (targetRow) {
      // If value is a number, set it directly, otherwise parse it
      const newValue = typeof value === 'number' ? value : parseInt(value, 10) || 0;
      targetRow.quantity = newValue;
      setData(newData);
    }
  };

  return (
    <div>
        <Table 
          columns={columns} 
          dataSource={data}
          pagination={false}
        />
    </div>
  )
}

export default Tables
