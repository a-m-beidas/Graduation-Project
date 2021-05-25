import React, { useState } from 'react';

const XSS = () => {
    const [targetURL, setTargetURL] = useState("http://localhost/xss/index.php");
    const [scanResult, setScanResult] = useState([]);
    function scan(event) {
      event.preventDefault();
      const requestOptions = {
          method: 'GET',
          headers: { "Content-Type": "application/json",
                     Authorization: 'Bearer ' + localStorage.getItem('bearer-token') }
      };
      var url = new URL('http://localhost:81/api/xss')
      url.search = new URLSearchParams({url: targetURL}).toString();
      fetch(url, requestOptions)
          .then(function(response) {
              return response.text();
          })
          .then(result => {
              console.log(typeof(result))
              console.log(result);
              setScanResult(JSON.parse(result));
          })
    }
    return (
      <div>
          <form onSubmit={ scan }>
              <input type="input"  value={targetURL} onChange={e => setTargetURL(e.target.value)} name="url"/>
              <input type="submit" value="Scan"/>
          </form>
          <div>
            {/* {scanResult.map(line => (<div>{line}<br/></div>))} */}
            {scanResult.map(line => (<div>{line}<br/></div>))}
          </div>
      </div>
    )
}

export default XSS;
