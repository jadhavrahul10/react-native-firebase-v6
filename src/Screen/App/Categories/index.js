import React, {useState} from 'react';
import {View, StatusBar, StyleSheet, Image, ScrollView} from 'react-native';
import ButtonC from '../../../component/Button';
import GButton from '../../../component/GButton';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {
    Layout, Text, Input, Icon, SelectItem, Datepicker
} from '@ui-kitten/components';
import {useDispatch} from 'react-redux'

const allData = {
    'id': '',
    'name': '',
    'contact': '',
    'district': '',
    'pincode': '',
    'state': '',
    'work': '',
    'date': '',
    'time': '',
    'ean': '',
    'article': '',
    'product': '',
    'category': '',
    'sr': '',
    'notes': '',
    'comments': '',
    'function1': '',
    'function2': '',
    'function3': '',
    'function4': ''
};


const Cat = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [district, setDistrict] = useState('');
    const [pincode, setPinCode] = useState('');
    const [state, setState] = useState('');
    const [work, setWork] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [ean, setEan] = useState('');
    const [article, setArticle] = useState('');
    const [product, setProduct] = useState('');
    const [category, setCategory] = useState('');
    const [sr, setSr] = useState('');
    const [notes, setNotes] = useState('');
    const [comments, setComments] = useState('');
    const [function1, setFunction1] = useState('');
    const [function2, setFunction2] = useState('');
    const [function3, setFunction3] = useState('');
    const [function4, setFunction4] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');
    const [loading, setloading] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const saveDetails = async () => {
        allData.name = name;
        allData.contact = contact;
        allData.district = district;
        allData.pincode = pincode;
        allData.state = state;
        allData.work = work;
        allData.date = date;
        allData.time = time;
        allData.ean = ean;
        allData.article = article;
        allData.product = product;
        allData.category = category;
        allData.sr = sr;
        allData.notes = notes;
        allData.comments = comments;
        allData.function1 = function1;
        allData.function2 = function2;
        allData.function3 = function3;
        allData.function4 = function4;

        let allDatax = await AsyncStorage.getItem('userData');
        allDatax = JSON.parse(allDatax);
        allData.id = allDatax.length + 1;
        allDatax.push(allData);
        AsyncStorage.setItem('userData', JSON.stringify(allDatax));
        Toast.show("Successfull add data");

        navigation.navigate('Home', {
            data: undefined
        });

    }


    let secondTextInput = null;
    let thirdTextInput = null;
    let fourTextInput = null;
    let fiveTextInput = null;
    let sixTextInput = null;
    let sevenTextInput = null;
    let eightTextInput = null;
    let nineTextInput = null;
    let TextInput10 = null;
    let TextInput11 = null;
    let TextInput12 = null;
    let TextInput13 = null;
    let TextInput14 = null;
    let TextInput15 = null;
    let TextInput16 = null;
    let TextInput17 = null;
    let TextInput18 = null;
    let TextInput19 = null;
    let TextInput20 = null;
    return (
        <Layout style={style.ViewStyle}>
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', }}>
                    <View style={{flex: 1}}>
                        <Text
                            style={{
                                marginTop:20,
                                marginLeft: 0,
                                fontSize: 18,
                                fontFamily: 'Montserrat-SemiBold'
                            }}
                        >
                            Add Detail
                        </Text>
                    </View>
                </View>

                <ScrollView style={{flex: 1}}>
                    <View style={style.inputContainer}>
                        <Input
                            placeholder="Name"
                            style={{marginTop: 0}}
                            autoCapitalize='none'
                            onChangeText={(e) => setName(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                secondTextInput.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <Input
                            ref={(input) => {
                                secondTextInput = input;
                            }}
                            placeholder="Contact"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setContact(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                thirdTextInput.focus();
                            }}
                            blurOnSubmit={false}
                        />

                        <Input
                            ref={(input) => {
                                thirdTextInput = input;
                            }}
                            placeholder="District"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setDistrict(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                fourTextInput.focus();
                            }}
                            blurOnSubmit={false}
                        />

                        <Input
                            ref={(input) => {
                                fourTextInput = input;
                            }}
                            placeholder="PinCode"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setPinCode(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                fiveTextInput.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <Input
                            ref={(input) => {
                                fiveTextInput = input;
                            }}
                            placeholder="State"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setState(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                sixTextInput.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <Input
                            ref={(input) => {
                                sixTextInput = input;
                            }}
                            placeholder="Work/Business"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setWork(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                sevenTextInput.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <Datepicker
                            ref={(input) => {
                                sevenTextInput = input;
                            }}
                            date={date}
                            style={{marginTop: 10}}
                            onSelect={nextDate => {
                                setDate(nextDate)
                                eightTextInput.focus();
                            }}
                        />
                        <Input
                            ref={(input) => {
                                eightTextInput = input;
                            }}
                            placeholder="Time"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setTime(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                nineTextInput.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <Input
                            ref={(input) => {
                                nineTextInput = input;
                            }}
                            placeholder="EAN"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setEan(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                TextInput10.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <Input
                            ref={(input) => {
                                TextInput10 = input;
                            }}
                            placeholder="Article"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setArticle(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                TextInput11.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <Input
                            ref={(input) => {
                                TextInput11 = input;
                            }}
                            placeholder="Product"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setProduct(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                TextInput12.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <Input
                            ref={(input) => {
                                TextInput12 = input;
                            }}
                            placeholder="Category"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setCategory(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                TextInput13.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <Input
                            ref={(input) => {
                                TextInput13 = input;
                            }}
                            placeholder="Sr"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setSr(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                TextInput14.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <Input
                            ref={(input) => {
                                TextInput14 = input;
                            }}
                            placeholder="Notes"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setNotes(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                TextInput15.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <Input
                            ref={(input) => {
                                TextInput15 = input;
                            }}
                            placeholder="Comments"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setComments(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                TextInput16.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <Input
                            ref={(input) => {
                                TextInput16 = input;
                            }}
                            placeholder="Function-1"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setFunction1(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                TextInput17.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <Input
                            ref={(input) => {
                                TextInput17 = input;
                            }}
                            placeholder="Function-2"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setFunction2(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                TextInput18.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <Input
                            ref={(input) => {
                                TextInput18 = input;
                            }}
                            placeholder="Function-3"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setFunction3(e)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                TextInput19.focus();
                            }}
                            blurOnSubmit={false}
                        />
                        <Input
                            ref={(input) => {
                                TextInput19 = input;
                            }}
                            placeholder="Function-4"
                            style={{marginTop: 10}}
                            autoCapitalize='none'
                            onChangeText={(e) => setFunction4(e)}
                            returnKeyType={"next"}
                            blurOnSubmit={false}
                            onSubmitEditing={() => {
                                saveDetails()
                            }}
                        />
                        <Text status='danger'>{error}</Text>

                    </View>
                    <GButton loading={loading} Text={'Save'} onPress={() => saveDetails()}/>
                </ScrollView>
            </View>
        </Layout>
    )


}


const style = StyleSheet.create({
    ViewStyle: {
        padding: 30,
        flex: 1
    },
    TextStyle: {
        marginTop: 20,
        fontSize: 30,

    },
    subTextStyle: {
        fontSize: 20,
        fontFamily: 'Montserrat-Light'
    },
    inputStyle: {
        fontSize: 15,
        fontFamily: 'Montserrat-Light'
    },
    inputContainer: {
        paddingTop: 20,
        flex: 1
    }
});


const mapStateToProps = (state /*, ownProps*/) => {
    return {};
};

export default connect(mapStateToProps)(Cat);


