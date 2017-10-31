window.onload = changeBodyHeight
window.onhashchange = changeBodyHeight

function changeBodyHeight() {
  var path = window.location.pathname
  var hash = window.location.hash
  var bodyEle = document.getElementsByTagName('body')[0]
  if (path === '/' && hash === '#/') {
    bodyEle.style.overflowY = 'hidden'
  } else {
    bodyEle.style.overflowY = 'auto'
  }
}