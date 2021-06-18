import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
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

const SearchItem = ({ setPage, setCurrentIndex, currentIndex, }) => {
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
  const GetItemsByPrice = () =>{
    
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
        <View style={styles.filterButtons}>
        <TouchableOpacity style={styles.filterText}>
          <Text>Filter By Price</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterText}>
          <Text>Filter By Distance</Text>
        </TouchableOpacity>
        </View>
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
                    <Text>Store Description: {item.description}</Text>
                    <Text>Store Price: {item.price}₺</Text>
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
        <View style={styles.BottomTab}>
          <TouchableOpacity style={styles.BottomTabButton} onPress={() => firebase.auth().signOut()} >
            <Text style={{ color: '#1B9CFC' }}>
              Logout
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomTabButton} onPress={() => setPage("articles")} >
            <Text style={{ color: '#1B9CFC' }}>
              Home
            </Text>
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
  directionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 3,
    backgroundColor: '#ddd',
  },
  filterButtons:{
    backgroundColor:'gray',
    borderRadius:6,
    padding:3,
    marginBottom:6,
    flexDirection:'row',
    justifyContent:'space-around',
    width:'auto',
  },
  filterText:{
    borderWidth:1,
    borderRadius:4,
    color:'black',
    backgroundColor:'white',
    width:'auto',
  },
  BottomTab: {
    width: "100%",
    justifyContent: 'space-around',
    padding: 20,
    height:60,
    alignItems: 'flex-end',
    backgroundColor: 'red',
    flexDirection:'row',
    marginTop:'auto',
  },
  BottomTabButton:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black',
    borderRadius:10,
    borderColor:'black',
    padding:7,
  },
});

export default SearchItem;
