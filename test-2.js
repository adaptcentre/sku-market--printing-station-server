import fetch from 'node-fetch'

fetch('http://localhost:4030/api/print', {
	method: 'POST',
	headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
	body: JSON.stringify({id:'5489907f-86d8-4a7a-9f48-8cf77366b11e'})
})
.then(res => res.json())
.then( json => console.log(json))
.catch(err => console.log(err))