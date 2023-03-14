/**
 * 业务接入样例
 */
import App, { DevelopType } from "@mindverse/container";

export default function Container(props) {
  const refUserId = "shitou";

  return (
    <div style={{ width: "100vw", height: "95vh" }}>
      <App
        sessionCb={(_sessionId) => {}}
        config={{
          mindConfig: {
            mindId: "81870359162392576", // pre
            // mindId: '76643513529405440', // test
            mindType: "original",
          },
          socketConfig: {
            apiVersion: "1.3.0",
            platform: "web",
            appId: "os_54b9f83c-58e2-4e32-8cc8-b1dcb872c0aa", // pre
            // appId: 'os_742e9fcd-d543-4c99-94d7-404119bea18a', // test
            bizType: "",
            merchantId: "c1dyf", // pre
            // merchantId: 'c1e3x', // test
            mAuthType: "STATION_KEY",

            refUserId,

            merchantBaseURL: "https://gateway-pre.mindverse.com", // pre
            // merchantBaseURL: 'https://gateway-test.mindverse.com', // test
            merchantSocketPath: "/chat/rest/general/ws/create",
            merchantSessionOpenPath: "/chat/rest/general/session/create",
            merchantSessionClosePath: "/chat/rest/general/session/close",
            merchantUserRegisterPath: "/chat/rest/general/user/register",
            merchantSocketCheckPath: "/chat/rest/general/ws/get",
            merchantSessionCheckPath: "/chat/rest/general/session/get",

            headers: {},
          },
          userConfig: {
            userName: "shitou-demo",
            avatar:
              "https://cdn.mindverse.com/files/zzzz20230308167826913484720230308-175144.gif",
          },
          dynamicHeight: false,
          developType: DevelopType.SCRIPT,
        }}
      />
    </div>
  );
}
