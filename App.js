import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { colors } from './theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import JourneyScreen from './screens/JourneyScreen';
import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#F7F8F6',
    card: '#F7F8F6',
    border: 'transparent',
    primary: '#202321',
    text: '#202321',
  },
};

const ICONS = {
  Hoy: 'sun',
  Recorrido: 'activity',
  Feed: 'compass',
  Perfil: 'user',
};

function GlassTabBar({ state, navigation }) {
  return (
    <View style={styles.outer}>
      <BlurView
        intensity={70}
        tint="light"
        style={styles.glass}
      >
        <View style={styles.glassHighlight} />

        {state.routes.map((route, index) => {
          const focused = state.index === index;

          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tab}
            >
              <Feather
                name={ICONS[route.name]}
                size={focused ? 21 : 20}
                color={
                  focused
                    ? '#202321'
                    : '#9A9F9B'
                }
              />

              <Text
                style={[
                  styles.label,
                  {
                    color: focused
                      ? '#202321'
                      : '#9A9F9B',
                    fontWeight: focused
                      ? '600'
                      : '400',
                  },
                ]}
              >
                {route.name}
              </Text>

              {focused && (
                <View style={styles.indicator} />
              )}
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <View style={styles.loading}><Text style={styles.loadingText}>ASCENT</Text></View>;
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />

      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          initialRouteName="Feed"
          tabBar={(props) => (
            <GlassTabBar {...props} />
          )}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Feed"
            component={FeedScreen}
          />

          <Tab.Screen
            name="Hoy"
            component={HomeScreen}
          />

          <Tab.Screen
            name="Recorrido"
            component={JourneyScreen}
          />

          <Tab.Screen
            name="Perfil"
            component={ProfileScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: '#F7F8F6', alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: '#171918', fontSize: 13, fontWeight: '700', letterSpacing: 2 },

  outer: {
    position: 'absolute',

    left: 22,
    right: 22,
    bottom: 16,

    height: 70,

    borderRadius: 25,

    overflow: 'hidden',

    backgroundColor: 'rgba(255,255,255,0.62)',

    borderWidth: 1,
    borderColor: 'rgba(236, 236, 236, 0.85)',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 7,
    },

    elevation: 5,
  },

  glass: {
    flex: 1,

    flexDirection: 'row',

    backgroundColor: 'rgba(255,255,255,0.38)',
  },

  glassHighlight: {
    position: 'absolute',

    top: 0,
    left: 22,
    right: 22,

    height: 1,

    backgroundColor: 'rgba(255,255,255,0.95)',
  },

  tab: {
    flex: 1,

    height: 70,

    alignItems: 'center',
    justifyContent: 'center',

    position: 'relative',
  },

  label: {
    marginTop: 4,

    fontSize: 10,

    letterSpacing: 0.1,
  },

  indicator: {
    position: 'absolute',

    bottom: 7,

    width: 4,
    height: 4,

    borderRadius: 2,

    backgroundColor: colors.amber,
  },
});