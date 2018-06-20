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
export async function getPlans(params) {
  return request(`/api/plans?${stringify(params)}`);
}

// 新增
export async function postPlans(params) {
  return request(`/api/plans`, {
    method: 'POST',
    body: params,
  });
}

// 更新
export async function putPlans(params) {
  return request(`/api/plans/${params.id}`, {
    method: 'PUT',
    body: filterId(params),
  });
}

// 删除
export async function deletePlans(params) {
  return request(`/api/plans/${params.id}`, {
    method: 'Delete',
    body: filterId(params),
  });
}
