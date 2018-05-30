import { stringify } from 'qs';
import request from '../utils/request';


export async function getUsers(params) {
  return request(`/api/users?${stringify(params)}`);
}

export async function postUsers(params) {
  return request(`/api/users`, {
    method: 'POST',
    body: params,
  });
}
