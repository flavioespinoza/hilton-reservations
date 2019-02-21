type Int = number & { __int__: void }

const _roundToInt = (num: number): Int => Math.round(num) as Int

const _toInt = (value: string): Int => {
    return Number.parseInt(value) as Int
}

const _checkIsInt = (num: number): num is Int => num % 1 === 0

const _assertAsInt = (num: number): Int => {
    try {
        if (_checkIsInt(num)) {
            return num
        }
    } catch (err) {
        throw new Error(`Invalid Int value (error): ${num}`)
    }

    throw new Error(`Invalid Int value: ${num}`)
}

export {
    Int,
    _roundToInt,
    _toInt,
    _checkIsInt,
    _assertAsInt
}