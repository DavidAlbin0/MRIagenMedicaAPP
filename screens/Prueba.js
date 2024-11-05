import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native'; // Importa la función de navegación

const ACTUALIZAR_CONTRASENA = gql`
  mutation actualizarContrasena($curp: String!, $email: String!, $nuevaContrasena: String!) {
    actualizarContrasena(curp: $curp, email: $email, nuevaContrasena: $nuevaContrasena)
  }
`;

const Prueba = () => {
  const [curp, setCurp] = useState('');
  const [email, setEmail] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [actualizarContrasena] = useMutation(ACTUALIZAR_CONTRASENA);
  const navigation = useNavigation(); // Obtén la función de navegación

  const handleSubmit = async () => {
    try {
      const { data } = await actualizarContrasena({
        variables: { curp, email, nuevaContrasena },
      });

      Alert.alert('Éxito', data.actualizarContrasena);
      // Navegar a la pestaña de login después de una actualización exitosa
      navigation.navigate('Configuracion');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error al actualizar la contraseña del usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer Contraseña</Text>
      <View style={styles.formGroup}>
        <Text>CURP</Text>
        <TextInput
          style={styles.input}
          value={curp}
          onChangeText={setCurp}
          placeholder="Ingresa tu CURP"
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Ingresa tu email"
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Nueva Contraseña</Text>
        <TextInput
          style={styles.input}
          value={nuevaContrasena}
          onChangeText={setNuevaContrasena}
          placeholder="Ingresa tu nueva contraseña"
          secureTextEntry
        />
      </View>
      <Button 
        title="Actualizar Contraseña"
        onPress={handleSubmit} 
        color="#000684"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default Prueba;
