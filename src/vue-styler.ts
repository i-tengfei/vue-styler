import { State } from 'stylefire/styler/types'
import getValueType from 'stylefire/css/value-types'
import {
  isTransformProp,
  sortTransformProps
} from 'stylefire/css/transform-props'
import * as valueTypes from 'style-value-types'

const aliasMap: { [key: string]: string } = {
  x: 'translateX',
  y: 'translateY',
  z: 'translateZ',
  originX: 'transform-origin-x',
  originY: 'transform-origin-y'
}

const styler = (
  values: State = {},
  types: { [key: string]: valueTypes.ValueType } = {},
  enableHardwareAcceleration: boolean = false
) => {
  const keys = Object.keys(values).sort(sortTransformProps)
  const numKeys = keys.length
  let transformString = ''
  let hasTransform = false
  let transformHasZ = false
  let result: { [key: string]: string | number } = {}
  for (let i = 0; i < numKeys; i++) {
    let key = keys[i]
    let value = values[key]
    let valueType = types[key]
    key = aliasMap[key] || key
    valueType = valueType || getValueType(key)
    if (
      valueType &&
      (typeof value === 'number' || typeof value === 'object') &&
      valueType.transform
    ) {
      value = valueType.transform(value)
    }
    if (isTransformProp(key)) {
      transformString += key + '(' + value + ') '
      transformHasZ = key === 'translateZ' ? true : transformHasZ
      hasTransform = true
    } else {
      result[key] = value
    }
    if (hasTransform) {
      if (!transformHasZ && enableHardwareAcceleration) {
        transformString += 'translateZ(0)'
      }
      result['transform'] = transformString
    }
  }
  return result
}

const install = (
  Vue: any,
  options: any = {
    aliasMap
  }
) => {
  Vue.filter('styler', styler)
}

export { valueTypes, styler }

export default {
  install
}
