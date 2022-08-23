const isObject = function (value) {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}
let merge = function (a, b) {
  Object.keys(b).forEach((key) => {
    if (isObject(b[key]) && isObject(a[key])) {
      merge(a[key], b[key])
    } else {
      a[key] = b[key]
    }
  })
  return a
}
const bind = function (func, context) {
  const arguments$1 = arguments

  const args = []
  for (let _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments$1[_i]
  }
  return function () {
    const arguments$1 = arguments

    const innerArgs = []
    for (let _i = 0; _i < arguments.length; _i++) {
      innerArgs[_i] = arguments$1[_i]
    }
    return func.apply(context, args.concat(Array.prototype.slice.call(innerArgs)))
  }
}
const arrayAdd = function (array, item) {
  let i = 0
  let index
  const { length } = array
  for (; i < length; i++) {
    if (array[i].seriesIndex === item.seriesIndex) {
      index = i
      break
    }
  }
  if (index === undefined) {
    array.push(item)
  } else {
    array[index] = item
  }
  return array
}
const uuid = function () {
  function rd(a) {
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16)
      : ([1e7] + -[1e3] + -4e3 + -8e3 + -1e11).replace(/[018]/g, rd)
  }
  return rd()
}
function bindAll(fns, context) {
  fns.forEach((fn) => {
    if (!context[fn]) {
      return
    }
    context[fn] = context[fn].bind(context)
  })
}
function removeNode(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null
}
function mockEvent(type, event) {
  const e = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    button: event.originalEvent.button,
    buttons: event.originalEvent.buttons,
    clientX: event.originalEvent.clientX,
    clientY: event.originalEvent.clientY,
    zrX: event.originalEvent.offsetX,
    zrY: event.originalEvent.offsetY,
    movementX: event.originalEvent.movementX,
    movementY: event.originalEvent.movementY,
    relatedTarget: event.originalEvent.relatedTarget,
    screenX: event.originalEvent.screenX,
    screenY: event.originalEvent.screenY,
    view: window,
  })
  e.zrX = event.originalEvent.offsetX
  e.zrY = event.originalEvent.offsetY
  e.event = e
  return e
}
export {
  merge, isObject, bind, arrayAdd, uuid, bindAll, removeNode, mockEvent,
}
// # sourceMappingURL=index.js.map
