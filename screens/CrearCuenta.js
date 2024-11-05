import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

const CREAR_USUARIO = gql`
  mutation crearUsuario($input: UsuarioInput) {
    crearUsuario(input: $input) {
      curp
      email
      password
      username
      nombre
      apellidoPaterno
      apellidoMaterno
      fechaNacimiento
      entidadFederativaNacimiento
      sexo
    }
  }
`;

const CREACION_POR_CURP = gql`
  query creacionPorCurp($curp: String!) {
    creacionPorCurp(curp: $curp) {
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

const CrearCuenta = () => {
  const [input, setInput] = useState({
    curp: "",
    email: "",
    password: "",
    username: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: "",
    entidadFederativaNacimiento: "",
    sexo: "",
  });

  const [mensaje, setMensaje] = useState("");
  const navigation = useNavigation();
  const [curp, setCurp] = useState("");
  const [loading, setLoading] = useState(false);
  const [datosObtenidos, setDatosObtenidos] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [emailExists, setEmailExists] = useState(false); // Estado para verificar si el correo ya existe
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [errora, setError] = useState(""); // Estado para manejar el mensaje de error
  const [crearUsuario] = useMutation(CREAR_USUARIO);
  const [creacionPorCurp, { loading: queryLoading, error, data }] =
    useLazyQuery(CREACION_POR_CURP);

  useEffect(() => {
    if (!queryLoading && hasSubmitted) {
      if (error) {
        console.error("Error en la consulta:", error);
        setMensaje(
          "Este CURP no está dado de alta en ninguna sucursal de Imagen Medica o ya existe"
        );
        setLoading(false);
      } else if (data && data.creacionPorCurp) {
        const info = data.creacionPorCurp;
        setDatosObtenidos(info);
        setInput({
          ...input,
          nombre: info.nombre_pac,
          apellidoPaterno: info.apat_Pac,
          apellidoMaterno: info.amat_Pac,
          fechaNacimiento: info.fecnac_Pac,
          entidadFederativaNacimiento: info.entidad_nacimiento,
          sexo: info.sexo_Pac,
          curp: info.curp,
          email: info.correo_pac,
        });
        setMensaje("");
        setLoading(false);
      } else {
        setDatosObtenidos(null);
        setMensaje(
          "Este CURP no está dado de alta en ninguna sucursal de Imagen Medica"
        );
        setLoading(false);
      }
    }
  }, [queryLoading, error, data, hasSubmitted]);

  const handleCrearUsuario = async () => {
    if (input.email && input.password && input.username) {
      // Verifica que los campos no estén vacíos
      try {
        const result = await crearUsuario({ variables: { input } });
        console.log("Usuario creado:", result.data.crearUsuario);
        navigation.navigate("Configuracion");
      } catch (errora) {
        console.error("Error al crear usuario:", errora);
        // Si ocurre un error al crear el usuario, mostramos el mensaje de error debajo del botón "Crear Usuario"
        setError("El correo ya existe");
      }
    } else {
      // Si algún campo está vacío, mostramos el mensaje de error debajo del botón "Crear Usuario"
      setError("Por favor, complete todos los campos");
    }
  };

  console.log("Error:", errora); // Agrega esto para verificar el estado de error

  const verificarCurp = () => {
    setLoading(true);
    setHasSubmitted(true);
    creacionPorCurp({ variables: { curp } });
  };

  const handleCurpChange = (value) => {
    setCurp(value);
    setInput({ ...input, curp: value });
  };

  const handleEmailChange = (value) => {
    setInput({ ...input, email: value });
  };

  const handlePasswordChange = (value) => {
    setInput({ ...input, password: value });
  };

  const handleUsernameChange = (value) => {
    setInput({ ...input, username: value });
  };

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <SafeAreaView>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image
              source={require("../assets/logos/logoph.png")}
              style={styles.imglogo}
            />
          </View>
          {!datosObtenidos && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Ingrese el CURP que proporcionó en su sucursal"
                value={curp}
                onChangeText={handleCurpChange}
              />
              <Button
                title="Verificar CURP"
                onPress={verificarCurp}
                color="#000684"
                style={styles.button}
              />
            </>
          )}
          {loading ? (
            <Text>Cargando...</Text>
          ) : hasSubmitted && mensaje ? (
            <Text style={styles.error}>{mensaje}</Text>
          ) : (
            datosObtenidos && (
              <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <SafeAreaView style={styles.background}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                      <View style={styles.formContainer}>
                        <View style={styles.formField}>
                          <Text style={styles.label}>CURP:</Text>
                          <Text style={styles.value}>{input.curp}</Text>
                        </View>
                        <View style={styles.formField}>
                          <Text style={styles.label}>Nombre:</Text>
                          <Text style={styles.value}>{input.nombre}</Text>
                        </View>
                        <View style={styles.formField}>
                          <Text style={styles.label}>Apellido Paterno:</Text>
                          <Text style={styles.value}>
                            {input.apellidoPaterno}
                          </Text>
                        </View>
                        <View style={styles.formField}>
                          <Text style={styles.label}>Apellido Materno:</Text>
                          <Text style={styles.value}>
                            {input.apellidoMaterno}
                          </Text>
                        </View>
                        <View style={styles.formField}>
                          <Text style={styles.label}>Fecha de Nacimiento:</Text>
                          <Text style={styles.value}>
                            {input.fechaNacimiento}
                          </Text>
                        </View>
                        <View style={styles.formField}>
                          <Text style={styles.label}>
                            Entidad de Nacimiento:
                          </Text>
                          <Text style={styles.value}>
                            {input.entidadFederativaNacimiento}
                          </Text>
                        </View>
                        <View>
                          <TextInput
                            style={styles.input}
                            placeholder="Correo@example.com"
                            value={input.email}
                            onChangeText={handleEmailChange}
                          />
                          {input.email === "" && (
                            <Text style={styles.error}>
                              El correo no puede estar vacío
                            </Text>
                          )}
                        </View>
                        <View>
                          <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            secureTextEntry={true}
                            value={input.password}
                            onChangeText={handlePasswordChange}
                          />
                          {input.password === "" && (
                            <Text style={styles.error}>
                              La contraseña no puede estar vacía
                            </Text>
                          )}
                        </View>
                        <View>
                          <TextInput
                            style={styles.input}
                            placeholder="Nombre de Usuario"
                            value={input.username}
                            onChangeText={handleUsernameChange}
                          />
                          {input.username === "" && (
                            <Text style={styles.error}>
                              El nombre de usuario no puede estar vacío
                            </Text>
                          )}
                        </View>

                        <View>
                          <Button
                            title="Crear Usuario"
                            onPress={handleCrearUsuario}
                            color="#000684"
                            style={styles.button}
                          />
                          {errora && <Text style={styles.error}>{errora}</Text>}
                           
                        </View>
                      </View>
                    </View>
                  </SafeAreaView>
                </ScrollView>
              </SafeAreaView>
            )
          )}
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imglogo: {
    width: 130,
    height: 65,
    marginTop: 60,
    backgroundColor: "#FFFFFF",
    justifyContent: "center", // Centra los elementos horizontalmente
  },
  formContainer: {
    width: "80%",
    marginTop: 20,
  },
  formField: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontWeight: "bold",
  },
  value: {
    flex: 2,
  },

  background: {
    flex: 1, // Cambiado a 'flex: 1' para que el fondo ocupe toda la pantalla
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 700,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px" // ajusta según la altura de tu contenedor
  },
});

export default CrearCuenta;
