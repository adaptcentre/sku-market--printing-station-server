import fetch from 'node-fetch'

fetch('https://api.sku-market.com/api/receipt', {
	method: 'POST',
	headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
	body: JSON.stringify({id:'5489907f-86d8-4a7a-9f48-8cf77366b11e'})
}).then(res => res.json()).then( json => console.log(json))