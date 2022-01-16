const delay = (ms) => new Promise((res) => setTimeout(res, ms))

const getElem = async (cssSelector) => {
  const foundElem = document.querySelector(cssSelector)

  if (!foundElem) {
    await delay(1000)
    return getElem()
  }

  return foundElem
}

export default getElem

// const usernameInput = await getElem('input#username')

// const passwordInput = await getElem('input#password')

// export { usernameInput, passwordInput }
