import { stringify } from 'qs';
import request from '../utils/request';

// 过滤Id
function filterId(ctxQuery) {
  const whereData = {};
  let i = 0;
  for (i in ctxQuery) {
    if (i === 'id') {
      continue;
    } else {
      whereData[i] = ctxQuery[i];
    }
  }
  return whereData;
}


// 获取
export async function getUsers(params) {
  return request(`/api/users?${stringify(params)}`);
}

// 新增
export async function postUsers(params) {
  return request(`/api/users`, {
    method: 'POST',
    body: params,
  });
}

// 更新
export async function putUsers(params) {
  return request(`/api/users/${params.id}`, {
    method: 'PUT',
    body: filterId(params),
  });
}

// 删除
export async function deleteUsers(params) {
  return request(`/api/users/${params.id}`, {
    method: 'Delete',
    body: filterId(params),
  });
}

