import React, {Fragment} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const Notificaciones = () => {
  return (
    <SafeAreaView>
      <ScrollView>
      {/*Recuadro Azul*/}
      <SafeAreaView style={styles.container}>
        <Text>Esta pestaña está en construccion</Text>
      </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

/*Aqui empiezan los estilos perrones*/
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
    alignSelf: 'center',
    marginTop: 70,
  },
  container: {
    backgroundColor: '#63addc',
    height: 215,
    alignContent: 'space-around',
  },
  
  backg: {
    backgroundColor: '#ffffff',
    height: 600,
  },
  
  titulo: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 21,
    color: '#000000',
    fontWeight: '800',
    marginTop: 25,
    marginHorizontal: 30,
    marginStart: 18,
    marginStart: 35,
  },

  textonormal: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 13,
    color: '#000000',
    fontWeight: '500',
    marginTop: 30,
    marginHorizontal: 30,
    marginStart: 35,
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
});

export default Notificaciones;
