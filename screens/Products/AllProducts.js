import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";

const AllProducts = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Conoce Nuestros Servicios</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.containerFlex}>
        <View style={styles.leftContainer}>
          <TouchableOpacity style={styles.itemContainer}>
            <Image
              source={require("../../assets/iconos/Microscopio.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Análisis Clínicos</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('https://www.mrimagenmedica.com.mx/analisis-clinicos/')}
            >
              <Text style={styles.buttonText}>Más información</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer}>
            <Image
              source={require("../../assets/iconos/Cardiología.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Cardiología</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('https://www.mrimagenmedica.com.mx/cardiologia/')}
            >
              <Text style={styles.buttonText}>Más información</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer}>
            <Image
              source={require("../../assets/iconos/Colposcopía.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Colposcopía</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('https://www.mrimagenmedica.com.mx/colposcopia/')}
            >
              <Text style={styles.buttonText}>Más información</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer}>
            <Image
              source={require("../../assets/iconos/Densitometría.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Densitometría</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('https://www.mrimagenmedica.com.mx/densitometria-osea/')}
            >
              <Text style={styles.buttonText}>Más información</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer}>
            <Image
              source={require("../../assets/iconos/Colonoscopia.png")} 
              style={styles.image}
            />
            <Text style={styles.text}>Gastroenterología</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('https://www.mrimagenmedica.com.mx/gastroenterologia/')}
            >
              <Text style={styles.buttonText}>Más información</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer}>
            <Image
              source={require("../../assets/iconos/Mastografía.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Mastografía</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('https://www.mrimagenmedica.com.mx/mastografia/')}
            >
              <Text style={styles.buttonText}>Más información</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.itemContainer}>
            <Image
              source={require("../../assets/iconos/Neurofisiología.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Neurofisiología</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('https://www.mrimagenmedica.com.mx/neurofisiologia/')}
            >
              <Text style={styles.buttonText}>Más información</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer}>
            <Image
              source={require("../../assets/iconos/rayos-x.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Rayos X</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('https://www.mrimagenmedica.com.mx/rayos-x/')}
            >
              <Text style={styles.buttonText}>Más información</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer}>
            <Image
              source={require("../../assets/iconos/Resonancia.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Resonancia</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('https://www.mrimagenmedica.com.mx/resonancia-magnetica/')}
            >
              <Text style={styles.buttonText}>Más información</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer}>
            <Image
              source={require("../../assets/iconos/Tomografía.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Tomografía</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('https://www.mrimagenmedica.com.mx/tomografia/')}
            >
              <Text style={styles.buttonText}>Más información</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer}>
            <Image
              source={require("../../assets/iconos/Ultrasonido.png")}
              style={styles.image}
            />
            <Text style={styles.text}>Ultrasonido</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('https://www.mrimagenmedica.com.mx/ultrasonido/')}
            >
              <Text style={styles.buttonText}>Más información</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000684",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    textAlign: "center",
    fontSize: 21,
    color: "#ffffff",
    fontWeight: "bold",
  },
  containerFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  leftContainer: {
    flex: 1,
    marginRight: 5,
  },
  rightContainer: {
    flex: 1,
    marginLeft: 5,
  },
  itemContainer: {
    borderWidth: 3,
    borderColor: "#000000",
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    height: 120,
    width: 120,
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    marginBottom: 5,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#000684",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default AllProducts;
