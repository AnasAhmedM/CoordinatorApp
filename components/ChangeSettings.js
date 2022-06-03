import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import {TextInput,Button} from 'react-native-paper';
import {useState} from 'react';
import {mainTheme} from '../config/Theme'
import firebase from "firebase/compat"
import { getAuth, updateEmail } from "firebase/auth";

export default function ChangeSettings({navigation, route}) {
    const [oldName, setOldName] = useState(route.params?.data.name);
    const [oldEmail, setOldEmail] = useState(route.params?.data.email);
    const [oldUsername, setOldUsername] = useState(route.params?.data.username);
    const [oldDepartment, setOldDepartment] = useState(route.params?.data.department);
    const [name, setName] = useState(route.params?.data.name);
    const [email, setEmail] = useState(route.params?.data.email);
    const [username, setUsername] = useState(route.params?.data.username);
    const [department, setDepartment] = useState(route.params?.data.department);
    const [id] = useState(route.params?.data.id);

    const handleUpdate = () => {
        if(oldName !== name){
            firebase.database().ref(`Coordinators/${id}/name`).set(name)
            .then(() => {setOldName(name)})
        }
        if(oldEmail !== email){
            const auth = getAuth();
            updateEmail(auth.currentUser, email).then(() => {
                firebase.database().ref(`Coordinators/${id}/email`).set(email)
                .then(() => {setOldEmail(email)})
            })
            .catch(err => {
                showError(err.message)
            })
        }
        if(oldUsername !== username){
            firebase.database().ref(`Coordinators/${id}/username`).set(username)
            .then(() => {setOldUsername(username)})
        }
        if(oldDepartment !== department){
            firebase.database().ref(`Coordinators/${id}/department`).set(department)
            .then(() => {setOldDepartment(department)})
        }
        ToastAndroid.show('Data Updated', ToastAndroid.SHORT)
      };

    return(
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={setName}
                    mode={'outlined'}
                    />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode={'outlined'}
                    />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
                    mode={'outlined'}
                    />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    label="Department"
                    value={department}
                    onChangeText={setDepartment}
                    mode={'outlined'}
                    />
            </View>

            <View style={styles.buttonView}>
                <Button 
                    onPress={handleUpdate}
                    theme={mainTheme}
                    mode='contained'
                    dark={true}
                    disabled={
                        (name==="" || email==="" || username==="" || department==="") ||
                        (oldName === name && oldEmail === email && oldUsername === username && oldDepartment === department)
                    }
                ><Text>Update</Text></Button>
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