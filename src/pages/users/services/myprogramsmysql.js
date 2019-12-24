import request from '../../../utils/request';

export function fetchTags({ page = 1 }) {
  return request(`/api/times?_page=${page}`);
}
