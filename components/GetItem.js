import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import data from './Data';
import { Transition, Transitioning } from 'react-native-reanimated';
import * as firebase from 'firebase';
import { SafeAreaView } from 'react-navigation';
const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={400} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={400} />
  </Transition.Together>
)

getItems = () => {
  firebase.database().ref('/coordinates')
    .orderByChild('description')
    .once('value', snapshot => {
      var returnArray = [];
      snapshot.forEach(function(snap) {
        var item = snap.val();
        item.key = snap.key;
        returnArray.push(item);
    });
    // this.setState({ dataArray: returnArray })
    return returnArray;  
    });
}

export default function GetItem() {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Transitioning.View
        style={styles.container}
        transition={transition}
        ref={ref}
      >
        <TextInput
          style={styles.textInputStyle}         
          placeholder="Aramak istediğini yaz"
          underlineColorAndroid="transparent"
        />
        <StatusBar/>
        {data.map(({ bg, color, category, subCategories }, index) => {
          return (
            <TouchableOpacity
              key={category}
              onPress={() => {
                ref.current.animateNextTransition();
                setCurrentIndex(index === currentIndex ? null : index);
              }}
              style={styles.cardContainer}>
              <View style={[styles.card, { backgroundColor: bg }]}>
                <Text style={[styles.heading, { color }]}>{category}</Text>
                {index === currentIndex && (
                  <View style={styles.subCategoriesList}>
                    {subCategories.map(subCategory => (
                      <Text key={subCategory} style={[styles.body, { color }]}>
                        {subCategory}
                      </Text>
                    ))}
                  </View>)}
              </View>
            </TouchableOpacity>
          );
        })}
      </Transitioning.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: '900',
    marginLeft:5,
    letterSpacing: -1,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
  },
  subCategoriesList: {
    marginTop: 20,
  },
  textInputStyle: {
    height: 50, 
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: 'white',
    borderRadius: 20,
  },
})









/*import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const GetItem = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#a7bbc7";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,

  },
  item: {
    padding: 15,
    marginVertical: 3,
    marginHorizontal: 14,
  },
  title: {
    fontSize: 24,
  },
});

export default GetItem;
*/