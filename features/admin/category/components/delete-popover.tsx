import { Button, Grid, Row, Text } from '@nextui-org/react';
import React from 'react';

export interface DeletePopoverProps {
  categoryId: string;
  handleDeleteClick: (categoryId: string) => void;
}

export default function DeletePopover(props: DeletePopoverProps) {
  const { handleDeleteClick, categoryId } = props;

  const handleClick = () => {
    if (!handleDeleteClick) return;
    handleDeleteClick(categoryId);
  };

  return (
    <>
      <Grid.Container css={{ borderRadius: '14px', padding: '0.75rem', maxWidth: '330px' }}>
        <Row justify="center" align="center">
          <Text b>Confirm Delete</Text>
        </Row>
        <Row>
          <Text css={{ textAlign: 'center', margin: '8px 0' }}>
            Are you sure you want to delete this category? If you want to keep it, please click
            outside this box.
          </Text>
        </Row>
        <Grid.Container justify="center" alignContent="center" css={{ m: 6 }}>
          <Grid>
            <Button size="sm" color="error" onClick={handleClick}>
              Delete
            </Button>
          </Grid>
        </Grid.Container>
      </Grid.Container>
    </>
  );
}
