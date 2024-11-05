import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { initializeApp } from "firebase/app";
import { firebase } from "@react-native-firebase/auth";

import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Settings from "./screens/Settings";
import { createStackNavigator } from "@react-navigation/stack";
import Prueba from "./screens/Prueba";
import HistorialStudio from "./screens/HistorialStudio";
import DatosPer from "./screens/DatosPer";
import { Login } from "./screens/Login";
import CrearCuenta from "./screens/CrearCuenta";
import { ApolloClient, useQuery, gql } from "@apollo/client";
import { ApolloProvider, InMemoryCache } from "@apollo/client";
import Notificaciones from "./screens/Notificaciones";
import client from "./config/apollo";
import AnalisisClinicos from "./screens/Products/AnalisisClinicos";
import Cardiologia from "./screens/Products/Cardiologia";
import Colonscopia from "./screens/Products/Colposcopia";
import Densitometria from "./screens/Products/Densitometria";
import GastroEnter from "./screens/Products/GastroEnter";
import Mastogra from "./screens/Products/Mastogra";
import Neurofisiologia from "./screens/Products/Neurofisiologia";
import RayosX from "./screens/Products/RayosX";
import RayosxContrastados from "./screens/Products/RayosxContrastados";
import ResonanciaMagnetica from "./screens/Products/ResonanciaMagnetica";
import TomogrMultic from "./screens/Products/TomogrMultic";
import UltrasonConDop from "./screens/Products/UltrasonConDop";
import { Ionicons } from "@expo/vector-icons"; // Importa el conjunto de iconos que desees utilizar
import AllProducts from "./screens/Products/AllProducts";
import PromoDesc from "./screens/PromoDesc";
import RestablecerContra from "./screens/RestablecerContra";
import * as Notifications from "expo-notifications";

// Configurar el cliente de Firebase Messaging
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const firebaseConfig = {
  apiKey: "AIzaSyCRA8WB4e22TMB3jdkXMPlJUH8tLyiWV90",
  projectId: "imagenmedicamri",
  storageBucket: "imagenmedicamri.appspot.com",
  messagingSenderId: "486875083714",
  appId: "1:486875083714:android:607f5bd592524b2c905c5b",
};

const app = initializeApp(firebaseConfig);

const HomeStackNavigator = createStackNavigator();

function MyStack() {
  return (
    <ApolloProvider client={client}>
      <HomeStackNavigator.Navigator>
        <HomeStackNavigator.Screen
          name="InicioScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: null, // Agrega esta línea para ocultar el título en la barra superior
          }}
        />

        <HomeStackNavigator.Screen
          name="HistorialStudio"
          component={HistorialStudio}
          options={{
            headerBackTitleVisible: false,
            title: 'Historial de Estudios', // Cambia el título aquí

          }}
        />

        <HomeStackNavigator.Screen
          name="AnalisisClinicos"
          component={AnalisisClinicos}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="Cardiologia"
          component={Cardiologia}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="Colposcopia"
          component={Colonscopia}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="Densitometria"
          component={Densitometria}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="GastroEnter"
          component={GastroEnter}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="Mastogra"
          component={Mastogra}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="Neurofisiologia"
          component={Neurofisiologia}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="RayosX"
          component={RayosX}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="RayosxContrastados"
          component={RayosxContrastados}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="RestablecerContra"
          component={RestablecerContra}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="ResonanciaMagnetica"
          component={ResonanciaMagnetica}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="TomogrMultic"
          component={TomogrMultic}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="UltrasonConDop"
          component={UltrasonConDop}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="PromoDesc"
          component={PromoDesc}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="AllProducts"
          component={AllProducts}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="CrearCuenta"
          component={CrearCuenta}
          options={{
            headerShown: false,
          }}
        />

        <HomeStackNavigator.Screen
          name="Datos Personales"
          component={DatosPer}
          options={{
            headerBackTitleVisible: false,
          }}
        />
      </HomeStackNavigator.Navigator>
    </ApolloProvider>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  useEffect(() => {
    (async () => {
      // Solicitar permiso para mostrar notificaciones
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert(
          "Para recibir notificaciones, necesitas permitir los permisos en la configuración de tu dispositivo."
        );
        return;
      }
    })();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Permiso para recibir notificaciones no concedido");
      return;
    }

    // Obtener el token de notificación del dispositivo
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  };

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Inicio"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Inicio") {
                iconName = "home";
              } else if (route.name === "Perfil") {
                iconName = "person-sharp";
              } else if (route.name === "Configuracion") {
                iconName = "settings";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
          })}
          tabBarOptions={{
            inactiveTintColor: "#ffffff",
            activeTintColor: "#000066",
            activeBackgroundColor: "#E7E7E7",
            inactiveBackgroundColor: "#000066",
            style: {
              display: "flex",
            },
          }}
        >
          <Tab.Screen
            name="Inicio"
            component={MyStack}
            listeners={({ navigation }) => ({
              tabPress: (e) => {
                // Evitar el comportamiento predeterminado
                e.preventDefault();
                // Reiniciar la pantalla HomeScreen si ya está en la pestaña "Inicio"
                navigation.navigate("InicioScreen", { screen: "HomeScreen" });
              },
            })}
          />
          <Tab.Screen name="Perfil" component={ProfileScreen} />
          <Tab.Screen name="Configuracion" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
