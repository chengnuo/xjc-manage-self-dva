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
export async function getTools(params) {
  console.log('getTools-server')
  return request(`/api/tools?${stringify(params)}`);
}

// 新增
export async function postTools(params) {
  return request(`/api/tools`, {
    method: 'POST',
    body: params,
  });
}

// 更新
export async function putTools(params) {
  return request(`/api/tools/${params.id}`, {
    method: 'PUT',
    body: filterId(params),
  });
}

// 删除
export async function deleteTools(params) {
  return request(`/api/tools/${params.id}`, {
    method: 'Delete',
    body: filterId(params),
  });
}
