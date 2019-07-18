import { stringify } from 'qs';
// 工具类
import { apiLocation } from '@/utils/utils';
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
  return request(`${apiLocation.origin}/api/v1/tool?${stringify(params)}`);
}

// 新增
export async function postTools(params) {
  return request(`${apiLocation.origin}/api/v1/tool`, {
    method: 'POST',
    body: params,
  });
}

// 更新
export async function putTools(params) {
  return request(`${apiLocation.origin}/api/v1/tool/${params.id}`, {
    method: 'PUT',
    body: filterId(params),
  });
}

// 删除
export async function deleteTools(params) {
  return request(`${apiLocation.origin}/api/v1/tool/${params.id}`, {
    method: 'DELETE',
    body: filterId(params),
  });
}
