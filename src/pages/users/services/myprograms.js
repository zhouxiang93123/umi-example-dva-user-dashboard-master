import request from '../../../utils/request';

export function fetchTags({ page = 1 }) {
  return request(`/api/tags?_page=${page}`);
}