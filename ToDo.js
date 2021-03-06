import React from 'react';
import { StyleSheet,
    Text,
    View,
    StatusBar,
    TextInput,
    Dimensions,
    Platform,
    ScrollView,
TouchableOpacity,
}
    from 'react-native';

const {width, height} = Dimensions.get('window');

export default class ToDo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {isEditing: false, toDoValue: props.text}
    }
    render(){
        const {isEditing, toDoValue} = this.state;
        const {text, id, deleteToDo, isCompleted} = this.props;
        return(
            <View style={styles.container}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[
                            styles.circle,
                            isCompleted ? styles.completedCircle : styles.uncompletedCircle
                        ]}
                        />
                    </TouchableOpacity>
                {isEditing ? (
                    <TextInput style={[
                        styles.text,
                        styles.input,
                        isCompleted ? styles.completedText : styles.uncompletedText
                    ]}
                       value={toDoValue}
                       multiline={true}
                    onChangeText={this._controlInput}
                    returnKeyType={'done'}
                    onBlur={this._finishEditing}
                               underlineColorAndroid={'transparent'}
                    />
                ) : (<Text style={[styles.text,
                    isCompleted ? styles.completedText : styles.uncompletedText
                    ]}
                >
                    {text}
                </Text>
                    )}
                    {isEditing ? <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>
                                    ✔
                                </Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                     : <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>
                                        🖋
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPressOut={(event)=>{
                                event.stopPropagation();
                                deleteToDo(id);
                            }}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>
                                        ❌
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }

            </View>
            );
    }

   _toggleComplete = (event) => {
        event.stopPropagation();
       const {isCompleted, uncompleteToDo, completeToDo, id} = this.props;
       if(isCompleted){
           uncompleteToDo(id);
       } else {
           completeToDo(id);
       }
   };

    _startEditing = (event) => {
        event.stopPropagation();
        this.setState({
            isEditing: true,
        });
    };

    _finishEditing = (event) => {
        event.stopPropagation();
        const {toDoValue} = this.state;
        const {id, updateToDo} = this.props;
        updateToDo(id, toDoValue);
        this.setState({
            isEditing: false
        })
    };

    _controlInput = (text) => {
        this.setState({toDoValue: text});
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text:{
        fontWeight: '600',
        fontSize: 20,
        marginVertical: 20
    },
    completedCircle : {
        borderColor: '#bbb'
    },
    uncompletedCircle: {
        borderColor: '#F23657'
    },
    circle:{
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: 'red',
        borderWidth: 3,
        marginRight: 20
    },
    completedText : {
        color: '#bbb',
        textDecorationLine: 'line-through'
    },
    uncompletedText : {
        color: '#353839'
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width /2,
    },
    actions: {
        flexDirection: 'row'
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
    },
    input : {
        marginVertical: 20,
        width: width/2,
    }
});