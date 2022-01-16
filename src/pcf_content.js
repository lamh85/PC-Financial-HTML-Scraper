import GetElement from './content_script/get_element.js'

console.log('running from content script again again')

const inputElem = await GetElement('input#username')

const passwordElem = await GetElement('input#password')

console.log(inputElem)

console.log(passwordElem)
