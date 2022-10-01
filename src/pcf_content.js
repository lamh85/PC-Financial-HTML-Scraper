import GetElement from './content_script/get_element.js'
import * as Env from '../.env.json'

const login = async () => {
  const inputElem = await GetElement('input#username')
  inputElem.value = Env.PCF_USERNAME
  inputElem.className = 'ng-valid ng-touched ng-dirty'

  const passwordElem = await GetElement('input#password')
  passwordElem.value = Env.PCF_PASSWORD
  passwordElem.className = 'ng-dirty ng-valid ng-touched'

  const formElem = await GetElement('form')
  formElem.className = 'form ng-touched ng-dirty ng-valid'

  const signInElem = await GetElement('button[type="submit"]')
  signInElem.disabled = false
  // signInElem.click()
}

const navigateToTransactions = async () => {
  const inputElem = await GetElement('input#username')

  document.querySelectorAll('a[href*=transactions]')
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  const titleText = document.querySelector('title').innerText

  if (/login/i.test(titleText)) {
    await login()
  } else if (/dashboard/i.test(titleText)) {
    console.log('dashboard page!')
  }
})
