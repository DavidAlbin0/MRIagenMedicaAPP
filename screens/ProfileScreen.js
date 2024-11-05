import React, { Fragment, useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Button,
  Linking
} from "react-native";
import { useForceUpdate } from "../Components/useForceUpdate"; // Ajusta la ruta según tu estructura de carpetas
import { useQuery, gql } from "@apollo/client"; // Importa useQuery y gql
import { decode as atob } from "base-64"; // Importar la función de decodificación base64
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const sendWelcomeNotification = async (nombreUsuario) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Bienvenido ${nombreUsuario}`,
      body: 'Nos alegra tenerte de vuelta!',
    },
    trigger: null, // Inmediatamente
  });
};

const GET_USERNAME = gql`
  query obtenerUsernamePorCurp($curp: String!) {
    obtenerUsernamePorCurp(curp: $curp)
  }
`;

const ProfileScreen = () => {
  const navigation = useNavigation();
  const forceUpdate = useForceUpdate(); // Llama al hook directamente en el cuerpo del componente
  const [token, setToken] = useState(null); // Estado para almacenar el token
  const [checkedToken, setCheckedToken] = useState(false); // Nuevo estado para controlar si ya comprobaste el token
  const [nombreUsuario, setNombreUsuario] = useState("");

  // Función para obtener el token
  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);
      console.log("Token almacenado:", storedToken);
      setCheckedToken(true); // Marcar como comprobado
    } catch (error) {
      console.log("Error al obtener el token:", error);
      forceUpdate(); // Forzamos la actualización al obtener el token
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getToken(); // Recargar el token o cualquier otro dato necesario cuando la pantalla entre en foco.
      return () => {
        setCheckedToken(false); // Opcional: para que siempre verifique de nuevo el token
      };
    }, [])
  );
  

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission for notifications is required.');
        return;
      }
    };
  
    requestPermissions();
  }, []);
  

  useEffect(() => {
    const obtenerNombreUsuario = async () => {
      try {
        // Obtener el token almacenado
        const storedToken = await AsyncStorage.getItem("token");
  
        // Decodificar el token para obtener el nombre de usuario
        const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
        const nombreUsuario = decodedToken.username;
  
        // Actualizar el estado con el nombre de usuario
        setNombreUsuario(nombreUsuario);
  
        // Enviar notificación de bienvenida
        await sendWelcomeNotification(nombreUsuario);
      } catch (error) {
        console.error("Error al obtener el nombre de usuario:", error);
      }
    };
  
    if (token) {
      obtenerNombreUsuario();
    }
  }, [token]);
  
  useFocusEffect(() => {
    // Comprobamos el token solo si no lo hemos comprobado antes
    if (!checkedToken) {
      getToken();
    }
  });
  
  // Función para cerrar sesión
  const cerrarSesion = async () => {
    try {
      await AsyncStorage.removeItem("token"); // Eliminar el token del AsyncStorage
      setToken(null); // Limpiar el token del estado
      console.log("Sesión cerrada");
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  const Politicas = () => {
    const url = "https://www.mrimagenmedica.com.mx/politica-de-calidad/"; // URL de la página de políticas
    Linking.openURL(url);
  };

  const AcercaDe = () => {
    const url = "https://www.mrimagenmedica.com.mx/sobre-nosotros/"; // URL de la página de acerca de
    Linking.openURL(url);
  };

  const handleWhatsApp = () => {
    const phoneNumber = "+52 1 777 362 0260"; // Reemplaza esto con el número de WhatsApp al que deseas enviar el mensaje
    const message =
      "¡Hola! Estoy utilizando tu Aplicacion Movil y quiero cotizar un servicio"; // Mensaje automático
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp abierto:", data);
      })
      .catch((error) => {
        console.log("Error al abrir WhatsApp:", error);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {token ? ( // Si hay un token válido
          <Fragment>
            {/*Recuadro Azul*/}
            <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                <View style={styles.textContainer}>
                  <Text style={styles.subtitulo3}>¡Hola!</Text>
                  <Text style={styles.subtitulo2}>{nombreUsuario}</Text>
                  <Text style={styles.subtitulo1}>Bienvenido</Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../assets/logos/logoph.png")}
                    style={styles.imglogo}
                  />
                </View>
              </View>
            </SafeAreaView>

            {/* Pestanas de busqueda de pacientes*/}

            <SafeAreaView style={styles.backinfo}>
              <SafeAreaView>
                <TouchableOpacity>
                  <Text
                    style={styles.textonormal}
                    onPress={() => navigation.navigate("HistorialStudio")}
                  >
                    Historial de estudios
                  </Text>
                </TouchableOpacity>
              </SafeAreaView>
              <TouchableOpacity>
                <Text
                  style={styles.textonormal}
                  onPress={() => navigation.navigate("PromoDesc")}
                >
                  Promociones y descuentos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={styles.textonormal}
                  onPress={() => navigation.navigate("Datos Personales")}
                >
                  Datos de la Cuenta
                </Text>
              </TouchableOpacity>
              {/* Espacios en blanco */}

              <Text style={styles.textonormal}>{""}</Text>

              <Text style={styles.textonormal}>{""}</Text>

              {/*Ayuda and stuff*/}

              {/* <Text style={styles.textochico}>Acerca de</Text>*/}
              {/* <Text style={styles.textochico}>Politicas</Text>*/}

              <TouchableOpacity>
                <Text style={styles.textochicofon} onPress={handleWhatsApp}>
                  ¿Necesitas Cotizar?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.textochicofon} 
                onPress={() => Linking.openURL('https://www.mrimagenmedica.com.mx/sobre-nosotros/')} >
                  Sobre Nosotros
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.textochicofon} 
                onPress={() => Linking.openURL('https://www.mrimagenmedica.com.mx/sobre-nosotros/')} >
                  Politicas
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          </Fragment>
        ) : (
          // Si no hay un token válido
          <View style={styles.container33}>
            <Image
              source={require("../assets/iconos/icons8-exclamation-64.png")}
              style={styles.imglogo2}
            />
            <Text style={styles.textochico2}>
              Parece que aún no has iniciado sesión.
            </Text>
            <Text
              style={styles.subtitulo11}
              onPress={() => navigation.navigate("Configuracion")}
            >
              {" "}
              "Iniciar Sesión aqui"
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

/*Aqui empiezan los estilos perrones*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1, // Toma todo el espacio disponible
  },
  textContainer: {
    flex: 1, // Toma todo el espacio disponible
  },

  imglogo: {
    width: 170,
    height: 85,
    marginRight: "55",
  },
  background: {
    alignContent: "space-around",
  },
  imageContainer: {
    justifyContent: "center", // Centra verticalmente la imagen
    marginEnd: 20,
  },
  containeropt: {
    alignContent: "flex-start",
  },

  imglogo2: {
    width: 80,
    height: 80,
    marginTop: 140,
  },

  button: {
    height: 30,
    margin: 22,
    backgroundColor: "#FFFFFF",
  },

  container: {
    backgroundColor: "#000066",
    height: 215,
    alignContent: "space-around",
  },

  container2: {
    backgroundColor: "#000066",
    height: 250,
    alignContent: "space-around",
  },

  container33: {
    flex: 1,
    justifyContent: "center", // Centra verticalmente el contenido
    alignItems: "center", // Centra horizontalmente el contenido
  },

  titulo: {
    textAlign: "left",
    fontSize: 21,
    color: "#ffffff",
    fontWeight: "800",
    marginTop: 15,
    marginHorizontal: 30,
    marginStart: 12,
  },

  tituloDeneg: {
    fontSize: 21,
    color: "#ffffff",
    fontWeight: "800",
    marginTop: 90,
    marginHorizontal: 30,
    marginStart: 52,
    marginBottom: 30,
  },

  subtitulo1: {
    textAlign: "left",
    fontSize: 25,
    color: "#ffffff",
    fontWeight: "900",
    marginTop: 0,
    marginStart: 25,
  },

  subtitulo11: {
    textAlign: "center",
    textTransform: "lowercase",
    fontSize: 21,
    color: "#ffffff",
    marginTop: 35,
    backgroundColor: "#000684",
    height: 35,
    marginHorizontal: 30,
    borderRadius: 10, // Agrega esquinas redondeadas
    paddingHorizontal: 15, // Añade espacio interno horizontal
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Agrega sombra para efecto de volumen en Android
  },

  subtitulo2: {
    textAlign: "left",
    fontSize: 22,
    color: "#ffffff",
    fontWeight: "700",
    marginTop: 30,
    marginHorizontal: 30,
    marginStart: 25,
  },
  subtitulo3: {
    textAlign: "left",
    fontSize: 22,
    color: "#ffffff",
    fontWeight: "700",
    marginTop: 20,
    marginHorizontal: 30,
    marginStart: 25,
  },

  textonormal: {
    textAlign: "left",
    fontSize: 18,
    color: "#000000",
    fontWeight: "500",
    marginTop: 35,
    marginHorizontal: 30,
    marginStart: 35,
  },

  textochico: {
    textAlign: "left",
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
    marginTop: 35,
    marginHorizontal: 30,
    marginStart: 25,
  },

  textochico2: {
    textAlign: "center",
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
    marginTop: 40,
    marginBottom: 30,
  },

  backinfo: {
    backgroundColor: "#ffffff",
    height: 650,
  },

  textochicofon: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
    marginTop: 35,
    marginHorizontal: 30,
    marginStart: 25,
  },

  imagen: {
    width: 75,
    height: 75,
    marginStart: 300,
  },
});

export default ProfileScreen;
