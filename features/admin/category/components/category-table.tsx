import { firebase } from '@/app/firebase-client';
import { PLACEHOLDER_IMG_URL_50 } from '@/constants';
import { CategoryData } from '@/models/category';
import { Button, Col, Image, Popover, Row, Table, Text, Tooltip } from '@nextui-org/react';
import React from 'react';
import ConfirmDeletePopover from '../../components/confirm-delete-popover';

export interface CategoryTableProps {
  categories: Array<CategoryData | firebase.firestore.DocumentData>;
  onEditAction: (category: CategoryData | firebase.firestore.DocumentData) => void;
  onDeleteAction: (categoryId: string) => void;
}

export default function CategoryTable(props: CategoryTableProps) {
  const { categories, onEditAction, onDeleteAction } = props;
  const initialPage = localStorage.getItem('currentPage') ?? 1;

  const columns = [
    { name: 'ID', uid: 'id' },
    { name: 'NAME', uid: 'name' },
    { name: 'ORDER', uid: 'order' },
    { name: 'PUBLISH', uid: 'isPublished' },
    { name: 'THUMBNAILS', uid: 'thumbnailUrl' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const handleTableEditClick = async (category: CategoryData | firebase.firestore.DocumentData) => {
    if (!onEditAction) return;
    await onEditAction(category);
  };
  const handleTableDeleteClick = async (categoryId: string) => {
    if (!onDeleteAction) return;
    await onDeleteAction(categoryId);
  };
  const handlePageChange = (page: number) => {
    localStorage.setItem('currentPage', page.toString());
  };

  const renderCell = (
    category: CategoryData | firebase.firestore.DocumentData,
    columnKey: React.Key
  ) => {
    const cellValue = (category as any)[columnKey];

    switch (columnKey) {
      case 'id':
        return (
          <Text
            size={14}
            css={{ p: 0, cursor: 'pointer' }}
            onClick={() => handleTableEditClick(category)}
          >
            {cellValue}
          </Text>
        );
      case 'name':
        return (
          <Text
            size={14}
            css={{ tt: 'capitalize', cursor: 'pointer' }}
            onClick={() => handleTableEditClick(category)}
          >
            {cellValue}
          </Text>
        );
      case 'order':
        return (
          <Text
            size={14}
            css={{ tt: 'capitalize', cursor: 'pointer' }}
            onClick={() => handleTableEditClick(category)}
          >
            {cellValue}
          </Text>
        );
      case 'isPublished':
        return (
          <Text
            size={14}
            css={{
              tt: 'capitalize',
              cursor: 'pointer',
              padding: '2px 6px',
              background: cellValue ? '$success' : '$gray600',
              borderRadius: 12,
              color: '$white',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {cellValue.toString()}
          </Text>
        );
      case 'thumbnailUrl':
        return (
          <Row css={{ '& div': { borderRadius: 2 } }}>
            <Image
              src={cellValue ?? PLACEHOLDER_IMG_URL_50}
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
                  <Button auto light onClick={() => handleTableEditClick(category)}>
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
                        name="category"
                        itemId={category.id}
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
        striped
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

        <Table.Body items={categories}>
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
