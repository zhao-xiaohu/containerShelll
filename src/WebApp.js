/**
 * 业务接入样例
 */
import App, { DevelopType } from "@mindverse/container";
import Fingerprint2 from "fingerprintjs2"; // 引入fingerprintjs2
import { useEffect, useState } from "react";

export default function Container(props) {
  const [refUserId, setRefUserId] = useState("");

  useEffect(() => {
    const browserId = localStorage.getItem("browserId");
    if (browserId) {
      setRefUserId(browserId);
    } else {
      // 选择哪些信息作为浏览器指纹生成的依据
      const options = {
        fonts: {
          extendedJsFonts: true,
        },
        excludes: {
          audio: true,
          userAgent: true,
          enumerateDevices: true,
          touchSupport: true,
        },
      };
      // 浏览器指纹
      const fingerprint = Fingerprint2.get(options, (components) => {
        // 参数只有回调函数或者options为{}时，默认浏览器指纹依据所有配置信息进行生成
        const values = components.map((component) => component.value); // 配置的值的数组
        const murmur = Fingerprint2.x64hash128(values.join(""), 31); // 生成浏览器指纹
        localStorage.setItem("browserId", murmur); // 存储浏览器指纹，在项目中用于校验用户身份和埋点
        setRefUserId(murmur);
      });
    }
  }, []);

  if (refUserId) {
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

              refUserId: refUserId,

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
              picture:
                "https://cdn.mindverse.com/files/zzzz20230308167826913484720230308-175144.gif",
            },
            dynamicHeight: false,
            developType: DevelopType.SCRIPT,
          }}
        />
      </div>
    );
  } else {
    return null;
  }
}
