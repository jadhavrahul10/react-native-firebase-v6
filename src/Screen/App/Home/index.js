import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import {HeaderC, SearchC} from '../../../component/index';


import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux'
import {Layout, Text, Select, SelectItem, Divider, ListItem, Card, Button} from '@ui-kitten/components';
import {Avatar, Popover,} from '@ui-kitten/components';


const selectItems = ['ID', 'Name', 'Contact', 'District', 'Pin code', 'State', 'Date', 'EAN', 'Article', 'Product', 'SR'];

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            user: "",
            displayValue: 0,
            searchResult: [],
            activeSections: [],
            entries: [1, 2, 1, 1, 1, 1, 1, 1, 1]
        };
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.setState({user: JSON.parse(userToken)})


    };

    updateSearch = (search) => {
        this.setState({search});
    };
    style = StyleSheet.create({
        ViewStyle: {
            flex: 1
        }
    });

    setSelectedIndex = (index) => {
        this.setState({displayValue: selectItems[index.row]})
    }


    handleImageChange = async (txt) => {

        if (this.state.displayValue) {
            this.setState({searchResult: []})
            let filteredResult = [];
            let allDatax = await AsyncStorage.getItem('userData');
            allDatax = JSON.parse(allDatax);
            allDatax.map((eachRecord, index) => {
                const key = eachRecord[this.state.displayValue.toLowerCase()];
                if (key.includes(txt.toLowerCase())) {
                    filteredResult.push(eachRecord);
                }
            });
            this.setState({searchResult: filteredResult})
        }
    };


    removeRecord = async (index) => {


    }


    render() {

        var {height, width} = Dimensions.get('window');
        return (
            <Layout style={this.style.ViewStyle}>
                <View style={{paddingBottom: 20}}>
                    <HeaderC navigation={this.props.navigation}/>
                    <Select
                        style={{paddingBottom: 10, paddingLeft: 10, paddingRight: 10}}
                        value={this.state.displayValue}
                        onSelect={index => this.setSelectedIndex(index)}>
                        {
                            selectItems.map((element, index) => {
                                return (
                                    <SelectItem title={element} key={index}/>
                                );
                            })
                        }

                    </Select>
                    <SearchC onTypeComplete={txt => {
                        this.handleImageChange(txt);
                    }}/>
                </View>


                <View style={{marginTop: 20}}>
                    <View style={{flexDirection: 'row', marginBottom: 20}}>
                        <View style={{flex: 1}}>
                            <Text
                                style={{
                                    marginLeft: 20,
                                    fontSize: 18,
                                    fontFamily: 'Montserrat-SemiBold'
                                }}
                            >
                                Records ({this.state.searchResult.length})
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row-reverse'}}>
                            <Text
                                style={{
                                    marginRight: 20,
                                    fontSize: 13,
                                    fontFamily: 'Montserrat-SemiBold'
                                }}
                                onPress={() => {
                                    // AsyncStorage.removeItem('userToken')
                                    this.props.navigation.navigate('Cate');
                                }}
                            >
                                Add
                            </Text>
                        </View>
                    </View>

                </View>
                <ScrollView style={{flex: 1}}>

                    {
                        this.state.searchResult.map((eachRecord, index) => {
                            return (<PopoverStyledBackdropShowcase key={index} content={eachRecord}
                                                                   onPress={() => this.removeRecord(index)}/>);
                        })
                    }

                </ScrollView>
            </Layout>
        );
    }
}


const PopoverStyledBackdropShowcase = ({content, onPress}) => {

    const [visible, setVisible] = React.useState(false);

    const renderToggleButton = () => (
        <View>
            <Card style={{marginTop: 10}}>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Text style={{flexDirection: 'column'}}>
                        Name: {content.name}
                    </Text>
                    <Text style={{flexDirection: 'column'}}>
                        Contact: {content.contact}
                    </Text>
                </TouchableOpacity>
            </Card>
        </View>

    );

    const Footer = (props) => (
        <View {...props} style={[props.style, styles.footerContainer]}>
            <Button
                style={styles.footerControl}
                size='small'
                onPress={onPress}>
                Remove
            </Button>

        </View>
    );

    return (
        <Popover
            backdropStyle={styles.backdrop}
            visible={visible}
            anchor={renderToggleButton}
            onBackdropPress={() => setVisible(false)}>
            <Layout style={styles.content}>
                <View style={{flexDirection: 'column'}}>

                    <Text>District: {content.district}</Text>
                    <Text>PinCode: {content.state}</Text>
                    <Text>State: {content.pincode}</Text>
                    <Text>Work/Business: {content.work}</Text>
                    <Text>Date: {content.date}</Text>
                    <Text>Time: {content.time}</Text>
                    <Text>EAN: {content.ean}</Text>
                    <Text>Article: {content.article}</Text>
                    <Text>Product: {content.product}</Text>
                    <Text>Category: {content.category}</Text>
                    <Text>Sr: {content.sr}</Text>
                    <Text>Notes: {content.notes}</Text>
                    <Text>Comments: {content.comments}</Text>
                    <Text>Function-1: {content.function1}</Text>
                    <Text>Function-2: {content.function2}</Text>
                    <Text>Function-3: {content.function3}</Text>
                    <Text>Function-4: {content.function4}</Text>
                </View>
            </Layout>
        </Popover>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        flex: 1,
        margin: 2,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
        paddingVertical: 8,
    },
    avatar: {
        marginHorizontal: 4,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});


const mapStateToProps = (state /*, ownProps*/) => {
    return {
        state: state
    }
}
export default connect(
    mapStateToProps)(Home);
