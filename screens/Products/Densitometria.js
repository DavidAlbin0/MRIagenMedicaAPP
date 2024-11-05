import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const Densitometria = () => {
  return (
    <SafeAreaView style={styles.containerflex}>
      <ScrollView>
        
      <SafeAreaView  style={styles.derechaflex}>
        <View>
        <Image source={require('../../assets/logos/logoph.png')} style={styles.imagen}/>
      <SafeAreaView>
          <Text style={styles.titulo}>Densitometria</Text>
          <Text style={styles.subtitulo2}>¿Qué es?</Text>
      </SafeAreaView>
             <Text style={styles.textonormal3}>
             Como su nombre lo indica, la densitometría ósea es un estudio que se 
             realiza para medir la densidad mineral de los huesos y determinar si ha 
             habido pérdida de la misma. Esta prueba no causa ningún dolor, pues se 
             realiza a partir de una técnica especializada de rayos X.
             </Text>
             <Text style={styles.textonormal3}>
             Este diagnóstico nos ayuda a llevar un control de la salud de los huesos 
             y detectar alguna enfermedad como la osteoporosis y osteopenia en fases 
             tempranas para implementar tratamientos adecuados y oportunos.             
             </Text>

             <Text style={styles.titulo}>Preparaciones</Text>

             <Text style={styles.textonormal3}>
              General
             </Text>
             <Text style={styles.textonormal3}>
             .- Por lo general en las tomas de sangre el paciente debe de presentarse con 
             un ayuno que no exceda las 12 hrs.     
             </Text>
             <Text style={styles.textonormal3}>
             .-  No requiere de cita ni de ninguna preparación.      
             </Text>
             <Text style={styles.textonormal3}>
             .-  Para química clínica no ingerir carnes ni camarones, ayuno de 12 horas. 
             Estudios de rutina de laboratorio se entregan el mismo día.
             </Text>
             <Text style={styles.textonormal}>
             .-  Cualquier duda o comentario lo debes revisar con el laboratorio.
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

export default Densitometria