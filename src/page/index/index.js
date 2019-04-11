/*
 * @Author: Yzed 
 * @Date: 2019-04-08 19:31:29 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-04-11 10:13:18
 */

import './index.css'
import '../common/header/header'
import _mm from '../../util/mm'
import { calculate } from '../../controller/calculate'
import modal from './modal'
import templateIndex from './index.string'

const page = {
    data:{
        right: 0,
        multDiv: false,
        bracket: false
    },
    init: function(){
       this.bindEvent()
    },
    bindEvent: function(){
        const _this = this
    
        $(document).on('click','.start',function(){
            _this.loadTest()
            if($.trim($('#test').html())){
                $(this).attr('disabled', true)
            }else{
                $(this).removeAttr('disabled')
            }
        })

        $(document).on('click','.submit',function(){
            const param = _this.mark()
            modal.show(param)
            //防止错误，将right置0
            _this.data.right = 0
        })
    },
    loadTest: function(){
        const $nums = parseInt($.trim($('.nums').val()))
        const $min = parseInt($.trim($('.min').val()))
        const $max = parseInt($.trim($('.max').val()))

        if($nums && $min && $max){
            if(isNaN($nums) || isNaN($min) || isNaN($max)){
                alert('Maybe some inputs are NaN.')
                return
            }
            // alert('success')
            this.data.nums = $nums
            this.data.min = $min
            this.data.max = $max

            if($('#multDiv').is(':checked')){
                this.data.multDiv = true
            }else{
                this.data.multDiv = false 
            }
            if($('#bracket').is(':checked')){
                this.data.bracket = true
            }else{
                this.data.bracket = false
            }
            const result = this.getList(this.data)
            let testHtml = ''
            testHtml = _mm.renderHtml(templateIndex, result)
            $('#test').html(testHtml)

        }else{
            alert('need all non-null')
        }
    },
    getList: function(data){
        let mode = 1
        if(this.data.multDiv === false && this.data.bracket === false) mode = 1
        if(this.data.multDiv === true && this.data.bracket === false) mode = 2
        if(this.data.multDiv === false && this.data.bracket === true) mode = 3
        if(this.data.multDiv === true && this.data.bracket === true) mode = 4

        let arr = []
        let formula,result,newFormula
        for(let i=0,len=data.nums; i<len; i++){
            formula = calculate(mode, data.min, data.max)
            result = eval(formula)
            newFormula = formula.replace(/\//g,'÷')
            arr.push({
                formula: newFormula,
                result: result
            })
        }
        this.param = {
            "list": arr,
            "nums": data.nums
        }
        return this.param
    },
    mark: function(){
        const $testItem = $('.panel-test-item')
        
        for(let i=0,len=$testItem.size();i<len;i++){
            let val = parseInt($($testItem[i]).find('.result').val())
            if(val === this.param.list[i].result){
                this.data.right++
            }
        }
        return {
            nums: this.data.nums,
            right: this.data.right
        }
    }
}

$(function(){
    page.init()
})