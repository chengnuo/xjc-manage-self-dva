// 系统管理模块
import request from '@/utils/request';
// 工具类
import { apiLocation } from '@/utils/utils';

// 登录获取菜单
export async function loginSignIn(params) {
  return request(`${apiLocation.origin}/api/signIn`, {
    method: 'POST',
    body: params,
  });
}
