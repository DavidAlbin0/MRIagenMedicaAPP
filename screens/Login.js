import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, Button, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { gql, useMutation } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import client from '../config/apollo';

const AUTENTICAR_USER = gql`
  mutation autenticarUsuario($input: AutenticarInput)  {
    autenticarUsuario(input: $input){
      token
    }
  }
`;

const Settings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState(null); // Cambiado 'null' a null

  const navigation = useNavigation();

  const [autenticarUsuario] = useMutation(AUTENTICAR_USER);
 
  const handleSubmit = async () => {  
    if(email === '' || password === '') {
      setMensaje('Debes de completar todos los campos');
      return;
    }

    if(password.length < 6){
      setMensaje('El password debe de tener al menos 6 caracteres');
      return;
    }

    try {
      const { data } = await autenticarUsuario({
        variables:{
            input:{
              email,
              password
            }
        }
      });

      const token = data.autenticarUsuario.token;

      // Cambiado setMensaje(data.autenticarUsuario) a setMensaje(null)
      setMensaje(null);

      // Si la autenticación es exitosa, navegamos a 'ProfileScreen'
      navigation.navigate('Perfil');

      console.log('Token:', token);
      
    } catch (error) {
      console.log(error);
      // En caso de error, mostramos un mensaje de error
      setMensaje('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

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
            color="#0086BD"
            style={styles.button}
            onPress={() => handleSubmit()}
          />
          <Text style={styles.crear}>¿Olvidaste tu contraseña?</Text>
          <Text style={styles.crear} onPress={() => navigation.navigate('CrearCuenta')}>Crear Cuenta</Text>
          {mensaje && <Text style={styles.error}>{mensaje}</Text>}
        </ScrollView>
      </SafeAreaView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
    marginStart: 135,
    marginVertical: 0,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1, // Agregado para permitir que ScrollView se expanda verticalmente
    backgroundColor: '#FFFFFF',
    alignItems: 'center', // Centra los elementos verticalmente
    justifyContent: 'center', // Centra los elementos horizontalmente
  },
  crear: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    backgroundColor: '#FFFFFF',
  },
  background: {
    flex: 1, // Cambiado a 'flex: 1' para que el fondo ocupe toda la pantalla
    backgroundColor: '#FFFFFF',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Settings;
