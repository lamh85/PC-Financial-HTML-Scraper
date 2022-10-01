import GetElement from './content_script/get_element.js'
import * as Env from '../.env.json'

console.log('running from content script again again')

const enableSignInButton = (passwordElem) => {
  passwordElem.focus()

  // const keyboardEvent = document.createEvent('KeyboardEvent')
  // const initMethod =
  //   typeof keyboardEvent.initKeyboardEvent !== 'undefined'
  //     ? 'initKeyboardEvent'
  //     : 'initKeyEvent'

  // keyboardEvent[initMethod](
  //   'keydown', // event type: keydown, keyup, keypress
  //   true, // bubbles
  //   true, // cancelable
  //   window, // view: should be window
  //   false, // ctrlKey
  //   false, // altKey
  //   false, // shiftKey
  //   false, // metaKey
  //   40, // keyCode: unsigned long - the virtual key code, else 0
  //   0 // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
  // )
  // document.dispatchEvent(keyboardEvent)
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log('received this message ----------')
  console.log(request)

  const inputElem = await GetElement('input#username')
  inputElem.value = Env.PCF_USERNAME

  const passwordElem = await GetElement('input#password')
  passwordElem.value = Env.PCF_PASSWORD

  enableSignInButton(passwordElem)
})
