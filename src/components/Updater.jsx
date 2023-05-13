import React, { useState } from 'react';

function Updater(props){
    const [loading, setLoading] = useState(false);
  
    const sendRequest = () => {
      setLoading(true);
      const btn = document.getElementById("sync_btn");
      btn.style.display = "none";
      fetch('http://127.0.0.1:5000/api/sync')
        .then(response => {
          console.log(response);
          if (response.ok) {
            const usn = document.getElementById("update_success_notification");
            const ufn = document.getElementById("update_failure_notification");
            if (response.status===200){
              usn.style.display = "block";
            } else{
              ufn.style.display = "block";
            }
          } else {
            throw new Error('Request failed');
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
      btn.style.display = "block";
    };

    const closeFailureNotification = () => {
      const ufn = document.getElementById("update_failure_notification");
      ufn.style.display = 'none';
      const btn = document.getElementById("sync_btn");
      btn.style.display = "block";
    };

    return (
      <div>
        <button id="sync_btn" onClick={sendRequest} disabled={loading}>
          <p>&nbsp; &nbsp; &nbsp; <i class="w3-xlarge fa fa-refresh"></i></p>
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
