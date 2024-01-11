import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from './types';
import { HomeScreen, QuizScreen } from '../screens';

const AppStack = createNativeStackNavigator<RootStackParamList>();

const AppRoutes = (): JSX.Element => {
    return (
        <AppStack.Navigator initialRouteName={'HomeScreen'} screenOptions={{ headerShown: false, gestureEnabled: true, animation: 'slide_from_right' }}>
            <AppStack.Screen name='HomeScreen' component={HomeScreen}  />
            <AppStack.Screen name='QuizScreen' component={QuizScreen}  />
        </AppStack.Navigator>
    )
}

export default AppRoutes