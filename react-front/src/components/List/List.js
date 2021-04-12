import { useState, useCallback } from 'react';
import Item from './Item';
import Form from '../Form';
import {
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './List.module.scss';
import { useTodo } from '../../hooks/useTodo';

const List = () => {
  const {
    getTodoList,
    todoList,
    handleSetStatus,
    handleRemove,
    handleUpdate,
    handleCreate,
  } = useTodo();
  const [idToRemove, setIdToRemove] = useState();
  const [idToEdit, setIdToEdit] = useState();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState();

  const handleConfirmRemoveItem = () => {
    handleRemove(idToRemove);
    setIdToRemove(undefined);
  };

  const handleCloseForm = useCallback(async () => {
    setIdToEdit(undefined);
    setIsCreateModalOpen(false);
  }, []);

  const handleSave = useCallback(async ({ id, title, description }) => {
    handleCloseForm();
    if (id) {
      await handleUpdate({ id, title, description });
    } else {
      await handleCreate({ title, description });
    }
    await getTodoList();
  }, [getTodoList, handleCreate, handleUpdate, handleCloseForm]);

  return (
    <>
      <div className={styles['form-container']}>
        <div className={styles['title-container']}>
          <span className={styles.title}>Todo List</span>
          <Fab color="primary" aria-label="add" onClick={() => setIsCreateModalOpen(true)}>
            <AddIcon />
          </Fab>
        </div>
        {!!todoList?.length ? (
          <>
            {todoList?.map(({ id, title, description, status }) => (
              <Item
                key={id}
                id={id}
                title={title}
                description={description}
                status={status}
                onCheck={handleSetStatus}
                onRemove={setIdToRemove}
                onClick={setIdToEdit}
              />
            ))}
          </>
        ) : (
          <span>No items added yet...</span>
        )}
      </div>
      <Dialog
        open={!!idToRemove}
        onClose={() => setIdToRemove(undefined)}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Remove item!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setIdToRemove(undefined)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRemoveItem} color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
      <Form
        id={idToEdit}
        isOpen={!!idToEdit || isCreateModalOpen}
        onClose={handleCloseForm}
        onSave={handleSave}
      />
    </>
  );
}

export default List;
