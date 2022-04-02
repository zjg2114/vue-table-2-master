/*
 * @Author: your name
 * @Date: 2021-12-07 21:49:05
 * @LastEditTime: 2021-12-18 22:39:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-table-2\vue.config.js
 */
module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/api': {
                target: 'https://merkaba.nebulaplan.com',
                changeOrigin: true,
            },

        }
    }
}