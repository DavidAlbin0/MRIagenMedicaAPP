import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const UltrasonConDop = () => {
  return (
    <SafeAreaView style={styles.containerflex}>
      <ScrollView>
        
      <SafeAreaView  style={styles.derechaflex}>
        <View>
        <Image source={require('../../assets/logos/logoph.png')} style={styles.imagen}/>
      <SafeAreaView>
          <Text style={styles.titulo}>Ultrasonido.</Text>
          <Text style={styles.subtitulo2}>¿Qué es?</Text>
      </SafeAreaView>
             <Text style={styles.textonormal3}>
             El ultrasonido es un estudio que utiliza ondas sonoras para producir imágenes 
             de las estructuras internas del cuerpo; existen diferentes tipos de ultrasonidos, 
             los más comunes son:
             </Text>
             <Text style={styles.textonormal3}>
             El Ultrasonido 2D es el más utilizado para diagnóstico general, permite el estudio 
             de prácticamente todos los órganos del cuerpo, mostrando incluso los que están  en 
             movimiento, excepto en hay interposición de aire o hueso (cráneo, pulmones e intestinos).       
             </Text>
             <Text style={styles.textonormal3}>El Ultrasonido 3D produce imágenes en tercera dimensión 
             en forma estática, es utilizado especialmente en el estudio del producto en desarrollo 
             dentro de la madre.     
             </Text>
             <Text style={styles.textonormal3}>
             El Ultrasonido Doppler son imágenes obtenidas en tiempo real, apreciando el bebe en 
             movimiento; además, puede valorar el flujo sanguíneo en los vasos arteriales y venosos, 
             la obstrucción de un vaso sanguíneo y conocer la vascularidad de un órgano o lesión; 
             en caso de una tumoración, permite sospechar su naturaleza maligna o benigna.  
             </Text>
             
             <Text style={styles.titulo}>Preparaciones</Text>
             <Text style={styles.subtitulo2}>General.</Text>

             <Text style={styles.textonormal3}>
             .- Traer estudios previos.
             </Text>
             <Text style={styles.textonormal3}>
             .- Todos los ultrasonidos se realizan previa cita.
             </Text>

             <Text style={styles.subtitulo2}>Ultrasonido De abodomen completo.</Text>

             <Text style={styles.textonormal3}>
             .- Ayuno de 8 Horas.
             </Text>
             <Text style={styles.textonormal3}>
             .- Por la mañana tomar de 4 a 5 vasos de agua una hora antes del estudio.
             </Text>
             <Text style={styles.textonormal3}>
             .- No orinar.
             </Text>
             <Text style={styles.textonormal3}>
             .- Se realiza con previa cita.
             </Text>

             <Text style={styles.subtitulo2}>Ultrasonido higado y vias biliares.</Text>

             <Text style={styles.textonormal3}>
             .- Ayuno de 8 horas.
             </Text>
             <Text style={styles.textonormal3}>
             .- Se realiza con previa cita.
             </Text>
             
             <Text style={styles.subtitulo2}>Ultrasonido pelvico</Text>

             <Text style={styles.textonormal3}>
             .- Tomar de 4 a 5 vasos de agua una hora antes del estudio, no orinar.
             </Text>
             <Text style={styles.textonormal3}>
             .- Se realiza con previa cita.
             </Text>

             <Text style={styles.subtitulo2}>Ultrasonido renal</Text>

             <Text style={styles.textonormal3}>
             .- Ayuno de 4 horas.
             </Text>
             <Text style={styles.textonormal3}>
             .- Se realiza con previa cita.
             </Text>
             
             
             <Text style={styles.subtitulo2}>Ultrasonido transrectal</Text>

             <Text style={styles.textonormal3}>
             .- A las 21 horas de la noche anterior al estudio aplicarse un fleet enema 
             (medicamento) vía rectal, así como otro una hora antes del estudio.
             </Text>
             <Text style={styles.textonormal3}>
             .- Se recomienda llevar una dieta y una higiene rectal previos.
             </Text>
             <Text style={styles.textonormal3}>
             .- Se realiza con previa cita.
             </Text>
             <Text style={styles.textonormal3}>
             .- Requiere una preparación especial, favor de llamarnos.
             </Text>
             
                         
             <Text style={styles.subtitulo2}>Ultrasonido endovaginal</Text>

             <Text style={styles.textonormal3}>
             .- Se realiza después de la semana 9 de embarazo.
             </Text>
             <Text style={styles.textonormal3}>
             .- No requiere preparación.
             </Text>
             <Text style={styles.textonormal3}>
             .- Se realiza con previa cita.
             </Text>

            <Text style={styles.subtitulo2}>Ultrasonido obstetrico</Text>

             <Text style={styles.textonormal3}>
             .- Se realiza después de la semana 9 de embarazo.
             </Text>
             <Text style={styles.textonormal3}>
             .- No requiere preparación.
             </Text>
             <Text style={styles.textonormal3}>
             .- Se realiza con previa cita.
             </Text>

             <Text style={styles.subtitulo2}>Ultrasonido Doppler</Text>

             <Text style={styles.textonormal3}>
             .- Solamente el Doppler abdominal requiere de ayuno, la 
             mayoría de los estudios de doppler no requieren de preparación.
             </Text>
             <Text style={styles.textonormal}>
             .- Se realiza con previa cita.
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

export default UltrasonConDop