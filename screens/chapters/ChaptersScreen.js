import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import EditEntity from '../../components/EditEntity.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import ChapterUtils from './components/ChaptersUtils.js';
import { Icon } from 'react-native-elements';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import ChapterContent from './components/ChapterContent.js';
import * as ChapterActions from '../../actions/ChapterActions.js';
import { showAlert } from '../../actions/Actions.js';
import STYLE from './components/ChaptersStyle.js';

class ChaptersScreen extends ChapterUtils {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chapters',
            headerTitle: (
                <View style={StoryCompanion.headerTitle}>
                    {StoryCompanion.renderNavigationTitle(
                        { navigation },
                        navigation.getParam('title'),
                        () => navigation.navigate('StoriesTab')
                    )}
                    {StoryCompanion.renderNavigationOptions({ navigation })}
                </View>
            ),
            headerStyle: { backgroundColor: '#2f95dc' },
            headerTitleStyle: { color: 'white' },
        };
    };

    constructor(props) {
        super(props);
        props.navigation.setParams({
            title: this.props.stories[this.props.selectedStoryId].name,
            onExport: this.exportChapters,
        });
    }

    oneLineInputs = () => [
        {
            name: 'Chapter Name',
            value: this.props.name,
            onChange: this.props.handleNameChanged,
            type: 'default',
        },
        {
            name: 'Chapter Number',
            value: this.props.number,
            onChange: this.props.handleNumberChanged,
            type: 'numeric',
        },
    ];

    multiLineInputs = () => [
        {
            name: 'Description',
            value: this.props.description,
            onChange: this.props.handleDescriptionChanged,
        },
    ];

    renderChapters = () => {
        if (this.props.chapters === null) {
            return null;
        }
        let sortedChapterIds = this.sortEntitiesByNumber(this.props.chapters);
        let chapterView = [];
        if (sortedChapterIds.length > 0) {
            sortedChapterIds.forEach(id => {
                chapterView.push(
                    <TouchableOpacity
                        key={id}
                        style={STYLE.chapterViewChapterContainer}
                        onPress={() => this.selectChapter(id)}
                    >
                        <TouchableOpacity
                            style={STYLE.chapterWriteIconButton}
                            onPress={() => this.selectChapterToWriteContent(id)}
                        >
                            <Icon color="#2f95dc" type="material" name="edit" size={30} />
                        </TouchableOpacity>
                        <View style={STYLE.chapterNameContainer}>
                            <Text style={STYLE.chapterNumber}>
                                {this.props.chapters[id].number + '.'}
                            </Text>
                            <Text style={STYLE.chapterName} numberOfLines={2}>
                                {this.props.chapters[id].name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            });
            return chapterView;
        } else {
            return (
                <View style={STYLE.noChaptersContainer}>
                    <Text style={STYLE.noChaptersText}>
                        Looks like you haven't created any chapters yet.
                    </Text>
                    <Text style={STYLE.noChaptersText}>Press on the + to create a chapter!</Text>
                </View>
            );
        }
    };

    render() {
        if (this.props.selectedChapterId === null) {
            return (
                <View style={STYLE.container}>
                    <ScrollView style={STYLE.container}>{this.renderChapters()}</ScrollView>
                    <FloatingAddButton onPress={this.newChapter} />
                </View>
            );
        } else if (this.props.isWritingChapter) {
            return (
                <View style={STYLE.container}>
                    <ChapterContent
                        chapterName={this.props.name}
                        chapterNumber={this.props.number}
                        chapterContent={this.props.content}
                        handleContentChanged={this.props.handleContentChanged}
                    />
                </View>
            );
        } else {
            return (
                <View style={STYLE.container}>
                    <EditEntity
                        selectedEntityId={this.props.selectedChapterId}
                        isModalOpen={this.props.isConfirmationModalOpen}
                        entityType="Chapter"
                        oneLineInputs={this.oneLineInputs()}
                        multiLineInputs={this.multiLineInputs()}
                    />
                    <ConfirmationModal
                        isConfirmationModalOpen={this.props.isConfirmationModalOpen}
                        closeConfirmationModal={this.props.closeConfirmation}
                        confirmationTitle={'Delete Chapter?'}
                        entityDescription=""
                        onConfirm={() => {
                            this.deleteChapter();
                            this.onConfirmationConfirm();
                        }}
                        note=""
                    />
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.chapterStore,
        email: state.appStore.email,
        apiKey: state.appStore.apiKey,
        userId: state.appStore.userId,
        stories: state.storyStore.stories,
        selectedStoryId: state.storyStore.selectedStoryId,
    };
}

const mapDispatchToProps = {
    ...ChapterActions,
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChaptersScreen);
