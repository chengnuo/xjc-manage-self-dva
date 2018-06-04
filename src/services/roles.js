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
export async function getRoles(params) {
  return request(`/api/roles?${stringify(params)}`);
}

// 新增
export async function postRoles(params) {
  return request(`/api/roles`, {
    method: 'POST',
    body: params,
  });
}

// 更新
export async function putRoles(params) {
  return request(`/api/roles/${params.id}`, {
    method: 'PUT',
    body: filterId(params),
  });
}

// 删除
export async function deleteRoles(params) {
  return request(`/api/roles/${params.id}`, {
    method: 'Delete',
    body: filterId(params),
  });
}


// 设置权限
export async function setAccess(params) {
  return request(`/api/setAccess`, {
    method: 'POST',
    body: params,
  });
}
// 设置权限列表
export async function setAccessList(params) {
  return request(`/api/setAccessList?${stringify(params)}`);
}

