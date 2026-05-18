import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import NotesListScreen from './src/screens/NotesListScreen';
import CreateNoteScreen from './src/screens/CreateNoteScreen';

const Tab = createBottomTabNavigator();

const Loading = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F172A' }}>
    <ActivityIndicator size="large" color="#3B82F6" />
  </View>
);

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName = 'list';
                if (route.name === 'Notes List') {
                  iconName = focused ? 'document-text' : 'document-text-outline';
                } else if (route.name === 'Create Note') {
                  iconName = focused ? 'add-circle' : 'add-circle-outline';
                }
                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#3B82F6',
              tabBarInactiveTintColor: '#64748B',
              tabBarStyle: {
                backgroundColor: '#1E293B',
                borderTopColor: '#334155',
                borderTopWidth: 1,
                paddingBottom: 8,
                paddingTop: 8,
                minHeight: 60,
              },
              tabBarLabelStyle: {
                fontSize: 16,
                fontWeight: '600',
              },
              headerStyle: {
                backgroundColor: '#0F172A',
                borderBottomWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: '#F8FAFC',
                fontSize: 24,
              },
            })}
          >
            <Tab.Screen name="Notes List" component={NotesListScreen} />
            <Tab.Screen name="Create Note" component={CreateNoteScreen} options={{ title: 'New Note' }} />
          </Tab.Navigator>
        </NavigationContainer>
        <Toast />
      </PersistGate>
    </Provider>
    </SafeAreaProvider>
  );
};

export default App;
