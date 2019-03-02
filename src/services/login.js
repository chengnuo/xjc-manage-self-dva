// 系统管理模块
import request from '@/utils/request';
// 工具类
import { apiLocation } from '@/utils/utils';

// 登录获取菜单
export async function loginSignIn(params) {
  return request(`${apiLocation.origin}/api/v1/login/signIn`, {
    method: 'POST',
    body: params,
  });
}

// 登出
export async function loginSignOut(params) {
  return request(`${apiLocation.origin}/api/v1/login/signOut`, {
    method: 'POST',
    body: params,
  });
}
