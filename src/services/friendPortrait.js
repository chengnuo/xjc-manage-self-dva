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
export async function getFriendPortrait(params) {
  console.log('getFriendPortrait-server')
  return request(`/api/friendPortrait?${stringify(params)}`);
}

// 新增
export async function postFriendPortrait(params) {
  return request(`/api/friendPortrait`, {
    method: 'POST',
    body: params,
  });
}

// 更新
export async function putFriendPortrait(params) {
  return request(`/api/friendPortrait/${params.id}`, {
    method: 'PUT',
    body: filterId(params),
  });
}

// 删除
export async function deleteFriendPortrait(params) {
  return request(`/api/friendPortrait/${params.id}`, {
    method: 'Delete',
    body: filterId(params),
  });
}
