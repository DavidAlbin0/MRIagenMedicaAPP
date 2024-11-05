import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const ResonanciaMagnetica = () => {
  return (
    <SafeAreaView style={styles.containerflex}>
      <ScrollView>
        
      <SafeAreaView  style={styles.derechaflex}>
        <View>
        <Image source={require('../../assets/logos/logoph.png')} style={styles.imagen}/>
      <SafeAreaView>
          <Text style={styles.titulo}>Resonancia Magnetica</Text>
          <Text style={styles.subtitulo2}>¿Qué es?</Text>
      </SafeAreaView>
             <Text style={styles.textonormal3}>
             La Resonancia Magnética es un estudio que permite reproducir fielmente estructuras anatómicas; 
             no utiliza radiación, es inocuo y no es invasivo. A diferencia de otros estudios, la resonancia 
             nos permite adentrarnos a regiones anatómicas complejas e inaccesibles con mayor precisión, 
             obteniendo un mejor diagnóstico médico.
             </Text>
             <Text style={styles.textonormal3}>
             En Imagen Médica contamos con un Resonador Magnético de 1.5 Tesla el cual nos permite obtener 
             imágenes con mayor nitidez y calidad, así como reducir los tiempos de duración del estudio; 
             cuenta con secuencias especiales como Perfusión, Difusión y Espectroscopía que permiten obtener 
             un panorama anatómico de las principales estructuras del cuerpo humano.         
             </Text>
             
             <Text style={styles.titulo}>Preparaciones</Text>

             <Text style={styles.subtitulo2}>
              ** General
             </Text>
             
             <Text style={styles.textonormal3}>
             .- El paciente debe de pasar a la sala sin objetos de metal.
             </Text>
             <Text style={styles.textonormal3}>
             .- En el caso de estudios contrastados, se requiere un ayuno de 6 horas aproximadamente.
             </Text>
             <Text style={styles.textonormal3}>
             .-  Se realiza con previa cita.  
             </Text>
             <Text style={styles.textonormal3}>
             .- Si el paciente cuenta con estudios previos es importante traerlos el día de su cita.   
             </Text>

             <Text style={styles.subtitulo2}>
              ** RM Ginecologica.
             </Text>
             <Text style={styles.textonormal3}>
             .- Dos horas antes del estudio tomar de 4 a 5 vasos de agua y una Buscapina.   
             </Text>
            
             <Text style={styles.subtitulo2}>
              ** RM de abdomen, Colangionresonancia.
             </Text>
             
             <Text style={styles.textonormal3}>
             .- Se requieren 4 horas de ayuno.  
             </Text>

             <Text style={styles.subtitulo2}>
              ** Estudios de cráneo, columna cervical, oídos y senos paranasales
             </Text>
             
             <Text style={styles.textonormal3}>
             .- No brackets o frenos en la boca, no extensiones en el cabello fijadas con grapas o broches metálicos.   
             </Text>

             <Text style={styles.subtitulo2}>
              ** Contraindicaciones.
             </Text>
             <Text style={styles.textonormal3}>
             .- No recomendado para pacientes con marcapasos, sten metálico o brackets. 
             </Text>
             <Text style={styles.textonormal3}>
             .- En caso de prótesis y placas metálicas, indicar desde cuándo se tienen y de qué material está hecho.
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

export default ResonanciaMagnetica