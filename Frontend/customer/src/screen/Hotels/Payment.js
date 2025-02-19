import { Image, StatusBar, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RNUpiPayment from 'react-native-upi-payment';
import { colors } from "../../const/Colors";
import { Banner } from "../../const/Images";
import { RFPercentage } from "react-native-responsive-fontsize";

export function Payment() {
    function successCallback(data) {
        console.log("Success", data);
      }
      
      function failureCallback(data) {
        console.log("Fail", data);
      }
    return(<SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar barStyle={'dark-content'} />
        <Button mode="contained" buttonColor={colors.red} style={{}} onPress={()=>{
RNUpiPayment.initializePayment({
    vpa: 'eslak231-1@oksbi',
    payeeName: 'Nages Waran.R',
    amount: '10',
    transactionRef: 'nagesh'
  }, successCallback, failureCallback);
        }}>
          <Text style={{color: colors.white, fontFamily: "Poppins-Regular", fontSize: RFPercentage(2)}}>Pay</Text>
        </Button>
    </SafeAreaView>);
}