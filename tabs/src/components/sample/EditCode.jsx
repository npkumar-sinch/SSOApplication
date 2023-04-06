import React, { useState } from "react";
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Stack} from '@fluentui/react';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel
} from "@fluentui/react-accordion";
import "./EditCode.css";

export function EditCode(props) {

  const { tabCodeEntry } = {
    tabCodeEntry: "tabs/src/index.jsx",
    ...props,
  };
  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
  const stackTokens = { childrenGap: 50 };
  const [verifycode, setVerifyCode] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [invalidDetails, setInvalidDetails] = useState("");
  const [showDetails, setShowDetails] = useState(true);
  async function createUser() {
    if (verifycode == "") {
      setErrorMessage("Please Enter the Number !");
      setShowDetails(false)
    }
    else {
      setErrorMessage("");
      const data = {
        privateKey: '',
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
      const response = await fetch(`/Services/2.0.0/tnDetail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: data })
      })
      const responseData = await response.json();
      setResponseData(responseData);
      if (responseData.userData.trunkcall == verifycode) {
        setShowDetails(true);
        setInvalidDetails("")
      }
      else {
        setInvalidDetails("Given Details are Not Matching !");
        setShowDetails(false)
      }
    }
  };



  return (
    <div>
      <TextField type="number" label="Please Enter the Mobile Number" placeholder="Enter the Number" value={verifycode} onChange={e => setVerifyCode(e.target.value)}></TextField>
      {errorMessage && <p className="invalid">{errorMessage}</p>}
      {invalidDetails && <p className="invalid">{invalidDetails}</p>}
      <div style={{ height: 10 }}></div>
      <PrimaryButton onClick={createUser} text="Submit" />
      <div style={{ height: 5 }}></div>
      {showDetails && (
        <div>
          {responseData && (
            <div className="App">
              <h1 className="center">Hello {responseData.userData.name} </h1>
              <Accordion
                expandIconPosition="right"
                icon={undefined}
                openItems={[
                  '1'
                ]}
                size="large"
                navigable={true}
                alwaysOpen
              >
                <AccordionItem className="accordianDrop" value="1"  >
                  <AccordionHeader className="title">E911 Services</AccordionHeader>
                  <AccordionPanel>
                    <div className="userField">
                      <TextField label="Name" value={responseData.userData.name} disabled></TextField>
                    </div>
                    <Stack horizontal tokens={stackTokens}>
                    <div className="userField">
                      <TextField label="Street Num" value={responseData.userData.origStreetNum} disabled></TextField>
                    </div>
                    <div className="userField">
                      <TextField label="Street Num" value={responseData.userData.trunkcall} disabled></TextField>
                    </div>
                    </Stack>
                    <Stack horizontal tokens={stackTokens}>
                      <div className="userField">
                        <TextField className="textinput" label="Street Info" value={responseData.userData.origStreetInfo} disabled></TextField>
                      </div>
                      <div className="userField">
                        <TextField className="textinput" label="City" value={responseData.userData.origCity} disabled></TextField>
                      </div>
                    </Stack>
                    <Stack horizontal tokens={stackTokens}>
                      <div className="userField">
                        <TextField className="textinput" label="Postal Code" value={responseData.userData.origPostalCode} disabled></TextField>
                      </div>
                      <div className="userField">
                        <TextField className="textinput" label="Activate Date" value={responseData.userData.e911ActivateDate} disabled></TextField>
                      </div>
                    </Stack>
                    <div className="space"></div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



