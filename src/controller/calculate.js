const opt = ['.', '+', '-', '*', '/']

//生成范围随机数
function rnd(min, max){
    const Range = max - min
    const Rand = Math.random()
    const num = min + Math.round(Rand * Range) //四舍五入
    return num
}
//生成A*B
function make1(mode, min, max){
    let op, k1, k2
    if(mode === 1 || mode === 3)op = rnd(1, 2)
    else op = rnd(1,4)

    if(op === 1 || op === 3){
        k1 = rnd(min, max)
        k2 = rnd(min, max)
    }
    if(op === 2){
        k1 = rnd(min, max)
        k2 = rnd(min, max)
        if(k1 < k2){
            let i
            i = k1
            k1 = k2
            k2 = i
        }
    }
    if(op === 4){
        k1 = rnd(min, max)
        let arr = []
        for(let i=1;i*i<=k1;i++){
            if(k1 % i === 0){
                arr.push(i)
                if(i * i != k1) arr.push(k1 / i)
            }
        }
        let len = arr.length
        k2 = arr[rnd(1, len) - 1]
    }


    return `${k1.toString()}${opt[op]}${k2.toString()}`
}
//生成(A+B)
function make2(mode, min, max){
    return `(${make1(mode,min, max)})`
}

function calculate(mode, min, max){

    
    if(min > max){
        let i
        i = min
        min = max
        max = i
    }
    const ins = rnd(3, 5)
    let str = new Array(15),res = ''
    if(ins === 3 || ins === 4){
        let flag

        if(mode === 1 || mode === 2) flag = 1
        if(mode === 3 || mode === 4) flag = 0

        if(flag){
            str[1] = make1(mode, min, max)
            str[2] = make1(mode, min, max)
        }
        else{
            str[1] = make2(mode, min, max)
            str[2] = make2(mode, min, max)
        }

        flag = rnd(1, 100) % 2
        if(flag) res += `${str[1]}+${str[2]}`
        else res += `${str[1]}${(mode === 2 || mode === 4) ? '*' : '+'}${str[2]}`

        if( ins === 4){
            flag = rnd(1, 100) % 2
            if(flag) res += `+${rnd(min, max).toString()}`
            else res += `${(mode === 2 || mode === 4) ? '*' : '+'}${rnd(min, max).toString()}`
        }
    }
    if(ins === 5){
        let ins2 = rnd(2, 3),
            sign = rnd(1, 4)
        
        if(mode === 1 || mode === 2) ins2 = 0

        for(let i=0;i<=ins2;i++) str[i] = make2(mode, min, max)
        for(let i=ins2+1;i<=3;i++) str[i] = make1(mode, min, max)

        if(sign === 1) res += `${str[1]}+${str[2]}+${str[3]}`
        if(sign === 2) res += `${str[1]}+${str[2]}${(mode === 2 || mode === 4) ? '*' : '+'}${str[3]}`
        if(sign === 3) res += `${str[1]}${(mode === 2 || mode === 4) ? '*' : '+'}${str[2]}+${str[3]}`
        if(sign === 4) res += `${str[1]}${(mode === 2 || mode === 4) ? '*' : '+'}${str[2]}${(mode === 2 || mode === 4) ? '*' : '+'}${str[3]}`
    }

    return res

}

module.exports = {
    calculate
}