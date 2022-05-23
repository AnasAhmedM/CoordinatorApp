import {StyleSheet, View,ScrollView} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {mainTheme} from '../config/Theme'
import {useState, useEffect} from 'react';
import firebase from "firebase/compat"
import { Screens } from '../config/Screens';

export default function ViewReports({navigation, route}) {
    const [title] = useState(route.params?.title)
    const [description] = useState(route.params?.description)
    const [priority] = useState(route.params?.priority)
    const [reportID] = useState(route.params?.id)
    const [uid] = useState(route.params?.uid)

    const markRead=()=>{
        firebase.database().ref(`/Coordinators/${uid}/reports/${reportID}/read`).set(true)
    }

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={{padding:5}}>
                    <Text style={{fontWeight: 'bold', fontSize:20}}>{title}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text>Priority: </Text>
                        <Text style={{color: priority==='high'? 'red': 'blue'}}>{priority}</Text>
                    </View>
                    <Text style={{fontSize: 18}}>{description}</Text>
                    </View>
            </ScrollView>
            <View style={styles.buttonView}>
                <Button 
                    onPress={()=> markRead()}
                    theme={mainTheme}
                    mode='contained'
                    dark={true}
                    disabled={title==="" || description===""}
                ><Text>Mark Read</Text></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
      },

    scrollView: {
        marginTop: 50,
        borderWidth: 1,
        margin: 5
    },

    buttonView:{
        paddingTop: 15,
        paddingBottom: 15,
        alignSelf: 'center',
        width: '60%'
    },
})