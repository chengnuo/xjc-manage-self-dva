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
export async function getVentureCapitalLists(params) {
  return request(`${apiLocation.origin}/api/v1/ventureCapital?${stringify(params)}`);
}

// 新增
export async function postVentureCapitalLists(params) {
  return request(`${apiLocation.origin}/api/v1/ventureCapital`, {
    method: 'POST',
    body: params,
  });
}

// 更新
export async function putVentureCapitalLists(params) {
  return request(`${apiLocation.origin}/api/v1/ventureCapital/${params.id}`, {
    method: 'PUT',
    body: filterId(params),
  });
}

// 删除
export async function deleteVentureCapitalLists(params) {
  return request(`${apiLocation.origin}/api/v1/ventureCapital/${params.id}`, {
    method: 'DELETE',
    body: filterId(params),
  });
}
