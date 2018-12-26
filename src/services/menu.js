// 系统管理模块
import request from '@/utils/request';
// 工具类
import { apiLocation } from '@/utils/utils';

// 登录获取菜单
export async function menuGetMenuList(params) {
  return request(`${apiLocation.origin}/api/getMenuList`, {
    method: 'POST',
    body: params,
  });
}
