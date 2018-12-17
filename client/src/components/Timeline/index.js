import React from 'react';
import { Divider, Timeline, Tooltip, Button, Card, List } from 'antd';
import PropTypes from 'prop-types';

import './index.css';

const TimelineComponent = ({ getTimeline, timeline, isLoading }) => {
  if (!timeline.length && !isLoading) {
    getTimeline();
  }

  const timelineItems = timeline.map((item) => {
    const products = item.products.map((product, index) => (
    // eslint-disable-next-line react/no-array-index-key
      <List.Item className="ListItem" key={index}>
        <span className="ListItem-ListItemPrice">{`R$${product.price}`}</span>
        <Divider type="vertical" />
        <span className="ListItem-ListItemName">{product.name}</span>
      </List.Item>));

    return (
      <Timeline.Item key={item.transaction_id}>
        { new Date(item.timestamp).toString() }
        <Card
          hoverable
          className="Card"
          title={(
            <span className="Card-CardTitle">
              <Tooltip title="Rendimento">
                <span className="Card-CardRevenue">{`R$${item.revenue}`}</span>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Nome da Loja">
                <span className="Card-CardStoreName">{item.store_name}</span>
              </Tooltip>
            </span>
          )}
          extra={<Tooltip title="ID da Transação">{item.transaction_id}</Tooltip>}
        >
          <List size="small">
            {products}
          </List>
        </Card>
      </Timeline.Item>
    );
  });

  return (
    <Timeline className="Timeline">
      <h1 className="Timeline-TimelineTitle">Timeline</h1>
      <Button
        type="primary"
        icon="reload"
        className="Timeline-TimelineButton"
        loading={isLoading}
        onClick={getTimeline}
      >
        { isLoading ? 'Atualizando' : 'Atualizar' }
      </Button>
      { isLoading ? <Card loading /> : timelineItems }
    </Timeline>
  );
};

TimelineComponent.propTypes = {
  timeline: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getTimeline: PropTypes.func.isRequired,
};

export default TimelineComponent;