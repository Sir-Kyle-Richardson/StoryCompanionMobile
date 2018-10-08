import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default class GlobalAlert extends Component {
    figureAlertColor = () => {
        switch(this.props.type) {
            case 'success':
                return 'green';
            case 'warning':
                return '#F5A623';
            case 'danger':
                return 'red';
        }
    }

    figureIcon = () => {
        switch(this.props.type) {
            case 'success':
                return 'smile-o';
            case 'warning':
                return 'warning';
            case 'danger':
                return 'exclamation-circle';
        }
    }

    render() {
        if (this.props.visible) {
            return (
                <TouchableOpacity
                    style={[styles.globalAlertContainer, {backgroundColor: this.figureAlertColor()}]}
                    onPress={() => this.props.closeAlert()}
                >
                    <Icon
                        name={this.figureIcon()}
                        size={32}
                        type='font-awesome'
                        color='white'
                    />
                    <Text style={styles.alertMessageText}>
                        {this.props.message}
                    </Text>
                </TouchableOpacity>
            )
        }
        else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    globalAlertContainer: {
        position: 'absolute',
        top: 0,
        width: Dimensions.get('window').width,
        height: 60,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
    },
    alertMessageText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 10,
    },
})