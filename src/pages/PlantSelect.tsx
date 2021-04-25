import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';

import { Load } from '../components/Load';
import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/storage';

import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [environment, setEnvironment] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);

    if (environment == 'all') return setFilteredPlants(plants);

    const filtered = plants.filter(
      plant => plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  async function fetchPlants() {
    const { data } = await api
      .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

    if (!data) return setLoading(true);
    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function handlePlantSelect(plant: PlantProps) { navigation.navigate('PlantSave', { plant }) }

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api
        .get('plants_environments?_sort=title&_order=asc');
      setEnvironment([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ]);
    }
    fetchEnvironment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
          data={environment}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingTop: 40,
    paddingHorizontal: 32
  },

  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 40
  },

  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },

  environmentList: {
    marginTop: 25,
    marginBottom: 40,
    paddingHorizontal: 32
  },

  plants: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: 'center'
  }
});