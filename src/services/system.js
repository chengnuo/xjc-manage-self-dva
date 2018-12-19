// 系统管理模块
import request from '@/utils/request';
// 工具类
import { apiLocation } from '@/utils/utils';

// 菜单列表
export async function authMenuList(params) {
  return request(`${apiLocation.origin}/api/authMenu/list`, {
    method: 'POST',
    body: params,
  });
}

// 菜单新增
export async function authMenuCreate() {
  return request('/api/authMenu/create');
}

// 菜单更新
export async function authMenuUpdate() {
  return request('/api/authMenu/update');
}

// 菜单删除
export async function authMenuDelete() {
  return request('/api/authMenu/delete');
}
