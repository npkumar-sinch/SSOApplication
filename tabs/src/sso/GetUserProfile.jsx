// This file is auto generated by Teams Toolkit to provide you instructions and reference code to implement single sign on.
// This file will use TeamsFx SDK to call Graph API to get user profile.
// Refer to this link to learn more: https://www.npmjs.com/package/@microsoft/teamsfx-react#calling-the-microsoft-graph-api.

import { Button } from "@fluentui/react-northstar";
import { useGraph } from "@microsoft/teamsfx-react";

export function GetUserProfile(props) {
  const { teamsfx } = {
    teamsfx: undefined,
    ...props,
  };

  // For usage of useGraph(), please refer to: https://www.npmjs.com/package/@microsoft/teamsfx-react#usegraph.
  const { loading, error, data, reload } = useGraph(
    async (graph, teamsfx, scope) => {
      // Call graph api directly to get user profile information
      const profile = await graph.api("/me").get();

      // You can also add following code to get your photo:
      // let photoUrl = "";
      // try {
      //   const photo = await graph.api("/me/photo/$value").get();
      //   photoUrl = URL.createObjectURL(photo);
      // } catch {
      //   // Could not fetch photo from user's profile, return empty string as placeholder.
      // }
      return { profile };
    },
    // Add scope for your Azure AD app. For example: Mail.Read, etc.
    // Use teamsfx instance from `InitTeamsFx`
    { scope: ["User.Read"], teamsfx: teamsfx }
  );

  return (
    <div>
      {/* <h2>GetUserProfile</h2>
      <p>Click below to authorize button to grant permission to using Microsoft Graph.</p>
      <Button primary content="Authorize" disabled={loading} onClick={reload} />
      {!loading && error && (
        <div className="error">Failed to read your profile. Please try again later.</div>
      )} */}
      {!loading && data && <h2>Hello {data.profile.displayName}</h2>}
    </div>
  );
}