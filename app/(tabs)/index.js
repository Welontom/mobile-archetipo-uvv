import { createClient } from '@supabase/supabase-js';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import GroupsScreen from './GroupsScreen';
import GroupDetailScreen from './GroupDetailScreen';


const SUPABASE_URL = 'https://atxicupkoqjxractwhxc.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0eGljdXBrb3FqeHJhY3R3aHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwOTcwMTMsImV4cCI6MjA0MjY3MzAxM30.3rnh-cqkbCqerdaDy97pBns3XbqLwPAcXQKhRM86yoc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true} >
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Groups" component={GroupsScreen} />
        <Stack.Screen name="GroupDetail" component={GroupDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}