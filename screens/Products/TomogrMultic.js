import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const TomogrMultic = () => {
  return (
    <SafeAreaView style={styles.containerflex}>
      <ScrollView>
        
      <SafeAreaView  style={styles.derechaflex}>
        <View>
        <Image source={require('../../assets/logos/logoph.png')} style={styles.imagen}/>
      <SafeAreaView>
          <Text style={styles.titulo}>Tomografia.</Text>
          <Text style={styles.subtitulo2}>¿Qué es?</Text>
      </SafeAreaView>
             <Text style={styles.textonormal3}>
             La Tomografía Computada, también conocida como TAC, es el método que permite visualizar al 
             paciente seccionalmente, dándonos un marco anatómico espacial, bidimensional y la reconstrucción 
             de imágenes tridimensionalmente más finas y únicas, gracias a la generación helicoidal y modalidad 
             multicorte, estando a la altura de gabinetes y hospitales de la Ciudad de México a tu alcance en 
             Cuernavaca.
             </Text>
             <Text style={styles.textonormal3}>
             Contamos con un cuerpo médico de radiólogos especializados y certificados (neurología, cabeza y 
             cuello, músculo esquelético, mama), así como técnicos radiólogos en constante capacitación, para 
             darte un mejor servicio.         
             </Text>
             
             <Text style={styles.titulo}>Preparaciones</Text>

             <Text style={styles.textonormal3}>
             .- El estudio se hace previa cita.
             </Text>
             <Text style={styles.textonormal3}>
             .- Traer estudios previos.
             </Text>
             <Text style={styles.textonormal3}>
             .- En estudios contrastados se sugiere ayuno de 6 horas.
             </Text>
             <Text style={styles.textonormal3}>
             .- Para Tomografía o TAC de barrido renal, una hora antes del estudio tomar de 4 a 5 
             vasos, para pasar al estudio con vejiga llena.
             </Text>
             <Text style={styles.textonormal}>
             .- En estudios de cráneo, columna cervical, oídos, senos paranasales: no brackets o 
             frenos en la boca, no extensiones en el cabello fijadas con grapas o broches metálicos.
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

export default TomogrMultic