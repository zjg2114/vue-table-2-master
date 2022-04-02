/*
 * @Author: your name
 * @Date: 2021-12-07 21:28:54
 * @LastEditTime: 2021-12-23 22:03:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-table-2\src\api\request.js
 */
import axios from 'axios'
import { Toast } from "vant";
// create an axios instance
const service = axios.create({
    baseURL: 'https://merkaba.nebulaplan.com/api',
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000, // request timeout,
    responseType: 'json'
})
// request interceptor
let loadTime
const minLoadTime = 500
service.interceptors.request.use(
    config => {
        loadTime = new Date().getTime()
        Toast.loading({
            message: 'loading...',
            forbidClick: true,
        });
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(

    response => {
        const res = response.data
        if (new Date().getTime() - loadTime < minLoadTime) {
            // 计算时间差
            const interval = loadTime + minLoadTime - new Date().getTime()

            if (res.code != '1') {
                setTimeout(() => {
                    Toast(res.msg)
                }, interval)
                return Promise.reject(new Error(res.message || 'Error'))
            } else {
                setTimeout(() => {
                    Toast.clear();
                }, interval)
                return Promise.resolve(res)
            }

        } else {
            if (res.code != '1') {
                Toast(res.msg)
                return Promise.reject(new Error(res.message || 'Error'))
            } else {
                Toast.clear();
                return Promise.resolve(res)

            }
        }
    },
    error => {
        Toast('服务器错误')
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service