import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import * as firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';
import { Transition, Transitioning } from 'react-native-reanimated';

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
)

const SearchItem = ({ setPage, setCurrentIndex, currentIndex }) => {
  const [filteredData, setfilteredData] = useState([]);
  const [search, setsearch] = useState('');
  const [items, setitems] = useState([]);
  const ref = React.useRef();
  useEffect(() => {
    getItems();
    return () => {
    }
  }, [])

  const searchFilter = (text) => {
    if (text) {
      const newData = items.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilteredData(newData);
      setsearch(text);
    } else {
      setfilteredData(items);
      setsearch(text);
    }
  }

  const ItemSeperatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: 'black', marginBottom: 3 }}
      />
    )
  }

  const getItems = () => {
    firebase.database().ref('/coordinates')
      .orderByChild('description')
      .once('value', snapshot => {
        var storeItems = [];
        snapshot.forEach(function (snap) {
          var info = snap.val();
          info.key = snap.key;
          storeItems.push(info);
        });
        setitems(storeItems);
        setfilteredData(storeItems);
      });
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Transitioning.View
        style={styles.container}
        transition={transition}
        ref={ref}
      >
        <TextInput
          style={styles.textInputStyle}
          value={search}
          placeholder="Aramak istediğini yaz"
          underlineColorAndroid="transparent"
          onChangeText={(text) => searchFilter(text)}
        />
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => {
                ref.current.animateNextTransition();
                setCurrentIndex(item.key === currentIndex ? null : item.key);
              }}>
              <View style={styles.card}>
                <Text style={styles.heading}>{item.title}</Text>
                {item.key === currentIndex && (
                  <View style={styles.subCategoriesList}>
                    <Text>Store Owner: {item.owner_name}</Text>
                    <Text>Store Owner Email: {item.owner_email}</Text>
                    <Text>Store Latitude: {item.latitude}</Text>
                    <Text>Store Longitude: {item.longitude}</Text>
                    <Text>Store Description: {item.description}</Text>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          setPage("givedirection")
                        }}
                        style={styles.directionButton}>
                        <Text>Git</Text>
                      </TouchableOpacity>
                    </View>
                  </View>)}
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={ItemSeperatorView}
        />
      </Transitioning.View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  card: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c8c8c8',
  },
  cardContainer: {
    flexGrow: 1,
    paddingRight: 3,
    paddingLeft: 3,
  },
  heading: {
    fontSize: 20,
  },
  subCategoriesList: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 3,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 4,
    left: 1,
  },
  directionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 3,
    backgroundColor: '#ddd',
  }
});

export default SearchItem;
