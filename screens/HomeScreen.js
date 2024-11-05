import React, { useState, useEffect, useRef } from "react"; // Asegúrate de importar useState y useEffect
import * as Location from "expo-location";
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from "react-native";
import Carousel from "react-native-snap-carousel";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
import IMAGES from "../assets/indexm";
import { useNavigation } from "@react-navigation/native";
//import MapViewDirections from "react-native-maps-directions";
//import { GOOGLE_MAPS_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import Geolocation from '@react-native-community/geolocation';

const data = [
  { id: 1, title: "CheckUps", image: "https://i.imgur.com/jrViBRq.jpeg" },
  { id: 2, title: "Reembolsos", image: "https://i.imgur.com/Zktxl1j.jpeg" },
  { id: 3, title: "Resonancias", image: "https://i.imgur.com/NqSHDQx.png" },
  { id: 4, title: "Tomografías", image: "https://i.imgur.com/2XLVK0I.jpeg" }, 
];

const HomeScreen = () => {
  const carouselRef = useRef(null);
  const [isCarouselSnapping, setCarouselSnapping] = useState(false);
  const navigation = useNavigation();
  const [sucursal, guardarSucursal] = useState("");
  const [origin, setOrigin] = useState({});
  const scrollViewRef = useRef(null);
  const [token, setToken] = useState(null);

  const [destination, setDestination] = useState({
    latitude: 18.92611986330235,
    longitude: -99.22881946670378,
  });
  const [region] = useState({
    latitude: 18.82915220343986,
    longitude: -99.12603465859554,
    latitudeDelta: 0.95,
    longitudeDelta: 0.55,
  });
  const [markers, setMarkers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(Date.now()); // Agrega el estado para el refreshKey

  // Utiliza useFocusEffect para actualizar el refreshKey cada vez que la pantalla reciba el foco
  useEffect(() => {
    getLocationPermission();
    setRefreshKey(Date.now()); // Actualiza el refreshKey cuando la pantalla recibe el foco
  }, []);
  
  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permiso denegado para acceder a la ubicación");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const currentLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setOrigin(currentLocation);
    
    setMarkers([
      {
        latlng: currentLocation,
        title: "Ubicación Actual",
        description: "¡Aquí estás!",
      },
      {
        latlng: { latitude: 18.925978915069365, longitude: -99.22879388097707 },
        title: "Cuernavaca",
        description: "Matriz",
         
      },
      {
        latlng: { latitude: 18.617170, longitude: -99.192552 },
        title: "Jojutla",
        description: "Sucursal",
      },
      {
        latlng: { latitude: 18.898535, longitude:  -99.171207 },
        title: "Jiutepec",
        description: "Sucursal",
        
      },
      {
        latlng: { latitude: 18.816393, longitude: -98.948435 },
        title: "Cuautla",
        description: "Sucursal",

         
      },
    ]);
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


  const onRegionChange = (newRegion) => {};

  const _renderItem = ({ item, index }) => {
    return (
      <SafeAreaView>
        <Image
          source={{ uri: `${item.image}?${refreshKey}` }} // Utiliza el refreshKey aquí
          style={{
            height: Dimensions.get("window").width,
            width: Dimensions.get("window").width,
          }}
        />
      </SafeAreaView>
    );
  };

  //Se obtiene el token aqui
  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        console.log("Token almacenado:", storedToken);
        setToken(storedToken);
      } catch (error) {
        console.error("Error al obtener el token:", error);
      }
    };
    getToken();

    // Establecer un intervalo para verificar el token cada cierto tiempo
    const interval = setInterval(getToken, 5000); // Verificar cada 5 segundos

    // Limpia el intervalo cuando el componente se desmonta para evitar fugas de memoria
    return () => clearInterval(interval);
  }, []);

  //Navegacion de las imagenes principales

  //navega al mapa de la sucursales
  const handleScrollToSucursales = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: 2100, // Cambia esto según la altura de los componentes que quieres saltar
        animated: true,
        duration: 100000, // Duración de la animación en milisegundos
      });
    }
  };

  //navega a los servicios
  const handleScrollToServicios = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: 700, // Cambia esto según la altura de los componentes que quieres saltar
        animated: true,
        duration: 100000, // Duración de la animación en milisegundos
      });
    }
  };

  //navega a la pantalla de analisis clinicos
  const handlePress = () => {
    if (token) {
      // Si hay un token, navega a la pantalla de HistoriaslEstudios
      navigation.navigate("HistorialStudio");
    } else {
      // Si no hay un token, navega a la pantalla de Settings
      navigation.navigate("Configuracion");
    }
  };

  //Esto hace que el carrousel vaya del 4 al 1

  const handleSnapToItem = (index) => {
    if (carouselRef.current && index === data.length - 1 && !isCarouselSnapping) {
      setCarouselSnapping(true);
      setTimeout(() => {
        carouselRef.current.snapToItem(0);
        setCarouselSnapping(false);
      }, 5000);
    }
  };
  

  return (
    <SafeAreaView style={styles.colordelfondo}>
      <SafeAreaView >
        <ScrollView ref={scrollViewRef}>
          {/* Recuadro Azul */}
          <SafeAreaView style={styles.container}>
            <Image
              source={require("../assets/logos/logoph.png")}
              style={styles.mid}
            />
          </SafeAreaView>
          <SafeAreaView style={styles.backg}>
            <Carousel
              ref={carouselRef}
              data={data}
              renderItem={_renderItem}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={Dimensions.get("window").width}
              autoplay={true} //Que se mueva solo
              autoplayInterval={4000} //que se mueva cada 5 segundos
              lockScrollWhileSnapping={true} // Establecer lockScrollWhileSnapping en true
              onSnapToItem={handleSnapToItem} //Reinicia el carousel
            />
          </SafeAreaView>
          <SafeAreaView>
          <TouchableOpacity>
                <Text style={styles.calidadCalid2} onPress={handleWhatsApp}>
                  ¿Necesitas Cotizar?
                </Text>
              </TouchableOpacity>
            <SafeAreaView style={styles.titulo}>
              <Text style={styles.subtitulo1}>¡Bienvenido!</Text>
            </SafeAreaView>
            <SafeAreaView style={styles.flexIcon}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={handleScrollToSucursales}
              >
                <Image
                  source={require("../assets/iconos/Ubicaciones.png")}
                  style={styles.imageNav}
                />
                <Text>Sucursales</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => navigation.navigate("AllProducts")}              >
                <Image
                  source={require("../assets/iconos/Estetoscopio.png")}
                  style={styles.imageNav}
                />
                <Text>Servicios</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={handlePress}
              >
                <Image
                  source={require("../assets/iconos/Agenda.png")}
                  style={styles.imageNav}
                />
                <Text>Resultados</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </SafeAreaView>
          
          <SafeAreaView style={styles.contaComp}>
            <SafeAreaView style={styles.titulo}>
              <Text style={styles.subtitulo11}>
                ¿No conoces tu sucursal más cercana?
              </Text>
              <Text style={styles.subtitulo2}>Encuéntrala aquí</Text>
            </SafeAreaView>
            <MapView
  style={styles.map}
  region={region}
  onRegionChange={onRegionChange}
>
  {markers.map((marker, index) => (
    <Marker
      key={index}
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
      image={
        marker.latlng === origin
          ? require("../assets/iconos/ubigood.png") // Imagen para ubicación actual
          : require("../assets/iconos/othergood.png") // Imagen para otros marcadores
          
      }
    />
  ))}
</MapView>


            <Text style={styles.calidadCalid}>
              Calidad y calidez, para tu salud{" "}
            </Text>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: 65,
    marginTop: 30,
    marginBottom: 25,
  },

  colordelfondo: {
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
  },
  titulo: {
    textAlign: "left",
    textTransform: "uppercase",
    fontSize: 21,
    color: "#000000",
    marginTop: 35,
    backgroundColor: "#000684",
    height: 45,
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

  titulo2: {
    textAlign: "left",
    textTransform: "uppercase",
    fontSize: 21,
    color: "#000000",
    fontWeight: "800",
    marginTop: 15,
    marginHorizontal: 30,
    marginStart: 12,
    backgroundColor: "#D75CFF",
    height: 215,
  },
  backg: {
    backgroundColor: "#ffffff",
  },
  mid: {
    height: 60,
    width: 120,
    marginStart: 15,
    marginTop: 5,
    marginBottom: 10,
    flexDirection: "row",
  },
map: {
  width: "90%", // Ajusta el ancho según tus preferencias
  height: 600, // Ajusta la altura según tus preferencias
  alignSelf: "center", // Para centrar el mapa
  marginTop: 25, // Ajusta el margen superior según tus preferencias
  marginBottom: 10, // Ajusta el margen inferior según tus preferencias
  marginHorizontal: "5%", // Ajusta el margen horizontal según tus preferencias
},

  currentLocationMarker: {
    width: 10, // Ajusta el tamaño según lo necesites
    height: 10, // Ajusta el tamaño según lo necesites
  },
  otherMarkers: {
    width: 10, // Ajusta el tamaño según lo necesites
    height: 10, // Ajusta el tamaño según lo necesites
  },

  subtitulo1: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 19,
    color: "#ffffff",
    fontWeight: "900",
    marginTop: 10,
  },

  subtitulo11: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "900",
    marginTop: 6,
  },

  subtitulo2: {
    textAlign: "center",
    fontSize: 13,
    marginTop: 5,
  },

  subtitulo3: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 15,
    color: "#000000",
    fontWeight: "700",
    marginTop: 40,
    marginBottom: -65,
  },
  picker: {
    flex: 1,
    alignContent: "center",
  },

  containerflex: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    //backgroundColor: 'yellow',
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 60,

  },

  contenedorMarco: {
    margin: 10,
    borderWidth: 3,
    borderColor: '#000000',
    padding: 10,
    justifyContent: 'center', // Centrar horizontalmente el contenido
  },
  

  derechaflex: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",

  },

  izquierdaflex: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: 'center', // Centrar horizontalmente el contenido

  },

  flexIcon: {
    flexDirection: "row",
    justifyContent: "space-around", // Esto distribuirá los elementos equitativamente
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginTop: 45, // Puedes ajustar el margen superior según tus preferencias
  },

  imageContainer: {
    flex: 1, // Esto permite que cada imagen ocupe la misma cantidad de espacio
    alignItems: "center",
  },

  imageNav: {
    height: 80,
    width: 80,
    justifyContent: "space-around",
  },

  imagen: {
    height: 120,
    width: 120,
    marginTop: 20,
  },

  imagenCC: {
    height: 15,
    width: 15,
    marginTop: 20,
  },
  

  calidadCalid: {
    textAlign: "center",
    fontSize: 15,
    color: "#0056BD",
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 15,
  },
calidadCalid2: {
    textAlign: "center",
    fontSize: 22,
    color: "#0056BD",
    fontWeight: "600",
    marginTop: 17,
    textShadowColor: "#000",         // Color de la sombra
    textShadowRadius: 25,            // Radio de la sombra (difuminado)
  },
  boton: {
    borderRadius: 5, // Agrega esquinas redondeadas
    paddingVertical: 8, // Ajusta el tamaño vertical del botón
  },
});

export default HomeScreen;
