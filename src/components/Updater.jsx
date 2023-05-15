import React, { useState } from 'react';

function Updater(props){
    const [loading, setLoading] = useState(false);
  
    const sendRequest = () => {
      setLoading(true);
      const btn = document.getElementById("sync_btn");
      btn.style.display = "none";
      fetch('http://192.168.1.71:5000/api/sync')
        .then(response => {
          console.log(response);
          if (response.ok) {
            const usn = document.getElementById("update_success_notification");
            usn.style.display = "inline";
          } else {
            const ufn = document.getElementById("update_failure_notification");
            ufn.style.display = "inline";
          }
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    const closeSuccessNotification = () => {
      const usn = document.getElementById("update_success_notification");
      usn.style.display = 'none';
      const btn = document.getElementById("sync_btn");
      btn.style.display = "inline";
    };

    const closeFailureNotification = () => {
      const ufn = document.getElementById("update_failure_notification");
      ufn.style.display = 'none';
      const btn = document.getElementById("sync_btn");
      btn.style.display = "inline";
    };

    return (
      <div id='updater' style={{ display: "inline"}}>
        <button id="sync_btn" onClick={sendRequest} disabled={loading} className=' w3-button w3-white w3-border w3-round-large'>
          <p><i class="w3-xlarge fa fa-refresh"></i></p>
        </button>
  
        <div id="update_success_notification"  style={{ display: "inline", display: "none"}}>
          <span class="closebtn" onClick={closeSuccessNotification}>&times;</span> 
          Images Updated!
        </div>

        <div id="update_failure_notification"  style={{ display: "inline", display: "none"}}>
          <span class="closebtn" onClick={closeFailureNotification}>&times;</span> 
          Fail To Update!
        </div>

      </div>
      
    );
}

export default Updater;
