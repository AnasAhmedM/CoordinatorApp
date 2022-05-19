
import {DefaultTheme as paperTheme} from "react-native-paper"
import {DefaultTheme as navigatorTheme} from '@react-navigation/native';



export const mainTheme = {
    ...paperTheme,
    roundness: 2,

    colors: {
        ...paperTheme.colors,
        text: '#000000',
        backdrop: 'rgba(255,255,255,0.26)',
        background:'#ffffff',
        primary: '#D3D3D3',
        accent: 'white',
    },
    font:{

    }
}

export const mainNavigatorTheme = {
    ...navigatorTheme,
    colors: {
        ...navigatorTheme.colors,
        text: "#000000",
        background: '#ffffff',
        card: '#ffffff',
        primary: '#000000',
        accent: '#ffffff',
    },
}