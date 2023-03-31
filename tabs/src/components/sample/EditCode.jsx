import React, { useState } from "react";
import { MaskedTextField } from '@fluentui/react/lib/TextField';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { useBoolean } from '@fluentui/react-hooks';
import { encode } from "base-64";
import axios from "axios";

export function EditCode(props) {


  const { tabCodeEntry } = {
    tabCodeEntry: "tabs/src/index.jsx",
    ...props,
  };
  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Verfication Code',
    subText: 'Please Enter the Verfication Code',
  };

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  // const [data, setCode] = useState({code: ''});
  const [verifycode, setVerifyCode] = useState('');
  // const handleSub = (event) => {
  //   event.preventDefault();
  //   let username = 'Gmyz9LvjXMPsnOnCktfH4vLW8Ayi';
  //   let password = '5Kjvyt95m7C0UfvTr0pmPlmQUpbp';
  //   fetch('https://services.inteliquent.com/Services/2.0.0/tnDetail', {
  //     method: 'POST',
  //     mode: 'no-cors',
  //     headers: {
  //       'Authorization': 'Basic ' + encode('${username}:${password}'),
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //   .then(response => {
  //     console.log('response',response)
  //   })
  //   .catch(error => {
  //     console.log('error',error)
  //   });
  // };

  const handleSub = (event) => {
    event.preventDefault();
    let username = 'Gmyz9LvjXMPsnOnCktfH4vLW8Ayi';
    let password = '5Kjvyt95m7C0UfvTr0pmPlmQUpbp';
    const data = {
      privateKey: username,
      tnSearchList: {
        tnSearchItem: [
          {
            tnMask: verifycode
          }
        ]
      },
      "pageSort": {
        "size": 1,
        "page": 1
      }
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic R215ejlMdmpYTVBzbk9uQ2t0Zkg0dkxXOEF5aTo1S2p2eXQ5NW03QzBVZnZUcjBwbVBsbVFVcGJw',
    }
    const url = 'https://services.inteliquent.com/Services/2.0.0/tnDetail'

    axios.post(url, data, {
      headers: headers
    })
      .then((response) => {
        console.log("data", response)
      })
      .catch((error) => {
        console.log("dataerror", error)
      })
    // axios({
    //   method: 'post',
    //   mode: 'no-cors',
    //   url: url,
    //   withCredentials: false,
    //   headers: headers,
    //   data: JSON.stringify(data)
    // })
    // .then((response) => {
    //   console.log("data",response)
    //  })
    //  .catch((error) => {
    //    console.log("dataerror",error)
    //  })

    // const jsonData = JSON.stringify(data);
    // const headers = {
    //   'Content-Type': 'application/json',
    //   'Authorization': "Basic R215ejlMdmpYTVBzbk9uQ2t0Zkg0dkxXOEF5aTo1S2p2eXQ5NW03QzBVZnZUcjBwbVBsbVFVcGJw",
    // };

    // fetch('https://services.inteliquent.com/Services/2.0.0/tnDetail', {
    //       method: 'POST',
    //       mode: 'no-cors',
    //       headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': "Basic R215ejlMdmpYTVBzbk9uQ2t0Zkg0dkxXOEF5aTo1S2p2eXQ5NW03QzBVZnZUcjBwbVBsbVFVcGJw",
    //          },
    //       body: JSON.stringify(data)
    //     })
    //     .then(response => {
    //       console.log('response',response)
    //     })
    //     .catch(error => {
    //       console.log('error',error)
    //     });

    // fetch('https://services.inteliquent.com/Services/2.0.0/tnDetail', {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   headers: headers,
    //   body: jsonData
    // })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.error(error));
  }

  const [showDetails, setShowDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showbutton, setShowButton] = useState(false);
  // const handleSubmit = (event) => {
  //   event.preventDefault(); // prevent default form submission behavior
  //   // check if code is valid
  //   if (data === "12345") {
  //     setShowDetails(true); // set showDetails state to true
  //     toggleHideDialog(false);
  //     setErrorMessage(""); // clear error message
  //   } else {
  //     setErrorMessage("Invalid code!"); // set error message
  //   }

  // };

  return (
    <div>
      <MaskedTextField label="Please Enter the Mobile Number" mask="(999) 999 - 9999" title="A 10 digit number" />
      <div style={{ height: 10 }}></div>
      <DefaultButton secondaryText="Opens the Sample Dialog" onClick={toggleHideDialog} text="Verify" />
      {showDetails && (
        <div>
          <h2>Details</h2>
          <p>Welcome To the Application</p>
          <p>Name : Test Name</p>
        </div>
      )}
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <div class="row">
          <form onSubmit={handleSub}>
            <div>
              <label htmlFor="code">Enter code:</label>
              {/* <input type="text" id="code" value={data.code} onChange={(event) => setCode(event.target.value)} /> */}
              <input type="number" value={verifycode} onChange={e => setVerifyCode(e.target.value)} />
            </div>
            <DialogFooter>
              <PrimaryButton type="submit">Submit</PrimaryButton>
              <DefaultButton onClick={toggleHideDialog} text="Cancel" />
            </DialogFooter>
          </form>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </Dialog>
    </div>

  );

}

