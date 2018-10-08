import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    StyleSheet, 
    Dimensions,
    Modal,
} from 'react-native';

export default class ModalPicker extends Component {
    renderModalList = () => {
        let listKeys = this.props.list;
        if (this.props.list instanceof Object) {
            listKeys = Object.keys(this.props.list);
        }
        let renderList = [];
        listKeys.forEach((id) => {
            if (this.props.removeIdFromList === id) {
                return;
            }
            renderList.push(
                <TouchableOpacity
                    key={id}
                    style={[styles.listItem, id == this.props.selectedValue ? styles.selectedListItem : {}]}
                    onPress={() => {
                        this.props.onChange(id);
                        this.props.closeModalPicker();
                    }}
                >
                    <Text>
                        {this.props.list[id].name}
                    </Text>
                </TouchableOpacity>
            )
        });
        return renderList;
    }

    render () {
        return (
            <Modal
                visible={this.props.isModalPickerOpen}
                onRequestClose={() => this.props.closeModalPicker()}
                transparent={true}
            >
                <View style={styles.modalContent}>
                    <ScrollView
                        style={styles.modalScrollView}
                        scrollEnabled={true}
                    >
                        {this.renderModalList()}
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.modalPickerCloseButton}
                        onPress={() => this.props.closeModalPicker()}
                    >
                        <Text style={styles.modalPickerCloseButtonText}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContent: {
        position: 'absolute',
        top: "10%",
        left: "10%",
        height: .6 * Dimensions.get('window').height,
        width: .8 * Dimensions.get('window').width,
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalScrollView: {
        backgroundColor: 'white',
        height: '85%',
        width: '100%',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#CCCCCC',
        marginBottom: 10,
    },
    modalPickerCloseButton: {
        backgroundColor: '#2f95dc',
        height: 50,
        width: '100%',
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalPickerCloseButtonText: {
        fontSize: 20,
        color: 'white',
    },
    listItem: {
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedListItem: {
        borderColor: '#2f95dc',
        borderWidth: 2,
    },
    listItemText: {
        color: '#CCCCCC',
        fontSize: 24,
    }
})