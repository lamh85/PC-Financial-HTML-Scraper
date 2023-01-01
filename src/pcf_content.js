import GetElement from './content_script/get_element.js'
import * as Env from '../.env.json'

console.log('pcf_cotent.js loaded')

console.log('chrome object keys:')
console.log(Object.keys(chrome))
console.log(chrome.webRequest)

chrome.webRequest.onCompleted.addListener(
  ({ responseHeaders }) => {
    console.log(responseHeaders)
  },
  { types: ['object', 'image', 'media'] }
)

const login = async () => {
  const inputElem = await GetElement('input#username')
  inputElem.value = Env.PCF_USERNAME

  const passwordElem = await GetElement('input#password')
  passwordElem.value = Env.PCF_PASSWORD
  passwordElem.className = 'ng-dirty ng-valid ng-touched'

  const alertElem = await GetElement('span[role="alert"]')
  alertElem.remove()

  const formElem = await GetElement('form')
  formElem.className = 'form ng-touched ng-dirty ng-valid'

  const signInElem = await GetElement('button[type="submit"]')
  signInElem.disabled = false
  // signInElem.click()
}

const navigateToTransactions = async () => {
  const transactionsLink = document.querySelector('a[href*="transactions"]')
  transactionsLink.click()
}

const handleTransactionsPage = async () => {
  // Flow: open dates filter, enter dates, submit, copy data to somewhere
  // if filters are not open, then open
  //   const dateDialog = document.querySelector('#uiMenu0')
  // if filters are open, but date fields are not complete, then fill them
  // if filters are open, and dates are entered, then submit
  // if the page mentions a date range that matches with specs, then copy the data to somewhere
  //   document.querySelectorAll('.pills').length == 1
}

const openDateFilters = () => {
  const buttonElem = document.querySelector('button[aria-controls="uiMenu0"]')
  buttonElem.click()
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  const titleText = document.querySelector('title').innerText

  if (/login/i.test(titleText)) {
    // await login()
  } else if (/dashboard/i.test(titleText)) {
    navigateToTransactions()
  } else if (/transactions/i.test(titleText)) {
    openDateFilters()
  }
})
