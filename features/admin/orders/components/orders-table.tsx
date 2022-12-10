import { firebase } from '@/app/firebase-client';
import { OrderData } from '@/models';
import { Button, Col, Popover, Row, Table, Text, Tooltip } from '@nextui-org/react';
import * as React from 'react';
import ConfirmDeletePopover from '../../components/confirm-delete-popover';
import moment from 'moment';
import { formatPrice } from '@/utils';

export interface OrdersTableProps {
  orderArrayList: Array<OrderData | firebase.firestore.DocumentData>;
  onViewAction: (order: OrderData | firebase.firestore.DocumentData) => void;
  onStatusAction: (order: OrderData | firebase.firestore.DocumentData) => void;
  onDeleteAction: (orderId: string) => void;
}

export default function OrdersTable(props: OrdersTableProps) {
  const { orderArrayList, onViewAction, onStatusAction, onDeleteAction } = props;
  const initialPage = localStorage.getItem('currentPage') ?? 1;

  const columns = [
    { name: 'ORDER ID', uid: 'id' },
    { name: 'CREATED DATE', uid: 'createdAt' },
    { name: 'ADDRESS', uid: 'address' },
    { name: 'PHONE', uid: 'phone' },
    { name: 'METHOD', uid: 'method' },
    { name: 'AMOUNT', uid: 'totalPrice' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const handleTableViewClick = (item: OrderData | firebase.firestore.DocumentData) => {
    if (!onViewAction) return;
    onViewAction(item);
  };

  const handleTableStatusClick = async (item: OrderData | firebase.firestore.DocumentData) => {
    if (!onStatusAction) return;
    await onStatusAction(item);
  };

  const handleTableDeleteClick = async (itemId: string) => {
    if (!onDeleteAction) return;
    await onDeleteAction(itemId);
  };

  const handlePageChange = (page: number) => {
    localStorage.setItem('currentPage', page.toString());
  };

  const renderCell = (item: OrderData | firebase.firestore.DocumentData, columnKey: React.Key) => {
    const cellValue = (item as any)[columnKey];

    switch (columnKey) {
      case 'id':
        return (
          <Text
            size={14}
            css={{ p: 0, cursor: 'pointer' }}
            onClick={() => handleTableViewClick(item)}
          >
            {cellValue}
          </Text>
        );
      case 'createdAt':
        return (
          <Text
            size={14}
            css={{ tt: 'capitalize', cursor: 'pointer' }}
            onClick={() => handleTableViewClick(item)}
          >
            {moment(cellValue).format('MMM DD, YYYY, hh:mm A')}
          </Text>
        );
      case 'address':
        return (
          <Text
            size={14}
            css={{ tt: 'capitalize', cursor: 'pointer' }}
            onClick={() => handleTableViewClick(item)}
          >
            {cellValue}
          </Text>
        );
      case 'phone':
        return (
          <Text
            size={14}
            css={{ tt: 'capitalize', cursor: 'pointer' }}
            onClick={() => handleTableViewClick(item)}
          >
            {cellValue}
          </Text>
        );
      case 'method':
        return (
          <Text
            size={14}
            css={{ tt: 'capitalize', cursor: 'pointer' }}
            onClick={() => handleTableViewClick(item)}
          >
            {cellValue}
          </Text>
        );
      case 'totalPrice':
        return (
          <Text
            size={14}
            css={{ tt: 'capitalize', cursor: 'pointer' }}
            onClick={() => handleTableViewClick(item)}
          >
            {formatPrice(Number(cellValue))}
          </Text>
        );
      case 'status':
        return (
          <Text
            size={14}
            css={{
              tt: 'capitalize',
              cursor: 'pointer',
              padding: '0px 8px',
              background:
                cellValue === 'processing'
                  ? '$blue600'
                  : cellValue === 'active'
                  ? '$accents8'
                  : cellValue === 'delivered'
                  ? '$success'
                  : cellValue === 'canceled'
                  ? '$error'
                  : cellValue === 'picked up'
                  ? '$yellow500'
                  : cellValue === 'refunded'
                  ? '$gray600'
                  : '$yellow600',
              borderRadius: 12,
              color: '#fff',
              fontWeight: 600,
              textAlign: 'center',
            }}
            onClick={() => handleTableViewClick(item)}
          >
            {cellValue}
          </Text>
        );
      case 'actions':
        return (
          <>
            <Row justify="flex-start" align="center">
              <Col css={{ d: 'flex' }}>
                <Tooltip content="View Order">
                  <Button auto light onClick={() => handleTableViewClick(item)}>
                    <i className="fa-regular fa-eye fa-lg"></i>
                  </Button>
                </Tooltip>
              </Col>

              <Col css={{ d: 'flex' }}>
                <Tooltip content="Change Status">
                  <Button auto light onClick={() => handleTableStatusClick(item)}>
                    <i className="fa-solid fa-pen-to-square fa-lg"></i>
                  </Button>
                </Tooltip>
              </Col>

              <Col css={{ d: 'flex' }}>
                <Tooltip content="Delete" color="error">
                  <Popover placement="bottom-right">
                    <Popover.Trigger>
                      <Button auto light css={{ '&:hover i': { color: '$error' } }}>
                        <i className="fa-regular fa-trash-can fa-lg"></i>
                      </Button>
                    </Popover.Trigger>
                    <Popover.Content>
                      <ConfirmDeletePopover
                        name="order"
                        itemId={item.id}
                        handleDeleteClick={handleTableDeleteClick}
                      />
                    </Popover.Content>
                  </Popover>
                </Tooltip>
              </Col>
            </Row>
          </>
        );
      default:
        return cellValue;
    }
  };

  return (
    <>
      <Table
        aria-label="Table"
        shadow={false}
        lined
        sticked
        bordered
        animated={false}
        css={{
          height: 'auto',
          minWidth: '100%',
          background: '$white',
          p: 0,
        }}
      >
        <Table.Header columns={columns}>
          {(column) => <Table.Column key={column.uid}>{column.name}</Table.Column>}
        </Table.Header>

        <Table.Body items={orderArrayList}>
          {(item: OrderData | firebase.firestore.DocumentData) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell
                  css={{
                    '& p': {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    },
                    maxWidth: '170px',
                  }}
                >
                  {renderCell(item, columnKey)}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          align="center"
          rowsPerPage={10}
          page={Number(initialPage)}
          onPageChange={handlePageChange}
        />
      </Table>
    </>
  );
}
