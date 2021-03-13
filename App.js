//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator, SafeAreaView ,Platform, StatusBar, BackHandler} from 'react-native';
import {
  registerForPushNotificationsAsync,
  _handleNotification,
} from './PushNotification';
import { WebView } from 'react-native-webview';
import { wp } from './util';



class App extends React.Component{
  handleNotification = _handleNotification.bind(this)
  constructor(props){
      super(props)
      this.state={
          loader:true,
          url:"http://thecoffeeart.ae/"
      }
      this.webview_ref = React.createRef();

  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

handleBackButton = ()=>{
   this.webview_ref.current.goBack();
   return true;
}

onNavigationStateChange(navState) {
  this.setState({
    canGoBack: navState.canGoBack
  });
}


  UNSAFE_componentWillMount(){
    registerForPushNotificationsAsync();
  
//    Notifications.addListener(this.handleNotification);
  }




  setStateObj(obj){
      this.setState({ ...this.state, ...obj })
  }

  render(){
       const { onLoad } = this.props;
      const { loader,url } = this.state;

      return (<>
          { loader &&
              <View style={styles.loaderView}>
                  <ActivityIndicator size="large" color={"black"} />
              </View>
          }
          {/* <SafeAreaView forceInset={{ top: 'always' }}  style={{ flex: 1,paddingTop: Platform.select({android:StatusBar.currentHeight})}} > */}
          <View style={styles.StatusBar}>
                    <StatusBar translucent={true} barStyle="light-content" backgroundColor = "rgb(230,185,85)" />
                </View>
          <View style={{flex:1}}>
          <WebView
              
              onLoad={(e) => {
                  this.setStateObj({ loader:false })
                  if(onLoad) onLoad(e)
              }}
              allowsFullscreenVideo={true}
              source={{ uri:url }}
              ref={this.webview_ref}
              onNavigationStateChange={this.onNavigationStateChange.bind(this)}
              />

              </View>
              {/* </SafeAreaView> */}
      </>);
  }
}

export default App;

const styles = StyleSheet.create({
  loaderView:{
      position:'absolute',
      top:0,
      zIndex:10,
      width:wp('100'),
      height:'100%',
      alignItems:'center',
      justifyContent:'center'
  },
  StatusBar: {
   //height: 25,
    backgroundColor: "rgb(230,185,85)"
  },
});
