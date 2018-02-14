import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, Image, TextInput} from 'react-native';
import {StackNavigator} from 'react-navigation';

// const App = StackNavigator({
//     Home: FlatListBasics,// говорит что этот класс не screen
//     Profile: ProfileScreen,
// });
//
// class HomeScreen extends React.Component {
//     static navigationOptions = {
//         title: 'HomeScreen',
//     };
//
//     render() {
//
//         const {navigate} = this.props.navigation;
//
//     }
// }

var dataSource = [];
export default class FlatListBasics extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    load() {
        return fetch(`http://old.relef.ru/v1/content/news/`)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson.response.ITEMS);
                dataSource = Object.values(responseJson.response.ITEMS);
                this.setState({
                    isLoading: false,
                }, function () {
                    console.log(dataSource.length);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.load();
    }

    render() {
        //console.log("length "+dataSource.ITEMS.length);
        if (this.state.isLoading)
            return (
                <Text style={styles.loading}>loading...</Text>
            );
        // const {navigate} = this.props.navigation;
        return (

            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <Text style={styles.textToolbar}>Toolbar</Text>
                </View>

                <FlatList
                    data={dataSource}
                    // onEndReached={() => {
                    //     this.load(dataSource.length) пагинация
                    // }}

                    renderItem={({item}) => {
                        const date = new Date(item.DATE);
                        const path = "http://relefopt.ru" + item.PREVIEW_PATH;
                        //console.log(date);
                        return (
                            <View style={styles.itemView}>
                                <Image source={{uri: path}}
                                       style={{width: 50, height: 50, margin: 5, marginLeft: 20}}/>

                                <View>
                                    <Text
                                        style={styles.title}>{date.getDate()}/{date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}/{date.getFullYear()}</Text>
                                    <Text style={styles.item}>{item.NAME}</Text>
                                </View>

                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 4,
        backgroundColor: '#eeeeee'
    },
    item: {
        margin: 10,
        fontSize: 16,
        width: 250,

    },
    itemView: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        flexDirection: "row",
        marginBottom: 10,
        shadowRadius: 2,
        alignItems: "center",
    },
    title: {
        padding: 10,
        fontSize: 14,
    },
    toolbar: {

        paddingBottom: 15,
        alignContent: "flex-end",
        justifyContent: "flex-end",
        height: 80,
        backgroundColor: '#3982ff',
    },
    textToolbar: {
        fontSize: 20,
        color: '#FFFFFF',
        marginLeft: 20,


    },
    loading: {
        paddingTop: 50,
        paddingLeft: 20,
        paddingBottom: 10,
    }
})