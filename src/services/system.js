// 系统管理模块
import request from '@/utils/request';
// 工具类
import { apiLocation } from '@/utils/utils';
import { stringify } from 'qs';

// 菜单列表 ================菜单================
export async function authMenuList(params) {
  return request(`${apiLocation.origin}/api/v1/access?${stringify(params)}`, {
    method: 'GET',
    // body: params,
  });
}

// 菜单新增
export async function authMenuCreate(params) {
  return request(`${apiLocation.origin}/api/v1/access`, {
    method: 'POST',
    body: params,
  });
}

// 菜单更新
export async function authMenuUpdate(params) {
  return request(`${apiLocation.origin}/api/v1/access/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

// 菜单删除
export async function authMenuDelete(params) {
  return request(`${apiLocation.origin}/api/v1/access/${params.id}`, {
    method: 'DELETE',
    body: params,
  });
}



// 用户列表 ================用户================
export async function authUserList(params) {
  return request(`${apiLocation.origin}/api/v1/user?${stringify(params)}`, {
    method: 'GET',
    // body: params,
  });
}

// 用户新增
export async function authUserCreate(params) {
  return request(`${apiLocation.origin}/api/v1/user`, {
    method: 'POST',
    body: params,
  });
}

// 用户更新
export async function authUserUpdate(params) {
  return request(`${apiLocation.origin}/api/v1/user/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

// 用户删除
export async function authUserDelete(params) {
  return request(`${apiLocation.origin}/api/v1/user/${params.id}`, {
    method: 'DELETE',
    // body: params,
  });
}

// 用户批量删除
export async function authUserDeletes(params) {
  return request(`${apiLocation.origin}/api/v1/user`, {
    method: 'DELETE',
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
  return request(`${apiLocation.origin}/api/v1/role?${stringify(params)}`, {
    method: 'GET',
    // body: params,
  });
}

// 角色新增
export async function authRoleCreate(params) {
  return request(`${apiLocation.origin}/api/v1/role`, {
    method: 'POST',
    body: params,
  });
}

// 角色更新
export async function authRoleUpdate(params) {
  return request(`${apiLocation.origin}/api/v1/role/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

// 角色删除
export async function authRoleDelete(params) {
  return request(`${apiLocation.origin}/api/v1/role/${params.id}`, {
    method: 'DELETE',
    // body: params,
  });
}

// 角色批量删除
export async function authRoleDeletes(params) {
  return request(`${apiLocation.origin}/api/v1/role`, {
    method: 'DELETE',
    body: params,
  });
}



// 角色设置权限列表
export async function authRoleSetAccessList(params) {
  return request(`${apiLocation.origin}/api/authRole/setAccessList`, {
    method: 'POST',
    body: params,
  });
}
// 角色设置权限
export async function authRoleSetAccess(params) {
  return request(`${apiLocation.origin}/api/authRole/setAccess`, {
    method: 'POST',
    body: params,
  });
}
