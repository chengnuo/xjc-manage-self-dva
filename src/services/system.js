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

// 用户-设置角色
export async function authUserSetRoles(params) {
  return request(`${apiLocation.origin}/api/authUser/setRoles`, {
    method: 'POST',
    body: params,
  });
}


// 角色列表 ================角色================
export async function authRoleList(params) {
  return request(`${apiLocation.origin}/api/authRole/list`, {
    method: 'POST',
    body: params,
  });
}

// 角色新增
export async function authRoleCreate(params) {
  return request(`${apiLocation.origin}/api/authRole/create`, {
    method: 'POST',
    body: params,
  });
}

// 角色更新
export async function authRoleUpdate(params) {
  return request(`${apiLocation.origin}/api/authRole/update`, {
    method: 'POST',
    body: params,
  });
}

// 角色删除
export async function authRoleDelete(params) {
  return request(`${apiLocation.origin}/api/authRole/delete`, {
    method: 'POST',
    body: params,
  });
}
