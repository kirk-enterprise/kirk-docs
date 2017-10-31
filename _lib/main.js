window.onload = changeBodyHeight
window.onhashchange = changeBodyHeight

function changeBodyHeight() {
  var hash = window.location.hash
  var bodyEle = document.getElementsByTagName('body')[0]
  if (hash === '#/') {
    bodyEle.style.overflowY = 'hidden'
  } else {
    bodyEle.style.overflowY = 'auto'
  }
}