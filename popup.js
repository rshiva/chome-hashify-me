document.addEventListener('DOMContentLoaded', function () {
  var submitButton = document.querySelector('form');
  submitButton.addEventListener('submit', function(event){
    event.preventDefault();
    const url = "http://c72f4044f3bd.ngrok.io/v1/posts"
    let message = document.getElementById("message").value;
    let salt = document.getElementById("salt").value;
    let expiry_in = document.getElementById("expiry").value
    console.log(message)
    console.log(salt)
    console.log(expiry_in)

    let response = fetch(url,{
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({"body": message, "salty_password": salt, "expired_at": expiry_in}),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => response.json())
    .then(data => updateView(data));
  });

  function updateView(data){
    let responseData = data["data"]
    console.log(responseData);
    let messageForm = document.getElementById("message-form")
    messageForm.innerHTML = "Use the URL to share this encrypted message. \n URL: "+responseData['url_token']+ " \n Expires in" + responseData['expired_at']

  }


  
});


