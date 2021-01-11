var event = document.createEvent("HTMLEvents")
event.initEvent("aaa", true, true)
window.dispatchEvent(event)
window.addEventListener('aaa', function () { 
  console.log();
}, false)
beforeRouteUpdate($route.path, $route.fullPath)
var left = 0
let timer = setInterval(function() {
  if (left < 200) {
    Element.style.marginLeft = left + 'px';
    left++;
  } else {
    clearInterval(timer)
  }
})
requestAnimationFrame(step)
function step() {
  if (left < 200) {
    left += 1;
    Element.style.marginLeft = left + 'px';
    requestAnimationFrame(step)
  }
}
const judgeType = function (_obj) {
  const toString = Object.prototype.toString
  const Map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (_obj instanceof Element) {
    return  'element'
  }
  return Map[toString.call(_obj)]
}