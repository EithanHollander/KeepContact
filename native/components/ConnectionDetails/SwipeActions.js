import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {CONNECTION_COMPONENT_WIDTH, CONNECTION_COMPONENT_HEIGHT} from '@sita/dimensions';

export default function SwipeActions (props) {

  const [swiped, setSwiped] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setSwiped(false);
      osRef.current.scrollToIndex({index: 1})
    }, 100)
  }, [swiped])

  const SWIPE_OVERLAYS = [
    {
      id: '1',
      name: "done"
    },
    {
      id: '2',
      name: ""
    },
    {
      id: '3',
      name: "snooze"
    }
  ]

  const osRef = useRef(null);

  function renderOverlay({item}) {
    switch (item.id) {
      case '1':
        return (
          <View style={[styles.Overlay, {backgroundColor: 'rgba(85,170,255,0.4)'}]}>
            <MaterialIcons name='done' size={30} color='#5af'/>
          </View>
        );
      case '2':
        return (
          <View style={styles.HiddenOverlay}/>
        );
      case '3':
        return (
          <View style={[styles.Overlay, {backgroundColor: 'rgba(130,130,130,0.4)'}]}>
            <MaterialIcons name='snooze' size={30} color='#828282'/>
          </View>
        );
      default:
        return (
          <View style={styles.HiddenOverlay}/>
        );
    }
  }

  function handleScroll(scrollDetails) {
    if (scrollDetails.nativeEvent.contentOffset.x < 5 && !swiped) {
      setSwiped(true);
      // close enough to consider the swipe right done
      osRef.current.scrollToIndex({index: 1})
      props.swipeRightAction();
    }
    else if (scrollDetails.nativeEvent.contentOffset.x > 595 && !swiped) {
      setSwiped(true);
      // close enough to consider the swipe left done
      osRef.current.scrollToIndex({index: 1})
      props.swipeLeftAction();
    }
  }

  return (
    <FlatList
      style
      data={SWIPE_OVERLAYS}
      ref={osRef}
      renderItem={renderOverlay}
      keyExtractor={item => item.id}
      getItemLayout={(data, index) => ({length: CONNECTION_COMPONENT_WIDTH, offset: CONNECTION_COMPONENT_WIDTH*index, index: index})}
      initialScrollIndex={1}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.OverlayContainer}
      snapToInterval={CONNECTION_COMPONENT_WIDTH}
      decelerationRate={'fast'}
      pagingEnabled={true}
      onScroll={handleScroll}
    >
    </FlatList>

  );
};

const styles = StyleSheet.create({
  OverlayContainer: {
    position: 'absolute',
    width: CONNECTION_COMPONENT_WIDTH,
    height: CONNECTION_COMPONENT_HEIGHT,
  },
  HiddenOverlay: {
    width: CONNECTION_COMPONENT_WIDTH,
    height: CONNECTION_COMPONENT_HEIGHT,
    backgroundColor: 'transparent',
    opacity: 0
  },
  Overlay: {
    width: CONNECTION_COMPONENT_WIDTH,
    height: CONNECTION_COMPONENT_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
