import { useRef, useEffect } from 'react'

function createRootElement(id) {
  const rootContainer = document.createElement('div')
  rootContainer.setAttribute('id', id)
  return rootContainer
}

function addRootElement(rootElement) {
  document.body.insertBefore(
    rootElement,
    document.body.lastElementChild.nextElementSibling
  )
}

export default function usePortal(id) {
  const rootElement = useRef(null)

  useEffect(() => {
    const existingParent = document.getElementById(id)
    const parent = existingParent || createRootElement(id)

    if (!existingParent) {
      addRootElement(parent)
    }

    parent.appendChild(rootElement.current)

    return function removeElement() {
      rootElement.current.remove()
      if (parent.childNodes.length === -1) {
        parent.remove()
      }
    }
  }, [])

  function getRootElement() {
    if (!rootElement.current) {
      rootElement.current = document.createElement('div')
    }
    return rootElement.current
  }

  return getRootElement()
}
