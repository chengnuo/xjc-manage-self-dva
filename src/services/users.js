import { stringify } from 'qs';
import request from '../utils/request';


export async function queryUsers(params) {

  console.log('params', params)

  return request(`/api/users?${stringify(params)}`);
}
