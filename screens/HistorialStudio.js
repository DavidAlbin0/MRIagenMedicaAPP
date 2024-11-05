import React, { useEffect, useState } from "react";
import { useQuery, gql, useApolloClient } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView
} from "react-native";
import base64 from "base-64";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { MaterialIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';

// Consultas GraphQL
const OBTENER_ARCHIVOS_POR_CURP = gql`
  query ObtenerArchivosPorCurp($curp: String!) {
    obtenerArchivosPorCurp(curp: $curp) {
      nombre
      tipo
      contenido
      nota
      orden
    }
  }
`;

const OBTENER_LAB_POR_CURP = gql`
  query ObtenerLabPorCurp($curp: String!) {
    obtenerLabPorCurp(curp: $curp) {
      nonota
      estudio
      fecha_prin
      inc
      clave_est
      id_pac
    }
  }
`;

const DESCARGAR_ARCHIVO = gql`
  query DescargarArchivo($rutaArchivo: String!) {
    descargarArchivo(rutaArchivo: $rutaArchivo) {
      nombre
      tipo
      contenido
    }
  }
`;

const DESCARGAR_LABORATORIO = gql`
  query DescargarLaboratorio(
    $id_pac: String!,
    $fecha_prin: String!,
    $nonota: String!,
    $clave_est: String!,
    $inc: String!
  ) {
    descargarLaboratorio(
      id_pac: $id_pac,
      fecha_prin: $fecha_prin,
      nonota: $nonota,
      clave_est: $clave_est,
      inc: $inc
    ) {
      nombre
      tipo
      contenido
    }
  }
`;


const HistorialStudio = () => {
  const navigation = useNavigation();
  const client = useApolloClient();
  const [token, setToken] = useState(null);
  const [curp, setCurp] = useState(null);
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [labLoading, setLabLoading] = useState(true);
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    const getTokenAndDecode = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        setToken(storedToken);

        const decodedToken = JSON.parse(
          base64.decode(storedToken.split(".")[1])
        );
        const curpFromToken = decodedToken.curp;
        setCurp(curpFromToken);
      } catch (error) {
        console.error("Error al obtener y decodificar el token:", error);
      }
    };

    getTokenAndDecode();
  }, []);

  const { loading: queryLoading, data } = useQuery(OBTENER_ARCHIVOS_POR_CURP, {
    variables: { curp },
    skip: !curp,
  });

  const { loading: labQueryLoading, data: labData } = useQuery(OBTENER_LAB_POR_CURP, {
    variables: { curp },
    skip: !curp,
  });

  

  useEffect(() => {
    if (!queryLoading && data) {
      setArchivos(data.obtenerArchivosPorCurp);
      setLoading(false);
    }
  }, [queryLoading, data]);


  useEffect(() => {
    if (!labQueryLoading && labData) {
      console.log("Datos de laboratorio:", labData.obtenerLabPorCurp); // Verifica los datos obtenidos
      setLabs(labData.obtenerLabPorCurp);
      setLabLoading(false);
    }
  }, [labQueryLoading, labData]);

  const handleDownload = async (rutaArchivo, nombre) => {
    try {
      // Ejecutar la consulta para obtener el contenido base64 del archivo
      const { data } = await client.query({
        query: DESCARGAR_ARCHIVO,
        variables: { rutaArchivo },
      });

      // Mostrar el contenido base64 en la consola
      console.log("Contenido base64:", data.descargarArchivo.contenido);

      // Convertir el contenido base64 a un archivo PDF y descargarlo
      const fileUri = `${FileSystem.documentDirectory}${nombre}`;
      await FileSystem.writeAsStringAsync(fileUri, data.descargarArchivo.contenido, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Archivo guardado", `Archivo guardado en: ${fileUri}`);
      }
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      Alert.alert(" Ups, algo salio mal", "No se pudo descargar el archivo");
    }
  };

  const handleDownloadLaboratorio = async (lab) => {
    try {
      // Imprimir el objeto lab para depuración
      console.log("Datos del laboratorio:", lab);
      
      if (!lab || !lab.nonota || !lab.fecha_prin || !lab.clave_est || !lab.inc) {
        throw new Error('Datos del laboratorio incompletos.');
      }
  
      const { id_pac, nonota, fecha_prin, clave_est, inc } = lab;
  
      // Ejecutar la consulta para obtener el archivo de laboratorio
      const { data } = await client.query({
        query: DESCARGAR_LABORATORIO,
        variables: {
          id_pac: id_pac,
          fecha_prin: fecha_prin,
          nonota: nonota,
          clave_est: clave_est,
          inc: inc
        },
      });
  
      if (!data.descargarLaboratorio) {
        throw new Error('Archivo no encontrado');
      }
  
      // Mostrar el contenido base64 en la consola
      console.log("Contenido base64:", data.descargarLaboratorio.contenido);
  
      // Convertir el contenido base64 a un archivo PDF y descargarlo
      const fileUri = `${FileSystem.documentDirectory}${data.descargarLaboratorio.nombre}`;
      await FileSystem.writeAsStringAsync(fileUri, data.descargarLaboratorio.contenido, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Archivo guardado", `Archivo guardado en: ${fileUri}`);
      }
    } catch (error) {
      console.error("Error al descargar el archivo de laboratorio:", error);
      Alert.alert("Ups, algo salió mal", "No se pudo descargar el archivo");
    }
  };
  
     
  const obtenerFechaDeRuta = (ruta) => {
    const partes = ruta.split("/");
    if (partes.length >= 3) {
      const fecha = `${partes[0]}/${partes[1]}/${partes[2]}`;
      return fecha;
    } else {
      return "Formato de ruta no válido";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      {!token ? (
        <View style={styles.container2}>
          <Text style={styles.tituloDeneg}>
            Parece que aún no has iniciado sesión. Inicia sesión aquí. ⬇️
          </Text>
          <Button
            title="Iniciar Sesión"
            color="#000066"
            style={styles.button}
            onPress={() => navigation.navigate("Configuracion")}
          />
        </View>
      ) : (
        <>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <View style={styles.headerContainer}>
                <Text style={styles.header}>Interpretaciones</Text>
                <MaterialIcons
                  name="description"
                  size={40}
                  color="#fff"
                  style={styles.icon}
                />
              </View>

              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.tableHeader]}>
                    Estudio
                  </Text>
                  <Text style={[styles.tableCell, styles.tableHeader]}>
                    Nota
                  </Text>
                  <Text style={[styles.tableCell, styles.tableHeader]}>
                    Fecha
                  </Text>
                  <Text style={[styles.tableCell, styles.tableHeader]}>
                    Descarga
                  </Text>
                </View>

                <FlatList
                  data={archivos}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    const fechaExtraida = obtenerFechaDeRuta(item.contenido);
                    return (
                      <View style={styles.tableRow}>
                        <Text
                          style={styles.tableCell}
                        >
                          {item.nombre}
                        </Text>
                        <Text style={styles.tableCell}>{item.orden}</Text>
                        <Text style={styles.tableCell}>
                          {fechaExtraida}
                        </Text>
                        <Button
                          title="Descargar"
                          onPress={() => handleDownload(item.contenido, item.nombre)} 
                          color={"#000066"}
                        />
                      </View>
                    );
                  }}
                />
              </View>

              <View style={styles.headerContainer}>
                <Text style={styles.header}>Laboratorio</Text>
                <MaterialIcons
                  name="science"
                  size={40}
                  color="#fff"
                  style={styles.icon}
                />
              </View>
              {labLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.tableHeader]}>Estudio</Text>
                    <Text style={[styles.tableCell, styles.tableHeader]}>Nota</Text>
                    <Text style={[styles.tableCell, styles.tableHeader]}>Fecha</Text>
                    <Text style={[styles.tableCell, styles.tableHeader]}>Descarga</Text>

                  </View>

                  <FlatList
                    data={labs}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>{item.estudio}</Text>
                        <Text style={styles.tableCell}>{item.nonota}</Text>
                        <Text style={styles.tableCell}>
                          {item.fecha_prin ? new Date(item.fecha_prin).toLocaleDateString() : 'N/A'}
                        </Text>
                        <Button
                          title="Archivo."
                          onPress={() => handleDownloadLaboratorio(item)}
                          color={"#000066"}
                        />
                      </View>
                    )}
                  />
                </View>
              )}
            </>
          )}
        </>
      )}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  container2: {
    backgroundColor: "#000066",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  tituloDeneg: {
    fontSize: 21,
    color: "#ffffff",
    fontWeight: "800",
    marginHorizontal: 30,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
  },
  
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000066",
    padding: 10,
    borderRadius: 5,
    marginTop: 15
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: "#000",
    marginTop: "25px"
  },
  tableRow: {
    flexDirection: "row",
    marginTop: "25px",
    textTransform: "lowercase",

  },
  tableCell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    textTransform: "lowercase",

  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
  itemText: {
    fontSize: 16,
    color: "#0000ff",
  },
});

export default HistorialStudio;
