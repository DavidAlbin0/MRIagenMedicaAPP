import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const Mastogra = () => {
  return (
    <SafeAreaView style={styles.containerflex}>
      <ScrollView>
        
      <SafeAreaView  style={styles.derechaflex}>
        <View>
        <Image source={require('../../assets/logos/logoph.png')} style={styles.imagen}/>
      <SafeAreaView>
          <Text style={styles.titulo}>Mastografía</Text>
          <Text style={styles.subtitulo2}>¿Qué es?</Text>
      </SafeAreaView>
             <Text style={styles.textonormal3}>
             En Imagen Médica contamos con un sistema digital que nos permite obtener imágenes 
             nítidas con mayor resolución que la mastografía convencional, dándonos así una mejor 
             apreciación de las microcalcificaciones, alteraciones de la piel y la arquitectura de 
             la mama, ya que podemos visualizar de mejor manera la piel, el tejido celular subcutáneo 
             y el tejido mamario.
             </Text>
             <Text style={styles.textonormal3}>
             En la actualidad, la mastografía o mamografía, es el principal método de diagnóstico para 
             el cáncer de mama de manera temprana.           
             </Text>
             <Text style={styles.subtitulo2}>
              Algunos beneficios.
             </Text>
             <Text style={styles.textonormal3}>
             .-  Menor radiación.     
             </Text>
             <Text style={styles.textonormal3}>
             .-  Mayor calidad de imagen.    
             </Text>
             <Text style={styles.textonormal3}>
             .-  Menor dolor (gracias al aditamento de compresión de plástico).    
             </Text>

             <Text style={styles.titulo}>Preparaciones</Text>

             <Text style={styles.subtitulo2}>
              General
             </Text>
             <Text style={styles.textonormal3}>
             .- Traer estudios previos.    
             </Text>
             <Text style={styles.textonormal3}>
             .- Se realiza previa cita.  
             </Text>
             <Text style={styles.textonormal3}>
             .- El paciente debe de presentarse con axilas y mamas completamente 
             limpias y rasuradas, sin desodorante, perfume, crema o talco.
             </Text>
             <Text style={styles.textonormal3}>
             .-  Pacientes con prótesis mamarias requieren en la mayoría de los casos proyecciones adicionales.
             </Text>
             <Text style={styles.textonormal}>
             * Para estudios especiales favor de llamar a la sucursal en la que se realizará el estudio.
             </Text>



        </View>
      </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  background: {
    alignContent: 'space-around',
  },

  containeropt: {
    alignContent: 'flex-start',
  },

  imglogo: {
    width: 170,
    height: 85,
    marginStart: 218,
    marginVertical: 0,
  },
  container: {
    backgroundColor: '#63addc',
    height: 215,
    alignContent: 'space-around',
  },

  titulo: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 21,
    color: '#000000',
    fontWeight: '800',
    marginTop: 15,
    marginHorizontal: 30,
    marginStart: 12,
  },

  subtitulo1: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 25,
    color: '#000000',
    fontWeight: '900',
    marginTop: -25,
    marginStart: 25,
  },

  subtitulo2: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 18,
    color: '#000000',
    fontWeight: '700',
    marginTop: 20,
    marginHorizontal: 30,
    marginStart: 25,
  },

  textonormal: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    marginTop: 35,
    marginHorizontal: 30,
    marginEnd: 75,
    marginBottom: 65,
  },

  textonormal2: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    marginTop: 35,
    marginHorizontal: 30,
    marginEnd: 75,
    marginBottom: 5,
  },

  textonormal3: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    marginTop: 35,
    marginHorizontal: 30,
    marginEnd: 75,
    marginBottom: 10,
  },


  textochico: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 12,
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
  
  containerflex: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    //backgroundColor: 'yellow',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },

  derechaflex: {
    justifyContent: 'flex-start',
    flex: 1,
    //backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 15,
    marginStart:40
  },

  izquierdaflex: {
    justifyContent: 'space-around',
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center'
  },

  imagen: {
    height: 60,
    width: 120,
    marginTop: 45,
  },


});

export default Mastogra