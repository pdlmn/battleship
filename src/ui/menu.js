export const menuController = (() => {
  const disableElement = (el) => { el.disabled = true }
  const enableElement = (el) => { el.disabled = false }

  return {
    disableElement,
    enableElement
  }
})()
