import { View, Text, StyleSheet, Image, useWindowDimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const PromoDesc = () => {
  const { width } = useWindowDimensions();
  const [refreshKey, setRefreshKey] = useState(Date.now());

  // Utiliza useFocusEffect para actualizar el refreshKey cada vez que la pantalla recibe el foco
  useFocusEffect(
    React.useCallback(() => {
      setRefreshKey(Date.now());
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Descuentos para ti</Text>
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: `https://i.imgur.com/qTAL2nQ.png?${refreshKey}` }}
          style={[styles.bannerImage, { width, height: width * 0.5 }]}
        />
      </View>
      <ScrollView>
        <View style={styles.promoContainer}>
          <View style={styles.promoBox}>
            <Image
              source={{ uri: `https://i.imgur.com/1REXXBB.jpg?${refreshKey}` }}
              style={styles.promoImage}
            />
            <Text style={styles.promoText}>Promo 1</Text>
          </View>
          <View style={styles.promoBox}>
            <Image
              source={{ uri: `https://i.imgur.com/gqVK9eE.jpg?${refreshKey}` }}
              style={styles.promoImage}
            />
            <Text style={styles.promoText}>Promo 2</Text>
          </View>
          <View style={styles.promoBox}>
            <Image
              source={{ uri: `https://i.imgur.com/8oTBcUw.jpg?${refreshKey}` }}
              style={styles.promoImage}
            />
            <Text style={styles.promoText}>Promo 3</Text>
          </View>
          <View style={styles.promoBox}>
            <Image
              source={{ uri: `https://i.imgur.com/J9qUC5W.jpg?${refreshKey}` }}
              style={styles.promoImage}
            />
            <Text style={styles.promoText}>Promo 4</Text>
          </View>
          <View style={styles.promoBox}>
            <Image
              source={{ uri: `https://i.imgur.com/pvUvtVF.jpg?${refreshKey}` }}
              style={styles.promoImage}
            />
            <Text style={styles.promoText}>Promo 5</Text>
          </View>
          <View style={styles.promoBox}>
            <Image
              source={{ uri: `https://i.imgur.com/b4BPimj.jpg?${refreshKey}` }}
              style={styles.promoImage}
            />
            <Text style={styles.promoText}>Promo 6</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 16,
  },
  bannerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  bannerImage: {
    resizeMode: 'cover',
  },
  promoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  promoBox: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  promoImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  promoText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PromoDesc;
