import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, FlatList, ScrollView, Image, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../route/types';
import { styles } from '../theme/Style';
import { colors } from '../theme/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>
const HomeScreen = ({navigation, route}: Props): JSX.Element => {
	const [loading, setLoading] = React.useState<boolean>(false);

	React.useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 2500);
	}, [])
	

    return <>
	    <StatusBar backgroundColor={colors.white} barStyle={'dark-content'}/>
		<View style={styles.container}>
			<View style={{ width: '100%', elevation: 4, backgroundColor: colors.white, padding: 18 }}>
				<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
					<Text style={{ letterSpacing: 0.5, fontSize: 16, fontWeight: '500'}}>Hi, Rahul!</Text>
					<Icon name='person-outline' size={18} color={colors.black} style={{marginLeft: 6, marginBottom:2}}/>
				</View>
				<Text style={{ letterSpacing: 0.7, fontSize: 18, color: colors.black, fontWeight: '600'}}>Welcome to quiz</Text>
			</View>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				{loading ?
					<ActivityIndicator size={'large'} color={colors.primary} />
					:
					<Button label='Start Quiz' onPress={() => navigation.navigate('QuizScreen')} />
				}
			</View>
		</View>
    </>
}

export { HomeScreen };