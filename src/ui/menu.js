export const menuController = (() => {
  let canStart = false

  const disableElement = (el) => { el.disabled = true }
  const enableElement = (el) => { el.disabled = false }

  const setStart = (val) => { canStart = val }

  return {
    disableElement,
    enableElement,
    setStart
  }
})()
