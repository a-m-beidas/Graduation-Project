import React, { useState } from 'react';

const Scan = () => {
    const [scanURL, setScanURL] = useState("");
    const [scanResult, setScanResult] = useState("");
    function scan() {
      event.preventDefault();
      const requestOptions = {
          method: 'GET',
          headers: { "Content-Type": "application/json",
                     Authorization: 'Bearer ' + localStorage.getItem('bearer-token') }
      };
      var url = new URL('http://localhost:81/api/scan')
      url.search = new URLSearchParams({url: scanURL}).toString();
      fetch(url, requestOptions)
          .then(function(response) {
              return response.text();
          })
          .then(result => {
              setScanResult(result);
          })
    }
    return (
      <div>
          <form onSubmit={ scan }>
              <input type="input"  value={scanURL} onChange={e => setScanURL(e.target.value)} name="url"/>
              <input type="submit" value="Scan"/>
          </form>
          <div>{scanResult}</div>
      </div>
    )
}

export default Scan;
