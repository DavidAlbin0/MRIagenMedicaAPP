import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, Button, Image, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { gql, useMutation } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import client from '../config/apollo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForceUpdate } from '../Components/useForceUpdate'; // Ajusta la ruta según tu estructura de carpetas


const AUTENTICAR_USER = gql`
  mutation autenticarUsuario($input: AutenticarInput)  {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const Settings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const forceUpdate = useForceUpdate(); // Llama al hook directamente en el cuerpo del componente
  const [token, setToken] = useState(null); // Estado para almacenar el token
  const [checkedToken, setCheckedToken] = useState(false); // Nuevo estado para controlar si ya comprobaste el token
  const [loading, setLoading] = useState(false); // Estado para controlar la carga


  const navigation = useNavigation();
  const [autenticarUsuario] = useMutation(AUTENTICAR_USER);

  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
      console.log('Token almacenado:', storedToken);
    } catch (error) {
      console.log('Error al obtener el token:', error);
      forceUpdate(); // Forzamos la actualización al obtener el token
    }
  };

  // Efecto que se ejecuta al montar la pantalla y cada vez que entra en foco
  useFocusEffect(() => {
    // Comprobamos el token solo si no lo hemos comprobado antes
    if (!checkedToken) {
      getToken();
    }
  });


  useEffect(() => {
    const verificarToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setMostrarMenu(true);
          //navigation.navigate('Perfil'); //Vuelve a descomentar esta línea
          console.log('Token almacenado:', storedToken);
        } else {
          setMostrarMenu(false);
        }
      } catch (error) {
        console.log('Error al verificar el token:', error);
      }
    };

    verificarToken();
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

  const handleSubmit = async () => {
    setLoading(true); // Activar la rueda de carga al cerrar sesión
    if (email === '' || password === '') {
      setMensaje('Debes completar todos los campos');
      return;
    }

    if (password.length < 6) {
      setMensaje('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const { data } = await autenticarUsuario({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      const token = data.autenticarUsuario.token;

      await AsyncStorage.setItem('token', token);
      setMensaje(null);

      if (token) {
        //setMostrarMenu(true);
        navigation.navigate('Perfil');
        console.log('Token:', token);
      }
    } catch (error) {
      console.log(error);
      forceUpdate(); // Forzamos la actualización al obtener el token
      setMensaje('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };
  // Función para cerrar sesión
  const cerrarSesion = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Eliminar el token del AsyncStorage
      setToken(null); // Limpiar el token del estado
      console.log('Sesión cerrada');
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

  const SolicitudDer = () => {
    url = 'https://www.mrimagenmedica.com.mx/wp-content/uploads/2024/08/Solicitud-derechos-arco.pdf';
    Linking.openURL(url);
  }
  const ordenMedica = () => {
    url = 'https://www.mrimagenmedica.com.mx/wp-content/uploads/2024/08/Orden-Medica-2024.pdf';
    Linking.openURL(url);
  }
  const avisoPriv = () => {
    url = 'https://www.mrimagenmedica.com.mx/wp-content/uploads/2024/08/Aviso-privacidad.pdf';
  }
  const Ayuda = () => {
    const email = 'callcentercva@mrimagenmedica.com.mx';
    const subject = 'Ayuda APP';
    const body = 'Estoy utilizando tu aplicación móvil y necesito reportar un problema.';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(url);
  };

  if (token !== null) {
    return (
      <SafeAreaView style={styles.background1}>
        <ScrollView>
          <SafeAreaView style={styles.container1}>
            <Text style={styles.titulo}> Configuracion</Text>
          </SafeAreaView>

            <Text style={styles.textochico} onPress={SolicitudDer}>Solicitud Arco</Text>
            <Text style={styles.textochico} onPress={ordenMedica}>Orden Médica</Text>
            <Text style={styles.textochico} onPress={avisoPriv}>Aviso de privacidad</Text>
            <Text style={styles.textochico} onPress={Ayuda}>Ayuda</Text>
            <Text style={styles.textochico} onPress={cerrarSesion}>Cerrar Sesion</Text>
        </ScrollView>
      </SafeAreaView>
    );
  } else {

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.background}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require('../assets/logos/logoph.png')}
            style={styles.imglogo}
          />
          <TextInput
            style={styles.input}
            autoCompleteType="email"
            placeholder="Correo@example.com"
            onChangeText={texto => setEmail(texto)}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Contraseña"
            onChangeText={texto => setPassword(texto)}
          />
          <Button
            title="Iniciar Sesión"
            color="#000066"
            style={styles.button}
            onPress={() => handleSubmit()}
          />
          <Text style={styles.crear} onPress={() => navigation.navigate('RestablecerContra')}>¿Olvidaste tu contraseña?</Text>
          <Text style={styles.crear} onPress={() => navigation.navigate('CrearCuenta')}>Crear Cuenta</Text>
          {mensaje && <Text style={styles.error}>{mensaje}</Text>}
        </ScrollView>
      </SafeAreaView>
    </ApolloProvider>
  );
};}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 200,
    margin: 12,
    borderWidth: 1.5,
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  button: {
    height: 30,
    margin: 22,
    backgroundColor: '#FFFFFF',
  },
  imglogo: {
    width: 130,
    height: 65,
    marginVertical: 35,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crear: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    backgroundColor: '#FFFFFF',
  },
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  titulo1: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: '#FFFFFF',
  },

  background1: {
    alignContent: 'space-around',
    backgroundColor: '#ffffff',
    width: "100%",
    height: "100%",
  },

  containeropt: {
    alignContent: 'flex-start',
  },


  container1: {
    backgroundColor: '#000066',
    height: 120,
    alignContent: 'space-around',
    marginBottom: 30,
  },

  titulo: {
    textAlign: 'left',
    fontSize: 21,
    color: '#ffffff',
    fontWeight: '900',
    marginTop: 75,
    marginHorizontal: 30,
    marginStart: 12,
  },

  subtitulo1: {
    textAlign: 'left',
    fontSize: 21,
    color: '#ffffff',
    fontWeight: '500',
    marginStart: 25,
  },

  subtitulo2: {
    textAlign: 'left',
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '700',
    marginTop: 60,
    marginHorizontal: 30,
    marginStart: 25,
  },

  textonormal: {
    textAlign: 'left',
    fontSize: 17,
    color: '#000000',
    marginTop: 12,
    marginHorizontal: 30,
    marginStart: 35, 
  },

  textochico: {
    textAlign: 'left',
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
    marginTop: 35,
    marginHorizontal: 30,
    marginStart: 25,
  },

  backinfo: {
    backgroundColor: '#ffffff',
    height: 650,
  },

});

export default Settings;
