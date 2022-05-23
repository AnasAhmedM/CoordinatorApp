import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import {TextInput,Button} from 'react-native-paper';
import {useState} from 'react';
import {mainTheme} from '../config/Theme'
import firebase from "firebase/compat"
import { getAuth, updatePassword } from "firebase/auth";

export default function ChangePassword({navigation, route}) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirePassword] = useState("");

    const handleUpdate = () => {
        if(newPassword !== confirmPassword){
            ToastAndroid.show('Password Do Not Match', ToastAndroid.SHORT)
            return
        }
        const auth = getAuth();
        const user = auth.currentUser;
        updatePassword(user, newPassword).then(() => {
            ToastAndroid.show('Password Changed', ToastAndroid.SHORT)
        })
          .catch((error) => {
            ToastAndroid.show(error.toString(), ToastAndroid.SHORT)
          });
      };

    return(
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    label="New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    mode={'outlined'}
                    />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirePassword}
                    mode={'outlined'}
                    />
            </View>

            <View style={styles.buttonView}>
                <Button 
                    onPress={handleUpdate}
                    theme={mainTheme}
                    mode='contained'
                    dark={true}
                    disabled={newPassword==="" || confirmPassword===""}
                ><Text>Change Password</Text></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: mainTheme.colors.background
    },

    inputView: {
        width: '90%',
        margin: 5,
        backgroundColor: mainTheme.colors,
    },

    buttonView:{
        paddingTop: 15
    },
})