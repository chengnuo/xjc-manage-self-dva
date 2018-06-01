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
export async function getAccess(params) {
  return request(`/api/access?${stringify(params)}`);
}

// 新增
export async function postAccess(params) {
  return request(`/api/access`, {
    method: 'POST',
    body: params,
  });
}

// 更新
export async function putAccess(params) {
  return request(`/api/access/${params.id}`, {
    method: 'PUT',
    body: filterId(params),
  });
}

// 删除
export async function deleteAccess(params) {
  return request(`/api/access/${params.id}`, {
    method: 'Delete',
    body: filterId(params),
  });
}

