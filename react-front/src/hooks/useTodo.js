import {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import {
  getAll,
  setStatus,
  getById,
  create,
  update,
  remove,
} from '../lib/services';
import PropTypes from 'prop-types';

const initialState = {
  todoList: [],
};

const TodoContext = createContext(initialState);

TodoContext.displayName = 'ToDoContext';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'LIST': {
      return {
        ...state,
        todoList: action.todoList,
      };
    }
    default:
      return state;
  }
};

const TodoProvider = (props) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const setTodoList = useCallback((todoList) => {
    dispatch({ type: 'LIST', todoList })
  }, []);

  const getTodoList = useCallback(async () => {
    try {
      const { data: list } = await getAll();
      setTodoList(list);
    } catch (error) {
      setTodoList([]);
    }
  }, [setTodoList]);

  const handleSetStatus = useCallback(async ({ id, status: newStatus }) => {
    try {
      const { status } = await setStatus(id, newStatus);
      if (status === 'ok') {
        getTodoList();
      }
    } catch (error) {
      console.error('Error saving status', error);
    }
  }, [getTodoList]);

  const handleRemove = useCallback(async (id) => {
    try {
      const { status } = await remove(id);
      if (status === 'ok') {
        getTodoList();
      }
    } catch (error) {
      console.error('Error removing status', error);
    }
  }, [getTodoList]);

  const handleCreate = useCallback(async ({ title, description }) => {
    try {
      const { status } = await create({ title, description });
      if (status === 'ok') {
        getTodoList();
      }
    } catch (error) {
      console.error('Error removing status', error);
    }
  }, [getTodoList]);

  const handleUpdate = useCallback(async ({ id, title, description }) => {
    try {
      const { status } = await update({ id, title, description });
      if (status === 'ok') {
        getTodoList();
      }
    } catch (error) {
      console.error('Error removing status', error);
    }
  }, [getTodoList]);

  useEffect(() => {
    getTodoList();
  }, [getTodoList]);


  return (
    <TodoContext.Provider
      value={{
        ...state,
        getTodoList,
        handleSetStatus,
        handleRemove,
        getById,
        handleUpdate,
        handleCreate,
      }}
      {...props}
    />
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

export const ManagedTodoContext = ({ children }) => (
  <TodoProvider>{children}</TodoProvider>
);

ManagedTodoContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};