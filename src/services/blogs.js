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
export async function getBlogs(params) {
  return request(`/api/blogs?${stringify(params)}`);
}

// 新增
export async function postBlogs(params) {
  return request(`/api/blogs`, {
    method: 'POST',
    body: params,
  });
}

// 更新
export async function putBlogs(params) {
  return request(`/api/blogs/${params.id}`, {
    method: 'PUT',
    body: filterId(params),
  });
}

// 删除
export async function deleteBlogs(params) {
  return request(`/api/blogs/${params.id}`, {
    method: 'Delete',
    body: filterId(params),
  });
}
