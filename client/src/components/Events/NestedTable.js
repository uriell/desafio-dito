import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

import { arrayOfPropertiesToObject } from '../../utils';

const NestedTable = ({ locale, dataSource }) => {
  const columns = dataSource
    .map(({ key }, i) => ({ title: key, dataIndex: key, key: i }));

  columns.unshift({ title: '#', dataIndex: 'index', key: 'index' });

  dataSource = [arrayOfPropertiesToObject(dataSource)]
    .filter(obj => Object.keys(obj).length)
    .map((obj, index) => ({ ...obj, index }));

  return (
    <Table
      rowKey="index"
      pagination={false}
      locale={locale}
      columns={columns}
      dataSource={dataSource}
      size="small"
    />
  );
};

NestedTable.propTypes = {
  locale: PropTypes.object.isRequired,
  dataSource: PropTypes.array.isRequired,
};

export default NestedTable;