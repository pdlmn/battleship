import { curry } from '@pdlmn/func-helpers'

const wrapInDiv = curry((str, classes) => {
  const div = document.createElement('div')
  div.innerText = str
  div.classList.add(...classes)
  return div
})

const createEl = curry((classes, element) => {
  const el = document.createElement(element)
  el.classList.add(...classes)
  return el
})

const addId = curry((id, element) => {
  element.id = id
  return element
})

const addText = curry((str, element) => {
  element.textContent = str
  return element
})

const addClass = curry((newClass, element) => {
  element.classList.add(newClass)
  return element
})

const removeClass = curry((removed, element) => {
  element.classList.remove(removed)
  return element
})

const replaceClass = curry((oldClass, newClass, element) => {
  element.classList.replace(oldClass, newClass)
  return element
})

const toggleClass = curry((toggledClass, element) => {
  element.classList.toggle(toggledClass)
  return element
})

const addClasses = curry((classes, element) => {
  element.classList.add(...classes)
  return element
})

const removeClasses = curry((classes, element) => {
  element.classList.remove(...classes)
  return element
})

const addDataAttr = curry((dataAttr, dataVal, element) => {
  element[dataAttr] = dataVal
  return element
})

const cssSelector = curry((element, query) => {
  return element.querySelector(query)
})

const queryDocument = cssSelector(document)

const replaceEl = curry((oldElement, newElement) => {
  oldElement.parentNode.replaceChild(newElement, oldElement)
  return newElement
})

const cloneEl = curry((element) => {
  return element.cloneNode(true)
})

const clearElContent = curry((element) => {
  while (element.lastChild) {
    element.lastChild.remove()
  }
  return element
})

export {
  wrapInDiv,
  createEl,
  addId,
  addText,
  addClass,
  addClasses,
  removeClass,
  removeClasses,
  replaceClass,
  toggleClass,
  addDataAttr,
  cssSelector,
  queryDocument,
  replaceEl,
  cloneEl,
  clearElContent
}
