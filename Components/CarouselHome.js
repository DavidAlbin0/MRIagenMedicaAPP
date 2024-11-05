import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { useFocusEffect } from '@react-navigation/native';

export default function CarouselHome({ images, height, width }) {
  const [refreshKey, setRefreshKey] = useState(Date.now());

  // Utiliza useFocusEffect para actualizar el refreshKey cada vez que la pantalla recibe el foco
  useFocusEffect(
    React.useCallback(() => {
      setRefreshKey(Date.now());
    }, [])
  );

  const renderItem = ({ item }) => {
    return (
      <Image
        style={{ width, height }}
        PlaceholderContent={<ActivityIndicator color="#fff" />}
        source={{ uri: `${item}?${refreshKey}` }}
      />
    );
  };

  return (
    <Carousel
      layout={"default"}
      data={images}
      sliderWidth={width}
      itemWidth={width}
      itemHeight={height}
      renderItem={renderItem}
    />
  );
}
