import { useEffect, useState, useCallback } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from '@material-ui/core';
import { useTodo } from '../../hooks/useTodo';

const Form = ({ id, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [titleError, setTitleError] = useState(false);
  const { getById } = useTodo();

  const handleGetData = useCallback(async () => {
    try {
      const { data } = await getById(id);
      setTitle(data?.title);
      setDescription(data?.description);
    } catch (error) {
      console.error('Error reading the item');
    }
  }, [getById, id]);

  const handleBlur = () => {
    setTitleError(!title);
  }

  useEffect(() => {
    if (id) {
      handleGetData();
    }
  }, [handleGetData, id]);

  useEffect(() => {
    setTitle(undefined);
    setDescription(undefined);
  }, [isOpen])

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="draggable-dialog-title"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        {id ? <>Edit item</> : <>Add new item</>}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
        <form noValidate autoComplete="off">
          <TextField
            required
            margin="dense"
            fullWidth={true}
            label="Title"
            style={{ display: 'block' }}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            onBlur={handleBlur}
            error={titleError && !title}
            helperText={titleError && !title ? "This field is required!" : ""}
          />
          <TextField
            margin="dense"
            fullWidth={true}
            label="Description"
            placeholder="Optional"
            multiline
            defaultValue={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </form>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => onSave({ id, title, description })}
          color="primary"
          disabled={!title}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Form;
