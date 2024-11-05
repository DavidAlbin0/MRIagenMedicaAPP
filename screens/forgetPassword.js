import { View, Text } from 'react-native'
import React from 'react'

const forgetPassword = () => {
  return (
    <View>
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
          <Text style={styles.crear}>¿Olvidaste tu contraseña?</Text>
          <Text style={styles.crear} onPress={() => navigation.navigate('CrearCuenta')}>Crear Cuenta</Text>
          {mensaje && <Text style={styles.error}>{mensaje}</Text>}
        </ScrollView>
      </SafeAreaView>
    </ApolloProvider>    </View>
  )
}

export default forgetPassword