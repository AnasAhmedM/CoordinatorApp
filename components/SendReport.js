import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TextInput, RadioButton, Divider, Title, Button} from 'react-native-paper';
import {Icon} from 'react-native-elements'
import {mainTheme} from '../config/Theme'
import firebase from "firebase/compat"
export default function SendReport({navigation, route}) {
    const [reporter] = useState(route.params?.uid)
    const [title, setTitle] = useState("")
    const [description, setDiscription] = useState("")
    const [priority, setPriority] = useState("Medium")

    useEffect

    let sendReport = () => {
        if(title === "" || description ==="")
            return
        let data = {
            title: title,
            description: description,
            priority: priority,
            reporter: reporter,
            date: Date.now()
        }
        firebase.database().ref(`Reports`).push(data)
        .catch(error =>{
          console.log(error.message)
        })
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

            <Button onPress={()=> sendReport()}><Text>Submit</Text></Button>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      borderWidth:1,
      backgroundColor: mainTheme.colors.background
    },

    inputView: {
        height:200,
        width:200,
        margin: 20,
        
        backgroundColor: mainTheme.colors,
    },

    radioButton: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
});