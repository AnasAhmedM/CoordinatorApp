import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import firebase from "firebase/compat"
import {Card} from 'react-native-paper';
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";


export default function ViewData({navigation, route}) {
    const [init, setInit] = useState(true)
    const [loading, setLoading] = useState(true)
    const [lastUpdate, setLastUpdate] = useState(new Date())
    const [labels, setLabels] = useState(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
    const [dataCrowd, setDataCrowd] = useState([0,0,0,0,0,0,0])
    const [dataUnmasked, setDataUnmasked] = useState([0,0,0,0,0,0,0])
    const [dataViolation, setDataViolation] = useState([0,0,0,0,0,0,0])
    
    const chartConfig = {
        backgroundColor: "white",
        backgroundGradientFrom: "gray",
        backgroundGradientTo: "gray",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "3",
            strokeWidth: "1",
            stroke: "white"
        }
        }

    const chartWidth = Dimensions.get("window").width-20
    const chartHeight = 200

    useEffect(()=>{
        if(init){
            setInit(false)
            firebase.database().ref(`/Snapshot`).once('value', function (snapshot) {
                let getLabels = []
                let getDataCrowd = []
                let getDataUnmasked = []
                let getDataViolation = []

                for(let i=1; i <= 7; i++){
                    getLabels.push(snapshot.val()['numPeople'][i]['name'])
                    getDataCrowd.push(snapshot.val()['numPeople'][i]['Total'])
                    getDataUnmasked.push(snapshot.val()['noMask'][i]['Total'])
                    getDataViolation.push(snapshot.val()['numViolation'][i]['Total'])
                }

                setLabels(getLabels)
                setDataCrowd(getDataCrowd)
                setDataUnmasked(getDataUnmasked)
                setDataViolation(getDataViolation)
                let date = new Date(snapshot.val()['lastUpdate'])
                setLastUpdate(date)
            }).then(()=>setLoading(false));
        }
    })

    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            {loading? 
            <Text style={{paddingTop:40, fontWeight: 'bold'}}>Loading...</Text>
            :
            <Text style={{paddingTop:40, fontWeight: 'bold'}}>{'Last Updated: '+lastUpdate.toUTCString().split('2022')[0]+2022}</Text>
            }
           
            <Card style={styles.card} >
                <Text style={styles.cardText}>Crowd</Text>
                <LineChart
                    data=
                    {{
                    labels: labels,
                    datasets: [{data: dataCrowd}],
                    }}
                    width={chartWidth}
                    height={chartHeight}
                    yAxisLabel=""
                    yAxisSuffix=""
                    chartConfig={chartConfig}
                    style={styles.chart}
                />
            </Card>

            <Card style={styles.card} >
                <Text style={styles.cardText}>No Mask</Text>
                <LineChart
                    data=
                    {{
                    labels: labels,
                    datasets: [{data: dataUnmasked}],
                    }}
                    width={chartWidth}
                    height={chartHeight}
                    yAxisLabel=""
                    yAxisSuffix=""
                    chartConfig={chartConfig}
                    style={styles.chart}
                />
            </Card>

            <Card style={styles.card} >
                <Text style={styles.cardText}>Violations</Text>
                <LineChart
                    data=
                    {{
                    labels: labels,
                    datasets: [{data: dataViolation}],
                    }}
                    width={chartWidth}
                    height={chartHeight}
                    yAxisLabel=""
                    yAxisSuffix=""
                    chartConfig={chartConfig}
                    style={styles.chart}
                />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    chart: {
        marginVertical: 8,
        borderRadius: 16
        },

    card: {
        height: 240,
        width: Dimensions.get("window").width-10,
        padding: 10,
        borderRadius:20,
        marginBottom:20,
        marginTop:5,
        borderWidth:1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    cardText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:-10,
        marginBottom: -5
    }
})