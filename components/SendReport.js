import {useState} from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import {TextInput, RadioButton, Button} from 'react-native-paper';
import {mainTheme} from '../config/Theme'
import firebase from "firebase/compat"

export default function SendReport({navigation, route}) {
    const [uid] = useState(route.params?.uid)
    const [reporter] = useState(route.params?.name)
    const [title, setTitle] = useState("")
    const [description, setDiscription] = useState("")
    const [priority, setPriority] = useState("Medium")

    let randomID = () => {
        return ((Math.floor(Math.random() * 1000) + 1)*(Math.floor(Math.random() * 1000) + 1)).toString()
    }

    let sendReport = () => {
        let data = {
            title: title,
            description: description,
            priority: priority,
            reporter: reporter,
            date: Date.now(),
            read: false
        }
        firebase.database().ref(`Reports/${randomID()}`).set(data)
        .catch(error =>{
          console.log(error.message)
        })
        ToastAndroid.show('Report Sent', ToastAndroid.SHORT)
        setTitle('')
        setDiscription('')
        setPriority('Medium')
    }

    return(
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    label="Title"
                    value={title}
                    onChangeText={setTitle}
                    mode={'outlined'}
                    />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    label="Description"
                    value={description}
                    onChangeText={setDiscription}
                    mode={'outlined'}
                    outlineColor={mainTheme.colors.primary}
                    multiline={true}
                    numberOfLines={20}
                    />
            </View>

            <View style={styles.radioButton}>
            <RadioButton
                value={priority}
                status={ priority === 'Low' ? 'checked' : 'unchecked' }
                onPress={() => setPriority('Low')}
                color={"black"}
            />
            <Text style={{alignSelf: "center"}}>Low</Text>
            <RadioButton
                value={priority}
                status={ priority === 'Medium' ? 'checked' : 'unchecked' }
                onPress={() => setPriority('Medium')}
                color={"black"}
            />
            <Text style={{alignSelf: "center"}}>Medium</Text>
            <RadioButton
                value={priority}
                status={ priority === 'High' ? 'checked' : 'unchecked' }
                onPress={() => setPriority('High')}
                color={"black"}
            />
            <Text style={{alignSelf: "center"}}>High</Text>
            </View>

            <View style={styles.buttonView}>
                <Button 
                    onPress={()=> sendReport()}
                    theme={mainTheme}
                    mode='contained'
                    dark={true}
                    disabled={title==="" || description===""}
                ><Text>Submit</Text></Button>
            </View>
        </View>
    );

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

    radioButton: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
});