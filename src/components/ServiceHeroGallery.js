import React, { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontScale } from '../utils/responsive';

const GAP = 6;
const R = 12;

export default function ServiceHeroGallery({ uris, variantLabel }) {
  const [modalOpen, setModalOpen] = useState(false);
  const n = uris.length;

  const overlay = (
    <>
      <View style={heroStyles.heroGrad} />
      <View style={heroStyles.heroPill}>
        <Text style={heroStyles.heroPillText}>{variantLabel}</Text>
      </View>
    </>
  );

  if (n === 0) {
    return (
      <View style={[heroStyles.heroWrap, { height: 220, backgroundColor: '#d9e5e3' }]}>
        {overlay}
      </View>
    );
  }

  if (n === 1) {
    return (
      <View style={[heroStyles.heroWrap, { height: 260 }]}>
        <Image source={{ uri: uris[0] }} style={heroStyles.heroImage} />
        {overlay}
      </View>
    );
  }

  if (n === 2) {
    return (
      <View style={[heroStyles.heroWrap, { height: 220 }]}>
        <View style={heroStyles.row}>
          <Image source={{ uri: uris[0] }} style={[heroStyles.half, { marginRight: GAP / 2 }]} />
          <Image source={{ uri: uris[1] }} style={[heroStyles.half, { marginLeft: GAP / 2 }]} />
        </View>
        {overlay}
      </View>
    );
  }

  if (n === 3) {
    return (
      <View style={[heroStyles.heroWrap, { height: 230 }]}>
        <View style={heroStyles.row}>
          <Image source={{ uri: uris[0] }} style={[heroStyles.leftTall, { marginRight: GAP / 2 }]} />
          <View style={[heroStyles.rightStack, { marginLeft: GAP / 2 }]}>
            <Image source={{ uri: uris[1] }} style={[heroStyles.smallSq, { marginBottom: GAP / 2 }]} />
            <Image source={{ uri: uris[2] }} style={[heroStyles.smallSq, { marginTop: GAP / 2 }]} />
          </View>
        </View>
        {overlay}
      </View>
    );
  }

  const extra = n > 4;

  return (
    <>
      <View style={[heroStyles.heroWrap, { height: 240 }]}>
        <View style={heroStyles.row}>
          <View style={[heroStyles.featureCol, { marginRight: GAP / 2 }]}>
            <Image source={{ uri: uris[0] }} style={heroStyles.featureImg} />
          </View>
          <View style={[heroStyles.thumbCol, { marginLeft: GAP / 2 }]}>
            <View style={[heroStyles.row, { marginBottom: GAP / 2 }]}>
              <Image source={{ uri: uris[1] }} style={[heroStyles.thumbTop, { marginRight: GAP / 2 }]} />
              <Image source={{ uri: uris[2] }} style={[heroStyles.thumbTop, { marginLeft: GAP / 2 }]} />
            </View>
            <View style={[heroStyles.bottomSlot, { marginTop: GAP / 2 }]}>
              <Image source={{ uri: uris[3] }} style={heroStyles.thumbBottom} />
              {extra && (
                <Pressable style={heroStyles.viewAll} onPress={() => setModalOpen(true)}>
                  <MaterialIcons name="grid-view" size={16} color="#131e1c" />
                  <Text style={heroStyles.viewAllText}>View all {n}</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
        {overlay}
      </View>

      <Modal visible={modalOpen} animationType="slide" transparent onRequestClose={() => setModalOpen(false)}>
        <View style={heroStyles.modalBackdrop}>
          <View style={heroStyles.modalSheet}>
            <View style={heroStyles.modalHeader}>
              <Text style={heroStyles.modalTitle}>Photos</Text>
              <Pressable onPress={() => setModalOpen(false)} hitSlop={12}>
                <MaterialIcons name="close" size={24} color="#131e1c" />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={heroStyles.modalGrid}>
              {uris.map((u, i) => (
                <Image key={i} source={{ uri: u }} style={heroStyles.modalThumb} />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const heroStyles = StyleSheet.create({
  heroWrap: { position: 'relative', overflow: 'hidden' },
  heroImage: { width: '100%', height: '100%', backgroundColor: '#d9e5e3' },
  heroGrad: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19,30,28,0.12)',
  },
  heroPill: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  heroPillText: { color: '#366855', fontSize: fontScale(10), fontWeight: '800' },
  row: { flexDirection: 'row', alignItems: 'stretch' },
  half: { flex: 1, height: 220, borderRadius: R, backgroundColor: '#d9e5e3' },
  leftTall: { width: '56%', height: 230, borderRadius: R, backgroundColor: '#d9e5e3' },
  rightStack: { flex: 1, justifyContent: 'space-between' },
  smallSq: { width: '100%', height: 111, borderRadius: R, backgroundColor: '#d9e5e3' },
  featureCol: { width: '52%' },
  featureImg: { width: '100%', height: 240, borderRadius: R, backgroundColor: '#d9e5e3' },
  thumbCol: { flex: 1 },
  thumbTop: { flex: 1, height: 115, borderRadius: R, backgroundColor: '#d9e5e3' },
  bottomSlot: { position: 'relative' },
  thumbBottom: { width: '100%', height: 115, borderRadius: R, backgroundColor: '#d9e5e3' },
  viewAll: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  viewAllText: { marginLeft: 6, color: '#131e1c', fontSize: fontScale(11), fontWeight: '800' },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    maxHeight: '88%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  modalTitle: { fontSize: fontScale(16), fontWeight: '800', color: '#131e1c' },
  modalGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8, paddingTop: 8 },
  modalThumb: {
    width: '47%',
    marginHorizontal: '1.5%',
    marginBottom: 10,
    aspectRatio: 1,
    borderRadius: R,
    backgroundColor: '#d9e5e3',
  },
});
