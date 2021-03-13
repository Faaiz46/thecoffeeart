import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Platform, Vibration } from "react-native";
//import { notify } from "../Utils";

export async function registerForPushNotificationsAsync() {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
        //    notify({ title:"Failed!", msg:"Failed to get push token for push notification!" });
            return;
        }
        const token = await Notifications.getExpoPushTokenAsync();
        
        if (Platform.OS === "android") {
            Notifications.createChannelAndroidAsync("default", {
            name: "default",
            sound: true,
            priority: "max",
            vibrate: [0, 250, 250, 250]
            });
        }

        return token
    } else {
        // alert("Must use physical device for Push Notifications");
       // notify({ title:"Warning!", msg:"Must use physical device for Push Notifications!" });
    }
}

export function _handleNotification(notification) {
  if (notification.origin === "received") {
    Vibration.vibrate();
    console.log("notification : ", notification);
  }

  if (notification.origin === "selected") {
    
  }
}

export async function sendPushNotification(obj) {
    if (obj) {
      const message = {
        to: obj.to ? obj.to : this.props.expoToken,
        sound: obj.sound || obj.sound !== null ? obj.sound : "default",
        title: obj.title ? obj.title : "Moody Tasker",
        body: obj.body ? obj.body : "Here is the body!",
        data: obj.data,
        _displayInForeground: obj.foreground ? obj.foreground : true,
        ...obj.other
      };
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      });
    } else {
      alert("Notification object is required!");
    }
  }