import {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Avatar, Button, Checkbox, Snackbar, TextInput} from 'react-native-paper';
import firebase from "firebase/compat"
import * as SecureStore from 'expo-secure-store';
import {mainTheme} from '../config/Theme'
import { Icon } from 'react-native-elements'
import { screens } from '../config/Screens';

export default function LoginComponent({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const [visible, setVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState("Unknown Error")
    const [checked, setChecked] = useState(false)

    const [init, setInit] = useState(false)

    let showError = (errorText) => {
        setErrorMessage(errorText)
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 3000)
    }


    let handleLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            if (checked) {
                SecureStore.setItemAsync("email", email);
                SecureStore.setItemAsync("password", password);
            } else {
                SecureStore.deleteItemAsync("email");
                SecureStore.deleteItemAsync("password");
            }
        }).catch(err => {
            showError(err.message)
        })
    }

    useEffect(async () => {
        if (!init) {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    navigation.navigate(screens.Dashboard)
                }
            });

            let email = await SecureStore.getItemAsync("email");
            let password = await SecureStore.getItemAsync("password");
            if (email && password) {
                setEmail(email);
                setPassword(password);
                setChecked(true)
            }
            setInit(true);
        }
    })

    return (
        <ImageBackground source={require("../assets/images/LoginWallpaper.png")} style={styles.container}>
             <Icon name='person' color='black' size={256}/>
            <View style={styles.inputView}>
                <TextInput
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={setEmail}
                    mode={'outlined'}
                    outlineColor= {mainTheme.colors.primary}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    placeholder="Enter Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    mode={'outlined'}
                    outlineColor= {mainTheme.colors.primary}
                />
            </View>
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
                <Text>Remember Me</Text>
            </View>

            <Button mode="contained" style={styles.loginBtn} onPress={handleLoginPress}>
                <Text>LOGIN</Text>
            </Button>

            <Snackbar
                visible={visible}>
                {errorMessage}
            </Snackbar>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: "center"
    },

    inputView: {
        margin: 20,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: mainTheme.colors,
    },

    loginBtn: {
        margin: 20
    },

    iconImage: {
        borderWidth: 0,
        alignSelf: "center"
    }
});