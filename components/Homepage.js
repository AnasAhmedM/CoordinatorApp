import {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Card, Avatar, Divider, Title, Button} from 'react-native-paper';
import {Icon} from 'react-native-elements'
import {mainTheme} from '../config/Theme'
import firebase from "firebase/compat"
import { screens } from '../config/Screens';

export default function HomepageComponent({navigation}) {
    const [init, setInit] = useState(false);
    const [currentUserData, setCurrentUserData] = useState({name: 'Loading...'});

    useEffect(() => {
        if (!init) {
            setInit(true);
            firebase.database().ref(`Coordinators/${firebase.auth().currentUser.uid}`).on("value", snapshot => {
                setCurrentUserData(snapshot.val());
            })
        }
    })

    let handleLogout =()=> {
        firebase.auth().signOut().catch(err => {
            console.log(err)
        })
    }

    return(
        <View style={styles.home}>

            <TouchableOpacity onPress={()=>alert("Profile")}>
                <Icon name='person' color='black' size={192}/>
            </TouchableOpacity>

            <Text style={styles.welcomeText}>
               {currentUserData.name}
            </Text>

            <Text mode="contained" style={styles.loginoutBtn} onPress={()=> handleLogout()}>Logout</Text>

            <View style={styles.dashboard}>

                <View style={styles.cardRow}>
                    <TouchableOpacity style={{paddingLeft:16, paddingRight:16}} onPress={()=>alert("View Data")}>
                        <Card style={styles.card} >
                            <Icon name='analytics' color='black' size={80} paddingTop={10}/>
                            <Text style={styles.cardText}>View Data</Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity style={{paddingLeft:16, paddingRight:16}} onPress={()=>navigation.navigate(screens.SendReport, {uid: currentUserData.id})}>
                        <Card style={styles.card} theme={mainTheme}>
                            <Icon name='message' color='black' size={80} paddingTop={10}/>
                            <Text style={styles.cardText}>Send Report</Text>
                        </Card>
                    </TouchableOpacity>
                </View>

                <View style={styles.cardRow}>
                    <TouchableOpacity style={{paddingLeft:16, paddingRight:16}} onPress={()=>alert("View Report")}>
                        <Card style={styles.card} >
                            <Icon name='blank' color='black' size={80} paddingTop={10}/>
                            <Text style={styles.cardText}>Text</Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity style={{paddingLeft:16, paddingRight:16}} onPress={()=>alert("View Report")}>
                        <Card style={styles.card} theme={mainTheme}>
                            <Icon name='blank' color='black' size={80} paddingTop={10}/>
                            <Text style={styles.cardText}>Text</Text>
                        </Card>
                    </TouchableOpacity>
                </View>

                <View style={styles.cardRow}>
                    <TouchableOpacity style={{paddingLeft:16, paddingRight:16}} onPress={()=>alert("View Report")}>
                        <Card style={styles.card} >
                            <Icon name='blank' color='black' size={80} paddingTop={10}/>
                            <Text style={styles.cardText}>Text</Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity style={{paddingLeft:16, paddingRight:16}} onPress={()=>alert("View Report")}>
                        <Card style={styles.card} theme={mainTheme}>
                            <Icon name='blank' color='black' size={80} paddingTop={10}/>
                            <Text style={styles.cardText}>Text</Text>
                        </Card>
                    </TouchableOpacity>
                </View>
            
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth:1,
      paddingLeft: 5,
      paddingRight: 5,
      backgroundColor: mainTheme.colors.background
    },

    welcomeText: {
        paddingTop: -10
    },

    loginoutBtn: {
        margin: 5,
        color: 'red'
    },

    dashboard: {
        borderWidth: 1,
        borderBottomWidth: 0,
        paddingLeft: 15,
        paddingRight: 15
    },

    cardRow: {
        flexDirection: 'row',
        padding: 16
    },

    card: {
        height: 164,
        width: 164,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardText: {
        fontWeight: 'bold',
        fontSize: 20

    }
});