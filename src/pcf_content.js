import GetElement from './content_script/get_element.js'
import * as Env from '../.env.json'

// Select the node that will be observed for mutations
const targetNode = document.getElementsByTagName('body')[0]

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true }

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
      console.log('childList changed!!!')
      // console.log(targetNode.innerHTML?.includes('Transactions'))

      const txTables = document.querySelectorAll('tbody.credit')
      const postedTable = (txTables || [])[1]

      if (!!postedTable) {
        console.log('Transaction table changed! ---------')

        const pageLoadTime = Date.now()

        const data = [...postedTable.querySelectorAll('tr')].map(
          (trElement) => {
            return {
              vendor: trElement.querySelector('span.description-text')
                .innerText,
              date: trElement.querySelector('span.description-date').innerText,
              amount: trElement.querySelector('.amount').innerText,
              category: trElement.querySelector('img[alt]').alt,
              pageLoadTime,
            }
          }
        )

        console.log(data)
      }
    }
  }
}

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback)

// Start observing the target node for configured mutations
observer.observe(targetNode, config)

// chrome.webRequest is not defined. There's a bug in the Chrome Extension library.
// chrome.webRequest.onCompleted.addListener(
//   ({ responseHeaders }) => {
//     console.log(responseHeaders)
//   },
//   { types: ['object', 'image', 'media'] }
// )

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
