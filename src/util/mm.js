/*
 * @Author: Yzed 
 * @Date: 2019-04-09 16:05:05 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-04-09 16:09:49
 */

import Hogan from 'hogan.js'

const _mm = {
    //渲染模板
    renderHtml: function(htmlTemplate, data){
        const template = Hogan.compile(htmlTemplate)
        const result = template.render(data)

        return result
    },
    successTips: function(msg){
        alert(msg || 'Successed')
    },
    errorTips: function(msg){
        alert(msg || 'Error')
    }
}

export default _mm