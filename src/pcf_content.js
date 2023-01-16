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
