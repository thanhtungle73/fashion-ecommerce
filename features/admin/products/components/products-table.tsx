import { firebase } from '@/app/firebase-client';
import { PLACEHOLDER_IMG_URL_50 } from '@/constants';
import { ProductData } from '@/models';
import { formatPrice } from '@/utils';
import { Button, Col, Image, Popover, Row, Table, Text, Tooltip } from '@nextui-org/react';
import * as React from 'react';
import ConfirmDeletePopover from '../../components/confirm-delete-popover';

export interface ProductTableProps {
  products: Array<ProductData | firebase.firestore.DocumentData>;
  onEditAction: (category: ProductData | firebase.firestore.DocumentData) => void;
  onDeleteAction: (categoryId: string) => void;
}

export default function ProductTable(props: ProductTableProps) {
  const { products, onEditAction, onDeleteAction } = props;
  const initialPage = localStorage.getItem('currentPage') ?? 1;

  const columns = [
    { name: 'ID', uid: 'id' },
    { name: 'NAME', uid: 'name' },
    { name: 'CATEGORY', uid: 'category' },
    { name: 'PRICE', uid: 'salePrice' },
    { name: 'PROMOTION PERCENT', uid: 'promotionPercent' },
    { name: 'THUMBNAIL', uid: 'thumbnailUrls' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const handleTableEditClick = async (item: ProductData | firebase.firestore.DocumentData) => {
    if (!onEditAction) return;
    await onEditAction(item);
  };
  const handleTableDeleteClick = async (itemId: string) => {
    if (!onDeleteAction) return;
    await onDeleteAction(itemId);
  };
  const handlePageChange = (page: number) => {
    localStorage.setItem('currentPage', page.toString());
  };

  const renderCell = (
    item: ProductData | firebase.firestore.DocumentData,
    columnKey: React.Key
  ) => {
    const cellValue = (item as any)[columnKey];

    switch (columnKey) {
      case 'id':
        return (
          <Text
            size={14}
            css={{ p: 0, cursor: 'pointer' }}
            onClick={() => handleTableEditClick(item)}
          >
            {cellValue}
          </Text>
        );
      case 'name':
        return (
          <Text
            size={14}
            css={{ tt: 'capitalize', cursor: 'pointer' }}
            onClick={() => handleTableEditClick(item)}
          >
            {cellValue}
          </Text>
        );
      case 'category':
        return (
          <Text
            size={14}
            css={{ tt: 'capitalize', cursor: 'pointer' }}
            onClick={() => handleTableEditClick(item)}
          >
            {cellValue?.name}
          </Text>
        );
      case 'salePrice':
        return (
          <Text
            size={14}
            b
            css={{ tt: 'capitalize', cursor: 'pointer' }}
            onClick={() => handleTableEditClick(item)}
          >
            {formatPrice(Number(cellValue))}
          </Text>
        );
      case 'promotionPercent':
        return (
          <Text
            size={14}
            css={{ tt: 'capitalize', cursor: 'pointer' }}
            onClick={() => handleTableEditClick(item)}
          >
            {cellValue}
          </Text>
        );
      case 'thumbnailUrls':
        return (
          <Row css={{ '& div': { borderRadius: 2 } }}>
            <Image
              src={cellValue[0] ?? PLACEHOLDER_IMG_URL_50}
              alt="thumbnail image"
              width={40}
              height={50}
            />
          </Row>
        );
      case 'actions':
        return (
          <>
            <Row justify="flex-start" align="center" css={{ width: '50%' }}>
              <Col css={{ d: 'flex' }}>
                <Tooltip content="Edit">
                  <Button auto light onClick={() => handleTableEditClick(item)}>
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
                        name="product"
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

        <Table.Body items={products}>
          {(item) => (
            <Table.Row>
              {(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
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
