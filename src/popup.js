// console.log('this is an index')

chrome.runtime.onStartup.addListener(() => console.log('this is an index'))

console.log('from popup')

const element = document.querySelector('button')
element.addEventListener('click', (event) => {
  console.log(event)
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    const activeTab = tabs[0]
    const activeTabId = activeTab.id // or do whatever you need
    console.log(activeTabId)
  })
})
