import { Platform } from "react-native";
//import { showMessage, hideMessage } from "react-native-flash-message";
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
//import { theme } from '../constants/theme';

// export function notify(obj){
//     const { error, msg, title, } = obj
//     showMessage({
//         message: title ? title : msg,
//         ...title ? { description: msg } : '',
//         type: error ? "default" : theme.tertiary,
//         backgroundColor: error ? "" : theme.tertiary, // background color
//         textStyle:{ textAlign:'left' },
//         titleStyle:{ textAlign:'left' },
//         // color: "#606060", // text color 
//     });
// }

export function wp(ios, android, ipad) {
    if(Platform.isPad && ipad){
        return ipad ? widthPercentageToDP(isNullRetNull(ipad, 0)) : widthPercentageToDP(isNullRetNull(ios, 0));
    }
    if(ios && android){
        return Platform.OS === 'ios' ? widthPercentageToDP(isNullRetNull(ios, 0)) : widthPercentageToDP(isNullRetNull(android, 0));
    }else{
        return widthPercentageToDP(isNullRetNull(ios, 0))
    }

    // if(ios && android){
    //     return Platform.OS === 'ios' ? widthPercentageToDP(isNullRetNull(ios, 0)) : widthPercentageToDP(isNullRetNull(android, 0));
    // }else{
    //     return widthPercentageToDP(isNullRetNull(ios, 0))
    // }
}

export function hp(ios, android, ipad) {
    if(Platform.isPad && ipad){
        return ipad ? heightPercentageToDP(isNullRetNull(ipad, 0)) : heightPercentageToDP(isNullRetNull(ios, 0));
    }
    if(ios && android){
        return Platform.OS === 'ios' ? heightPercentageToDP(isNullRetNull(ios, 0)) : heightPercentageToDP(isNullRetNull(android, 0));
    }else{
        return heightPercentageToDP(isNullRetNull(ios, 0))
    }
}
// export function hp(ios, android) {
//     if(ios && android){
//         return Platform.OS === 'ios' ? heightPercentageToDP(isNullRetNull(ios, 0)) : heightPercentageToDP(isNullRetNull(android, 0));
//     }else{
//         return heightPercentageToDP(isNullRetNull(ios, 0))
//     }
// }

export function isObjEmpty(obj){
    if(obj){
        return Object.keys(obj).length === 0;
    }
    return true;
}

export function simplify(string){
    if(string !== null && string !== undefined && string !== ""){
        return string.replace(/\s/g, '').toLowerCase();
    }
    return string;
}

export function isNullRetNull(string, retVal=''){
    return string && string !== undefined && string !== null && string !== "" ? string : retVal;
}

export function splitArrayIntoChunks(array, lenght) {
    var chunks = [], i = 0, n = array.length;
    while (i < n) {
      chunks.push(array.slice(i, i += lenght));
    }
    return chunks;
}

export function getRandomString(length=6) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

export function getUrl(url, slug=false){
    if(url){
        if(url.includes("http")){
            if(url.includes("watch?v=")){
                return { html: `<iframe src="${url.replace("watch?v=", "embed/")}"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="0" donotallowfullscreen
                    />`}
            }else if(url.includes("youtu.be")){
                return { html: `<iframe src="${url.replace("youtu.be", "youtube.com/embed/")}"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="0" donotallowfullscreen
                    />`}
            }else{
                return { uri: url }
            }
        }else{
            if(slug){
                return { html: `<iframe src="https://www.youtube.com/embed?listType=search&list==${url}"
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="0" donotallowfullscreen
                />`}
            }

            return { html: `<iframe src="https://www.youtube.com/embed/${url}"
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="0" donotallowfullscreen
                />`}
        }
    }else{
        return { html: `<iframe src=""
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="0" donotallowfullscreen
        />`}
    }
}

export function search(list, keyword='', byKey='name'){
    let matched = [];
    if(keyword !== ''){
        matched = list.filter(function(obj){
            if(typeof(byKey) === 'object'){
                if(byKey[1] === 'product'){
                    for (let index = 0; index < obj.order.length; index++) {
                        const element = obj.order[index];
                        if((element[byKey[1]].toLowerCase().substring(0, keyword.length) === (keyword.toLowerCase()))){
                            return (element[byKey[1]].toLowerCase().substring(0, keyword.length) === (keyword.toLowerCase()));
                        }
                    }
                }
                if(byKey[0] === 'name'){
                    if((obj[byKey[0]].toLowerCase().substring(0, keyword.length) === (keyword.toLowerCase()))){
                        return (obj[byKey[0]].toLowerCase().substring(0, keyword.length) === (keyword.toLowerCase()));
                    }
                }
            }else{
                return (obj[byKey].toLowerCase().substring(0, keyword.length) === (keyword.toLowerCase()));
            }
        })
    }else{
        matched = list;
    }
    return matched
  }