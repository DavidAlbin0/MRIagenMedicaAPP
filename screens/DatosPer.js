import React, { Fragment } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useQuery, gql, useApolloClient } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import base64 from "base-64"; // Importar la biblioteca base-64
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

const OBTENER_INFO_POR_CURP = gql`
  query ObtenerInfoPorCurp($curp: String!) {
    obtenerInfoPorCurp(curp: $curp) {
      idPaciente
      nombre_pac
      apat_Pac
      amat_Pac
      fecnac_Pac
      edad_Pac
      sexo_Pac
      tel_Pac
      calle_Pac
      ciudad_Pac
      edo_Pac
      correo_Pac
      colonia
      cp
      correo_pac2
      autoriza1
      autoriza2
      curp
      entidad_nacimiento
    }
  }
`;

const DatosPer = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(null);
  const [curp, setCurp] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    loading: queryLoading,
    error,
    data,
  } = useQuery(OBTENER_INFO_POR_CURP, {
    variables: { curp },
    skip: !curp,
  });

  useEffect(() => {
    const getTokenAndDecode = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        console.log("Token almacenado:", storedToken);
        setToken(storedToken);

        // Decodificar el token para obtener el CURP
        const decodedToken = JSON.parse(
          base64.decode(storedToken.split(".")[1])
        );
        const curpFromToken = decodedToken.curp;
        setCurp(curpFromToken);

        console.log("CURP extraído del token:", curpFromToken);
      } catch (error) {
        console.error("Error al obtener y decodificar el token:", error);
      }
    };

    getTokenAndDecode();
  }, [client]);

  useEffect(() => {
    if (!queryLoading) {
      // Verifica si hay un error en la consulta y maneja en consecuencia
      if (error) {
        console.error("Error en la consulta:", error);
        // Puedes manejar el error de alguna manera específica aquí
      } else if (data) {
        // Asigna los datos obtenidos a los estados necesarios
        // Puedes ajustar esto según tus necesidades
        // Por ejemplo, setArchivos(data.obtenerInfoPorCurp.archivos);
        setLoading(false);
      }
    }
  }, [queryLoading, error, data]);
  
  if (loading) return <ActivityIndicator />;
  // Si hay un error en la consulta, puedes renderizar un componente de error
  if (error) return <Text>Errorrrrs: {error.message}</Text>;

  // Puedes seguir usando paciente como lo hacías antes
  const paciente = data ? data.obtenerInfoPorCurp : null;

  // ... (resto del componente)

  return (
<SafeAreaView>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Image
            source={require("../assets/logos/logoph.png")}
            style={styles.imglogos}
          />
          <View style={styles.containermage}>
            <SafeAreaView style={styles.containertutlo}>
              <Text style={styles.titulo}>¡Hola!</Text>
              <View style={styles.row}>
                <Text style={styles.titulo2}>{paciente.nombre_pac}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.titulo3}>{paciente.idPaciente}</Text>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <View style={styles.row}>
              <Text style={styles.label}>CURP:</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label2}>{paciente.curp}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Nombre:</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label2}>{paciente.nombre_pac + " " + paciente.apat_Pac + " " +  paciente.amat_Pac}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Fecha de nacimiento:</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label2}>{paciente.fecnac_Pac}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>EDAD:</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label2}> {paciente.edad_Pac}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Sexo:</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label2}>{paciente.sexo_Pac}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Teléfono:</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label2}>{paciente.tel_Pac}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Calle:</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label2}>{paciente.calle_Pac}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Colonia:</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label2}>{paciente.colonia}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Ciudad:</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label2}>{paciente.ciudad_Pac}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Estado:</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label2}>{paciente.edo_Pac}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>CP:</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label2}> {paciente.cp}</Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
    /*
    <SafeAreaView style={styles.background}>
      <SafeAreaView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.titulo}>Datos de {paciente.nombre_pac} </Text>
          <Text style={styles.subtitulo1}>ID: {paciente.idPaciente}</Text>
        </SafeAreaView>
        <SafeAreaView>          
          <Text style={styles.textonormal}>CURP: {paciente.curp}</Text>
          <Text  style={styles.textonormal}>Nombre: {paciente.nombre_pac + " " + paciente.apat_Pac + paciente.amat_Pac}</Text>
          <Text  style={styles.textonormal}>Fecha de Nacimiento: {paciente.fecnac_Pac}</Text>
          <Text  style={styles.textonormal}>Edad: {paciente.edad_Pac}</Text>
          <Text  style={styles.textonormal}>Sexo Biologico : {paciente.sexo_Pac}</Text>
          <Text  style={styles.textonormal}>Telefono: {paciente.tel_Pac}</Text>
          <Text  style={styles.textonormal}>Calle: {paciente.calle_Pac}</Text>
          <Text  style={styles.textonormal}>Ciudad: {paciente.ciudad_Pac}</Text>
          <Text  style={styles.textonormal}>Estado: {paciente.edo_Pac}</Text>
          <Text  style={styles.textonormal}>Colonia: {paciente.colonia}</Text>
          <Text  style={styles.textonormal}>CP: {paciente.cp}</Text>
          <Text>OLA SOY UN TEXTO QUE CARGA</Text>
          </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
*/
  );
};

/*Aqui empiezan los estilos perrones*/
const styles = StyleSheet.create({
  background: {
    alignContent: "space-around",
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
  },

  containeropt: {
    alignContent: "flex-start",
  },

  imglogo: {
    marginTop: 30,
    width: 170,
    height: 85,
    marginStart: 200,
    marginVertical: 0,
  },
  imglogos: {
    width: 170,
    height: 85,
    marginTop: 30,
  },

  titulo: {
    marginTop: 30,
    color: "#ffffff",
    fontSize: 29,
    fontWeight: "800",
    marginBottom: 10,
  },
  titulo2: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 10,
  },
  titulo3: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 10,
  },

  container: {
    backgroundColor: "#ffffff",
    alignContent: "space-around",
    marginBottom: 30,
    alignContent: "center",
    alignItems: "center",
  },
  
  containermage: {
    backgroundColor: "#ffffff",
    alignContent: "space-around",
    marginBottom: 30,
    alignContent: "center",
    alignItems: "center",
    width: 350,
    borderWidth: 3,
    borderColor: 'black', 
    borderRadius: 5,
    },

  containertutlo: {
    backgroundColor: "#000066",
    alignContent: "space-around",
    marginBottom: 30,
    alignContent: "center",
    alignItems: "center",
    width: 350,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    
  },
  label: {
    fontWeight: "bold",
    marginBottom: -10,
    fontSize: 20,
  },
  label2: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 30,
    width: 250,
  },
  buttonText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default DatosPer;
