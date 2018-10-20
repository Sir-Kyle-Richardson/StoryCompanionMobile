import React from 'react';
import { Platform, StatusBar, StyleSheet, View,  } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { AdMobBanner } from 'expo';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <View style={styles.container}>
                    <AppLoading
                        startAsync={this._loadResourcesAsync}
                        onError={this._handleLoadingError}
                        onFinish={this._handleFinishLoading}
                    />
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    {/* Remove ad in paid version */}
                    <AppNavigator />
                    <View style={styles.adContainer}>
                        <AdMobBanner
                            bannerSize="smartBannerPortrait"
                            adUnitID={
                                Platform.OS === 'android'
                                    ? "ca-app-pub-5830175342552944/7130625883"
                                    : "ca-app-pub-5830175342552944/4205993347"
                            }
                            testDeviceID="EMULATOR"
                        />
                    </View>
                </View>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Font.loadAsync({
                ...Icon.Ionicons.font,
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            }),
        ]);
    };

    _handleLoadingError = error => {
        
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  adContainer: {
    width: '100%',
    height: 'auto',
    margin: 0,
    backgroundColor: 'black'
  }
});
