import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

import './table.css';
import NestedTable from './NestedTable';

const tableTitle = () => <div className="Table-TableTitle">Eventos</div>;

class TableComponent extends React.Component {
  state = {
    filteredInfo: {},
  };

  onChange = (pagination, filters) => {
    this.setState({
      filteredInfo: filters,
    });
  }

  render() {
    const { filteredInfo } = this.state;
    const { events, isLoading } = this.props;

    const eventKeys = events.map(event => event.key)
      .filter((key, index, array) => array.indexOf(key) === index);

    const columns = [
      {
        title: 'Nome',
        key: 'name',
        dataIndex: 'name',
        render: text => <strong>{text}</strong>,
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name === value,
        filters: eventKeys.map(key => ({ text: key, value: key })),
      },
      {
        title: 'Data',
        key: 'timestamp',
        className: 'column-timestamp',
        dataIndex: 'timestamp',
        render: timestamp => <span>{new Date(timestamp).toString()}</span>,
      },
    ];

    // precisamos mapear o evento para que a tabela não confunda eventos de mesmo nome
    const dataSource = [
      ...events
        .map(({ key: name, timestamp, custom_data: customData }, i) => ({
          name,
          timestamp,
          customData,
          key: i,
        }))
    ];

    const locale = {
      filterConfirm: 'Ok',
      filterReset: 'Redefinir',
      emptyText: 'Sem dados',
    };

    return (
      <Table
        bordered
        showHeader
        pagination={{ pageSize: 25 }}
        expandRowByClick
        locale={locale}
        loading={isLoading}
        columns={columns}
        title={tableTitle}
        dataSource={dataSource}
        onChange={this.onChange}
        expandedRowRender={record => <NestedTable locale={locale} dataSource={record.customData} />}
        className="Table"
        size="small"
      />
    );
  }
}

TableComponent.propTypes = {
  events: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default TableComponent;