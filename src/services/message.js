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
export async function getMessages(params) {
  return request(`${apiLocation.origin}/api/v1/message?${stringify(params)}`);
}

// 新增
export async function postMessages(params) {
  return request(`${apiLocation.origin}/api/v1/message`, {
    method: 'POST',
    body: params,
  });
}

// 更新
export async function putMessages(params) {
  return request(`${apiLocation.origin}/api/v1/message/${params.id}`, {
    method: 'PUT',
    body: filterId(params),
  });
}

// 删除
export async function deleteMessages(params) {
  return request(`${apiLocation.origin}/api/v1/message/${params.id}`, {
    method: 'DELETE',
    body: filterId(params),
  });
}
