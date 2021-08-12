import React, { useRef } from 'react';
import { StyleSheet, View, FlatList } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {CONTACT_COMPONENT_WIDTH, CONTACT_COMPONENT_HEIGHT} from '@sita/dimensions';

export default function SwipeActions (props) {

  const SWIPE_OVERLAYS = [
    {
      id: '1',
      name: "done"
    },
    {
      id: '2',
      name: ""
    }
  ]

  const osRef = useRef(null);

  function renderOverlay({item}) {
    switch (item.id) {
      case '1':
        return (
          <View style={styles.Overlay}>
            <MaterialIcons name='done' size={30} color='#5af'/>
          </View>
        );
      case '2':
        return (
          <View style={styles.HiddenOverlay}/>
        );
      default:
        return (
          <View style={styles.HiddenOverlay}/>
        );
    }
  }

  var alreadyScrolled = false;
  function handleScroll(scrollDetails) {
    if (scrollDetails.nativeEvent.contentOffset.x < 5 && !alreadyScrolled) {
      alreadyScrolled = true;
      // close enough to consider the swipe right done
      osRef.current.scrollToIndex({index: 1})
      props.swipeRightAction();
    }
  }

  return (
    <FlatList
      style
      data={SWIPE_OVERLAYS}
      ref={osRef}
      renderItem={renderOverlay}
      keyExtractor={item => item.id}
      getItemLayout={(data, index) => ({length: CONTACT_COMPONENT_WIDTH, offset: CONTACT_COMPONENT_WIDTH*index, index: index})}
      initialScrollIndex={1}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.OverlayContainer}
      snapToInterval={CONTACT_COMPONENT_WIDTH}
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
    width: CONTACT_COMPONENT_WIDTH,
    height: CONTACT_COMPONENT_HEIGHT,
  },
  HiddenOverlay: {
    width: CONTACT_COMPONENT_WIDTH,
    height: CONTACT_COMPONENT_HEIGHT,
    backgroundColor: 'transparent',
    opacity: 0
  },
  Overlay: {
    width: CONTACT_COMPONENT_WIDTH,
    height: CONTACT_COMPONENT_HEIGHT,
    backgroundColor: 'rgba(85,170,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
