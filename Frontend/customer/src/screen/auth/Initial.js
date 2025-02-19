import { initData } from '../../const/AsyncStorage';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper'; 
import { colors } from '../../const/Colors';
export function Initial({navigation}) {
    const intro = async () => {
        const slide = await initData("slide");
        const signup = await initData("signup");
        const mobile = await initData("mobile");
        const name = await initData("name");
        console.log('Intro Slide :', slide);
        console.log('Signup :', signup);
        console.log('Mobile :', mobile);
        console.log('Name :', name);
        if(slide != undefined && slide != null) {
            navigation.replace('Home');
        }
        if(slide == undefined || slide == null || slide == "dummy") {
            navigation.replace('Slide1');
        }
    }
    intro()
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} color={colors.red} size={50} />
    </View>
}