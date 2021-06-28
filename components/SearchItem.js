import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image, LogBox } from 'react-native';
import * as firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';
import { Transition, Transitioning } from 'react-native-reanimated';
import * as geolib from 'geolib';

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
)

const SearchItem = ({ setPage, setCurrentIndex, currentIndex, LastItem }) => {
  const [filteredData, setfilteredData] = useState([]);
  const [secondData, setsecondData] = useState([]);
  const [search, setsearch] = useState('');
  const [items, setitems] = useState([]);
  const ref = React.useRef();
  useEffect(() => {
    getItems();
    LogBox.ignoreLogs(['MapViewDirections ...', 'VirtualizedLists']);
    return () => {
    }
  }, [])


  const searchFilter = (text) => {
    if (text) {
      const newData = items.filter((item) => {
        const itemData = item.item_name ? item.item_name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilteredData(newData);
      setsecondData(newData);
      setsearch(text);
    } else {
      setfilteredData(items);
      setsearch(text);
    }
  }
  const filterDistance = (distanceText) => {
    const filtered = [];
    for (let i = 0; i < secondData.length; i++) {
      const item = secondData[i];
      const { latitude, longitude } = item;
      const distance = geolib.getDistance(LastItem, { latitude, longitude });
      if (distance < distanceText) {
        filtered.push(item);
      }
    }
    if(distanceText){
      setfilteredData(filtered);
    }
    else{
      setfilteredData(items);
      setsearch(distanceText);
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
    firebase.database().ref('/items')
      .orderByChild('price')
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
  const DistanceCal = (itemLatitude, itemLongitude) => {
    return (
      geolib.getDistance(LastItem, {
        latitude: itemLatitude, longitude: itemLongitude
      })
    );
  };
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
          placeholder="Search What You Want"
          underlineColorAndroid="transparent"
          onChangeText={(text) => searchFilter(text)}
        />
        <View style={styles.filterButtons}>
          <Text style={{fontSize:25}}>+</Text>
          <TextInput
            style={styles.textDistanceInputStyle}
            placeholder="Filter by Distance"
            underlineColorAndroid="transparent"
            onChangeText={(distanceText) => filterDistance(distanceText)}
          />
        </View>
        <ScrollView style={{ flex: 1 }}>
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
                  <Text style={styles.heading}>{item.item_name}</Text>
                  {item.key === currentIndex && (
                    <View style={styles.subCategoriesList}>
                      <Text>Store Name: {item.mgz_name}</Text>
                      <Text>Store Description: {item.item_desc}</Text>
                      <Text>Store Price: {item.price}₺</Text>
                      <Text>Store Stock: {item.stock}</Text>                
                      <Text>Store Distance: {DistanceCal(item.latitude, item.longitude)}m</Text>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setPage("givedirection")
                          }}
                          style={styles.directionButton}>
                          <Text>Go</Text>
                        </TouchableOpacity>
                      </View>
                    </View>)}
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={ItemSeperatorView}
          />
        </ScrollView>
        <View style={styles.BottomTab}>
          <TouchableOpacity style={styles.BottomTabButton} onPress={() => setPage("articles")} >
            <Image style={styles.buttonImage} source={require('../images/home.png')} />
          </TouchableOpacity>
        </View>
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
  textDistanceInputStyle: {
    height: 30,
    fontSize: 14,
    paddingBottom: 3,
    paddingTop: 1,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 4,
    left: 5,
    width: "45%"
  },
  directionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 3,
    backgroundColor: '#ddd',
  },
  filterButtons: {
    backgroundColor: 'gray',
    borderRadius: 6,
    padding: 3,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 'auto',
    alignItems: 'baseline',
  },
  filterText: {
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
    backgroundColor: 'white',
    width: 'auto',
  },
  BottomTab: {
    width: "100%",
    justifyContent: 'space-around',
    padding: 20,
    height: 60,
    alignItems: 'flex-end',
    backgroundColor: 'gray',
    flexDirection: 'row',
    marginTop: 'auto',
  },
  BottomTabButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderLeftWidth: 5,
    height: 40,
    padding: 3,
  },
  buttonImage: {
    width: 35,
    height: 36,
  }
});

export default SearchItem;
