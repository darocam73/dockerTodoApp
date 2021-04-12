import { fetcher } from './fetcher';

export const getAll = () => fetcher({
  url: 'todo',
});

export const getById = (id) => fetcher({
  url: `todo/${id}`,
});

export const create = ({ title, description }) => fetcher({
  url: 'todo',
  options: {
    method: 'POST',
    body: { title, description },
  },
});

export const update = ({ id, title, description }) => fetcher({
  url: `todo/${id}`,
  options: {
    method: 'PUT',
    body: { title, description },
  },
});

export const remove = (id) => fetcher({
  url: `todo/${id}`,
  options: {
    method: 'DELETE',
  },
});

export const setStatus = (id, status) => fetcher({
  url: `todo/${id}`,
  options: {
    method: 'PATCH',
    body: { status },
  },
});
