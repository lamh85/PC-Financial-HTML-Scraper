// console.log('this is an index')

chrome.runtime.onStartup.addListener(() => console.log('this is an index'))

console.log('from popup')

const element = document.querySelector('button')

console.log('found this button:')
console.log(element)

const clickHandler = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { requestType: 'PRINT_HTML' })
  })
}

element.addEventListener('click', clickHandler)
