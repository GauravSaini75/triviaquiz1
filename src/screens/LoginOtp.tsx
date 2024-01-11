import React from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../route/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '../theme/Style';
import { Button, OtpInput } from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginOtp'>
const LoginOtp = ({navigation, route}: Props): JSX.Element => {
    const [otpValue, setOtpValue] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleOtpChange = (otp: string) => {
        setOtpValue(otp);
        console.log(otp)
    };

    const onVerifyCode = async () => {
        if(!otpValue || otpValue.length > 6) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: '6 digit OTP is required.',
                autoHide: true,
                visibilityTime: 5000,
            })
            return
        }
        setLoading(true);
        setTimeout(() => {
            if(otpValue != '123456') {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'invalid OTP.',
                    autoHide: true,
                    visibilityTime: 5000,
                });
                setLoading(false)
            } else {
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Login successfully.',
                    autoHide: true,
                    visibilityTime: 2500,
                })
                navigation.reset({
                    index:0,
                    routes:[{ name: 'RootAppStack' }]
                })
                setLoading(false)
            }
        }, 2500);
    }

    return <>
        <StatusBar backgroundColor={colors.white} barStyle={'dark-content'}/>
        <KeyboardAwareScrollView contentContainerStyle={styles.authBackground}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()} style={{
                marginLeft: 10,
                marginTop: 10,
                borderWidth: 0.6,
                borderColor: colors.grey2,
                borderRadius: 8,
                padding: 12,
                alignSelf: 'flex-start'
            }}>
                <Icon name='chevron-back' color={colors.black} size={24} />
            </TouchableOpacity>
            <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                <Text style={styles.textLarge} >OTP Verification</Text>
                <Text style={styles.textThinSmall}>Enter the verification code we just sent on your Mobile Number.</Text>
                <OtpInput length={6} onChange={handleOtpChange} />
                <Button label='Verify' onPress={()=>onVerifyCode()} loading={loading} />
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.linkText} >Don't received code? <Text style={{ color: colors.link }}>Resend</Text></Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    </>
}

export { LoginOtp }