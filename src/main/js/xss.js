import React, { useState } from 'react';

const Scan = () => {
    const [scanURL, setScanURL] = useState("http://localhost/xss/index.php");
    const [scanResult, setScanResult] = useState([]);
    function scan() {
      event.preventDefault();
      const requestOptions = {
          method: 'GET',
          headers: { "Content-Type": "application/json",
                     Authorization: 'Bearer ' + localStorage.getItem('bearer-token') }
      };
      var url = new URL('http://localhost:81/api/xss')
      url.search = new URLSearchParams({url: scanURL}).toString();
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
              <input type="input"  value={scanURL} onChange={e => setScanURL(e.target.value)} name="url"/>
              <input type="submit" value="Scan"/>
          </form>
          <div>
            {/* {scanResult.map(line => (<div>{line}<br/></div>))} */}
            {scanResult.map(line => (<div>{line}<br/></div>))}
          </div>
      </div>
    )
}

export default Scan;
