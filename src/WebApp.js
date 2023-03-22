/**
 * 业务接入样例
 */
import App, { DevelopType } from "@mindverse/container";
import { useEffect, useState } from "react";
import request from "./request";

export default function Container(props) {
  // ?merchantId=c1dxw&appId=os_aa93da4a-1c60-4ef1-aab9-17b3a1fb5af3&mindId=40128313284497408
  // <script src="https://front-img-1309544882.cos.ap-shanghai.myqcloud.com/container/script.js" defer>c1dxw,os_aa93da4a-1c60-4ef1-aab9-17b3a1fb5af3,40128313284497408</script>

  // 解析 URL 对象
  const url = new URL(window.location.href);
  // 取得查询字符串参数
  const params = new URLSearchParams(url.search);

  // 获取指定参数的值
  const merchantId = params.get("merchantId");
  const appId = params.get("appId");
  const mindId = params.get("mindId");

  const [avatarInfo, setAvatarInfo] = useState({
    avatar: "",
    model: "",
  });

  useEffect(() => {
    if (merchantId && appId && mindId) {
      request({
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
            alert(JSON.stringify(res.data.message));
          }
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      alert("url params error");
    }
  }, []);

  if (
    merchantId &&
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

              refUserId: "shitou",

              merchantBaseURL: "https://gateway-pre.mindverse.com",
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
