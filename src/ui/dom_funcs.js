const wrapInDiv = (str, ...classes) => {
  const div = document.createElement('div')
  div.innerText = str
  classes.forEach((cssClass) => div.classList.add(cssClass))
  return div
}

export {
  wrapInDiv
}
