/**
 * 业务接入样例
 */
import App, { DevelopType } from "@mindverse/container";
import Fingerprint2 from "fingerprintjs2"; // 引入fingerprintjs2
import { useEffect, useRef, useState } from "react";
import request from "./request";

export default function Container(props) {
  const [refUserId, setRefUserId] = useState("");
  const parentUrlRef = useRef("");

  // 解析 URL 对象
  const url = new URL(window.location.href);
  // 取得查询字符串参数
  const params = new URLSearchParams(url.search);

  // 获取指定参数的值
  const host = params.get("host") || "https://gateway-pre.mindverse.com";
  const merchantId = params.get("merchantId") || "c1dyf";
  const appId =
    params.get("appId") || "os_54b9f83c-58e2-4e32-8cc8-b1dcb872c0aa";
  const mindId = params.get("mindId") || "81870359162392576";

  const [avatarInfo, setAvatarInfo] = useState({
    mindName: "",
    avatar: "",
    model: "",
  });

  const setDefault = () => {
    console.error("url params error, go default");
    setAvatarInfo({
      mindName: "shitou-demo",
      avatar:
        "https://cdn.mindverse.com/files/zzzz20230308167826913484720230308-175144.gif",
      model: "",
    });
  };

  // ?host=https://gateway-test.mindverse.com&merchantId=c1dxs&appId=os_9f86530d-838a-4301-b873-ec5f0e3ce4b8&mindId=91530602754478080
  // <script src="https://front-img-1309544882.cos.ap-shanghai.myqcloud.com/container/script.js" defer>https://gateway-test.mindverse.com,c1dxs,os_9f86530d-838a-4301-b873-ec5f0e3ce4b8,91530602754478080</script>
  useEffect(() => {
    if (host && merchantId && appId && mindId) {
      request({
        baseURL: host,
        url: "/chat/rest/general/mind/get/config/by/mind",
        method: "post",
        data: { mindId },
        headers: {
          AuthType: "STATION_KEY",
          merchantId,
          platform: "web",
          appId,
        },
      })
        .then((res) => {
          if (res.data?.code === 0 && res.data?.data) {
            setAvatarInfo({
              avatar: res.data.data.avatarInfo?.avatar,
              model: res.data.data.avatarInfo?.model,
              mindName: res.data.data.mindName,
            });
          } else {
            setDefault();
          }
        })
        .catch((e) => {
          setDefault();
        });
    } else {
      setDefault();
    }
  }, []);

  const getFinger = (callback) => {
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
    Fingerprint2.get(options, (components) => {
      // 参数只有回调函数或者options为{}时，默认浏览器指纹依据所有配置信息进行生成
      const values = components.map((component) => component.value); // 配置的值的数组
      const murmur = Fingerprint2.x64hash128(values.join(""), 31); // 生成浏览器指纹
      callback && callback(murmur);
    });
  };

  useEffect(() => {
    if (localStorage) {
      console.log("OK localStorage.");
      const browserId = localStorage.getItem("browserId");
      if (browserId) {
        setRefUserId(browserId);
      } else {
        getFinger((finger) => {
          localStorage.setItem("browserId", finger);
          setRefUserId(finger);
        });
      }
    } else {
      console.error("No localStorage.");
      getFinger((finger) => {
        setRefUserId(finger);
      });
    }
  }, []);

  useEffect(() => {
    const uniqueClassName = "hidden-scrollbar";
    
    if (!document.querySelector(`.${uniqueClassName}`)) {
      const style = document.createElement("style");
      style.innerHTML = `
        .${uniqueClassName}::-webkit-scrollbar {
          width: 0;
          background: none;
        }
    
        .${uniqueClassName}::-webkit-scrollbar-thumb {
          background: none;
        }
      `;
      document.head.appendChild(style);
      const element = document.getElementsByTagName(`body`);
      element[0].classList.add(uniqueClassName);
    }
  },[])

  if (
    refUserId &&
    avatarInfo &&
    (avatarInfo.avatar || avatarInfo.model) &&
    avatarInfo.mindName
  ) {
    return (
      <div style={{ width: "100vw", height: "95vh" }}>
        <App
          sessionCb={(_sessionId) => {}}
          config={{
            mindConfig: {
              mindId,
              mindType: "original",
            },
            socketConfig: {
              apiVersion: "1.3.0",
              platform: "web",
              appId,
              bizType: "",
              merchantId,
              mAuthType: "STATION_KEY",

              refUserId: refUserId,

              merchantBaseURL: host,
              merchantSocketPath: "/chat/rest/general/ws/create",
              merchantSessionOpenPath: "/chat/rest/general/session/create",
              merchantSessionClosePath: "/chat/rest/general/session/close",
              merchantUserRegisterPath: "/chat/rest/general/user/register",
              merchantSocketCheckPath: "/chat/rest/general/ws/get",
              merchantSessionCheckPath: "/chat/rest/general/session/get",

              headers: {},
            },
            userConfig: {
              userName: avatarInfo.mindName,
              picture: avatarInfo.avatar,
              model: avatarInfo.model,
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
