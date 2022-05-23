import {StyleSheet, ScrollView, View, Text} from 'react-native';
import { List, Divider, Searchbar} from 'react-native-paper';
import {mainTheme} from '../config/Theme'
import {useEffect, useState} from 'react';
import { Screens } from '../config/Screens';
import firebase from "firebase/compat"

export default function Reports({navigation, route}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [uid] = useState(route.params?.uid)
    const [data, setData] = useState([])

    useEffect(()=>{
        if(data.length === 0)
        firebase.database().ref(`/Coordinators/${uid}/reports`).once('value', function (snapshot) {
            if(!snapshot.val())
                return
            let values = Object.keys(snapshot.val()).map(function(e) {
                let current = snapshot.val()[e]
                current['id'] = e
                return current
            })
            values.sort((a,b)=>{
                if(a['read'] && !b['read'])
                    return 1
                else if(!a['read'] && b['read'])
                    return -1
                else
                    return 0
            })
            setData(values)
          });
    })

    const handleDelete=(id)=>{
        firebase.database().ref(`/Coordinators/${uid}/reports/${id}`).remove()
        setData([])
    }

    return(
        <View style={{flex:1, justifyContent:'center'}}>
        <View style={{height:'100%', borderWidth:1, paddingTop:50}}>
          <Searchbar
            style={{backgroundColor: mainTheme.colors.background}}
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <ScrollView>
            {data.length===0? 
                <Text style={{alignSelf:'center', paddingTop: 300}}>No Reports Found</Text>:
                <Text style={{alignSelf:'center'}}>Long Hold To Delete</Text>}
            {data.map((e, ind) =>{
              if(e.title.includes(searchQuery.toLowerCase()))
              return(
                  <View key={ind}>
                    <List.Item
                        title={e.title}
                        description={e.description}
                        theme={mainTheme}
                        onPress={()=> navigation.navigate(Screens.ViewReport, 
                            {
                                id : e.id,
                                title: e.title,
                                description: e.description,
                                priority: e.priority,
                                uid: uid
                            })}
                        onLongPress={()=>handleDelete(e.id)}
                    />
                    <Divider/>
                  </View>
                )
              })
              }
          </ScrollView>
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
})