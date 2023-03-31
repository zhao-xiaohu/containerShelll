/**
 * 业务接入样例
 */
import App, { DevelopType } from "@mindverse/container";
import { useEffect, useState } from "react";
import request from "./request";

export default function Container(props) {
  
  // 解析 URL 对象
  const url = new URL(window.location.href);
  // 取得查询字符串参数
  const params = new URLSearchParams(url.search);

  // 获取指定参数的值
  const host = params.get("host");
  const merchantId = params.get("merchantId");
  const appId = params.get("appId");
  const mindId = params.get("mindId");

  const [avatarInfo, setAvatarInfo] = useState({
    avatar: "",
    model: "",
  });

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
