// 系统管理模块
import request from '@/utils/request';
// 工具类
import { apiLocation } from '@/utils/utils';

// 菜单列表 ================菜单================
export async function authMenuList(params) {
  return request(`${apiLocation.origin}/api/authMenu/list`, {
    method: 'POST',
    body: params,
  });
}

// 菜单新增
export async function authMenuCreate(params) {
  return request(`${apiLocation.origin}/api/authMenu/create`, {
    method: 'POST',
    body: params,
  });
}

// 菜单更新
export async function authMenuUpdate(params) {
  return request(`${apiLocation.origin}/api/authMenu/update`, {
    method: 'POST',
    body: params,
  });
}

// 菜单删除
export async function authMenuDelete(params) {
  return request(`${apiLocation.origin}/api/authMenu/delete`, {
    method: 'POST',
    body: params,
  });
}



// 用户列表 ================用户================
export async function authUserList(params) {
  return request(`${apiLocation.origin}/api/authUser/list`, {
    method: 'POST',
    body: params,
  });
}

// 用户新增
export async function authUserCreate(params) {
  return request(`${apiLocation.origin}/api/authUser/create`, {
    method: 'POST',
    body: params,
  });
}

// 用户更新
export async function authUserUpdate(params) {
  return request(`${apiLocation.origin}/api/authUser/update`, {
    method: 'POST',
    body: params,
  });
}

// 用户删除
export async function authUserDelete(params) {
  return request(`${apiLocation.origin}/api/authUser/delete`, {
    method: 'POST',
    body: params,
  });
}
