/*
 * @Author: Yzed 
 * @Date: 2019-04-10 20:05:16 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-04-10 20:46:39
 */

import _mm from '../../util/mm'
import templateModal from './modal.string'

const modal = {
    show: function(option){
        this.option =option
        this.$modalWrap = $('.modal-wrap')
        this.$test = $('#test')
        this.loadModal()
        this.bindEvent()
    },
    hide:function(){
        this.$modalWrap.empty()
        this.$test.empty()
        $('.nums').val('')
        $('.min').val('')
        $('.max').val('')
    },
    bindEvent: function(){
        const _this = this
        $(document).on('click','.exit',function(){
            _this.hide()
        })
    },
    loadModal: function(){
        const modalHtml = _mm.renderHtml(templateModal, this.option)
        this.$modalWrap.html(modalHtml)
    }
}

export default modal