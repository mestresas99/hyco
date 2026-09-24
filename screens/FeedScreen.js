import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { colors, fonts } from '../theme';

const INITIAL_POSTS = [
  {
    id: '1',
    name: 'Álex',
    time: 'Hace 2h',
    text: 'Series de 8×800m a 4:15/km. Las primeras cuatro se sintieron fáciles, las dos últimas me destrozaron.',
    media: null,
    type: 'HYROX',
  },
  {
    id: '2',
    name: 'María',
    time: 'Hace 5h',
    text: 'Estoy empezando a obsesionarme demasiado con el volumen. Creo que necesito una semana de descarga antes de que me lo pida el cuerpo.',
    media: {
      type: 'image',
      uri: 'https://hips.hearstapps.com/hmg-prod/images/hyrox-workout-66c798edb7c07.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
    },
    type: 'HYROX',
  },
  {
    id: '3',
    name: 'Daniel',
    time: 'Ayer',
    text: 'Nuevo objetivo: bajar de 5h en el 70.3 de este año. Empiezo el bloque específico esta semana.',
    media: null,
    type: 'HYROX',
  },
];

function initials(name) {
  return name.trim().charAt(0).toUpperCase();
}

function getTypeLabel(type) {
  switch (type) {
    case 'RUN':
      return 'RUNNING';
    case 'TRAINING':
      return 'TRAINING';
    case 'GOAL':
      return 'GOAL';
    case 'HYROX':
      return 'HYROX';
    default:
      return 'SPORT';
  }
}

export default function FeedScreen() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [composerOpen, setComposerOpen] = useState(false);
  const [draftText, setDraftText] = useState('');
  const [draftMedia, setDraftMedia] = useState(null);

  function openComposer() {
    setDraftText('');
    setDraftMedia(null);
    setComposerOpen(true);
  }

  async function pickMedia(kind) {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Falta permiso',
        'Necesitas dar acceso a tus fotos y vídeos para adjuntarlos a la publicación.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        kind === 'video'
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (
      !result.canceled &&
      result.assets &&
      result.assets.length > 0
    ) {
      const asset = result.assets[0];

      setDraftMedia({
        type: kind,
        uri: asset.uri,
      });
    }
  }

  function publish() {
    if (!draftText.trim() && !draftMedia) {
      return;
    }

    const newPost = {
      id: String(Date.now()),
      name: 'Pablo Mestre',
      time: 'Ahora',
      text: draftText.trim(),
      media: draftMedia,
      type: 'TRAINING',
    };

    setPosts((prev) => [newPost, ...prev]);

    setDraftText('');
    setDraftMedia(null);
    setComposerOpen(false);
  }

  const canPublish =
    draftText.trim().length > 0 || !!draftMedia;

  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top', 'left', 'right']}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>HYCO</Text>
          <Text style={styles.title}>Comunidad</Text>
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={openComposer}
          activeOpacity={0.8}
        >
          <Feather
            name="plus"
            size={19}
            color={colors.bg}
          />
        </TouchableOpacity>
      </View>

      {/* FILTER */}

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterActive}>
          <Text style={styles.filterActiveText}>
            Hyrox
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filter}>
          <Text style={styles.filterText}>
            Ironman
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filter}>
          <Text style={styles.filterText}>
            Trail running
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filter}>
          <Text style={styles.filterText}>
            GYM
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filter}>
          <Text style={styles.filterText}>
            Running
          </Text>
        </TouchableOpacity>
      </View>

      {/* FEED */}

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {posts.map((post) => (
          <View
            key={post.id}
            style={styles.post}
          >
            {/* USER */}

            <View style={styles.postHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {initials(post.name)}
                </Text>
              </View>

              <View style={styles.userInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.postName}>
                    {post.name}
                  </Text>

                  <Text style={styles.postType}>
                    {getTypeLabel(post.type)}
                  </Text>
                </View>

                <Text style={styles.postTime}>
                  {post.time}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.moreButton}
              >
                <Feather
                  name="more-horizontal"
                  size={19}
                  color={colors.inkFaint}
                />
              </TouchableOpacity>
            </View>

            {/* TEXT */}

            {post.text ? (
              <Text style={styles.postBody}>
                {post.text}
              </Text>
            ) : null}

            {/* IMAGE */}

            {post.media &&
              post.media.type === 'image' && (
                <Image
                  source={{ uri: post.media.uri }}
                  style={styles.media}
                  resizeMode="cover"
                />
              )}

            {/* VIDEO */}

            {post.media &&
              post.media.type === 'video' && (
                <View style={styles.media}>
                  <Image
                    source={{ uri: post.media.uri }}
                    style={styles.media}
                    resizeMode="cover"
                  />

                  <View style={styles.playButton}>
                    <Feather
                      name="play"
                      size={17}
                      color="#FFFFFF"
                    />
                  </View>
                </View>
              )}

            {/* ACTIONS */}

            <View style={styles.actions}>
              <TouchableOpacity style={styles.action}>
                <Feather
                  name="heart"
                  size={18}
                  color={colors.inkDim}
                />
                <Text style={styles.actionText}>
                  Me gusta
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.action}>
                <Feather
                  name="message-circle"
                  size={18}
                  color={colors.inkDim}
                />
                <Text style={styles.actionText}>
                  Comentar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.share}>
                <Feather
                  name="send"
                  size={17}
                  color={colors.inkDim}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* COMPOSER */}

      <Modal
        visible={composerOpen}
        animationType="slide"
        onRequestClose={() =>
          setComposerOpen(false)
        }
      >
        <SafeAreaView
          style={styles.composerSafe}
          edges={['top', 'left', 'right', 'bottom']}
        >
          <KeyboardAvoidingView
            style={styles.keyboard}
            behavior={
              Platform.OS === 'ios'
                ? 'padding'
                : undefined
            }
          >
            {/* COMPOSER HEADER */}

            <View style={styles.composerHeader}>
              <TouchableOpacity
                onPress={() =>
                  setComposerOpen(false)
                }
              >
                <Text style={styles.cancel}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <Text style={styles.composerTitle}>
                Nueva publicación
              </Text>

              <TouchableOpacity
                onPress={publish}
                disabled={!canPublish}
              >
                <Text
                  style={[
                    styles.publish,
                    !canPublish &&
                      styles.publishDisabled,
                  ]}
                >
                  Publicar
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={
                styles.composerBody
              }
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* AVATAR */}

              <View style={styles.composerUser}>
                <View style={styles.composerAvatar}>
                  <Text style={styles.avatarText}>
                    P
                  </Text>
                </View>

                <View>
                  <Text style={styles.composerName}>
                    Pablo Mestre
                  </Text>

                  <Text style={styles.composerVisibility}>
                    Público
                  </Text>
                </View>
              </View>

              {/* INPUT */}

              <TextInput
                style={styles.input}
                placeholder="Comparte tu entrenamiento, progreso u objetivo..."
                placeholderTextColor={
                  colors.inkFaint
                }
                multiline
                value={draftText}
                onChangeText={setDraftText}
                autoFocus
              />

              {/* PREVIEW */}

              {draftMedia && (
                <View style={styles.previewWrap}>
                  <Image
                    source={{
                      uri: draftMedia.uri,
                    }}
                    style={styles.preview}
                    resizeMode="cover"
                  />

                  {draftMedia.type === 'video' && (
                    <View style={styles.playButton}>
                      <Feather
                        name="play"
                        size={17}
                        color="#FFFFFF"
                      />
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.removeMedia}
                    onPress={() =>
                      setDraftMedia(null)
                    }
                  >
                    <Feather
                      name="x"
                      size={16}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </View>
              )}

              {/* MEDIA */}

              <View style={styles.mediaSection}>
                <Text style={styles.mediaTitle}>
                  Añadir contenido
                </Text>

                <View style={styles.mediaRow}>
                  <TouchableOpacity
                    style={styles.mediaButton}
                    onPress={() =>
                      pickMedia('image')
                    }
                  >
                    <Feather
                      name="image"
                      size={18}
                      color={colors.ink}
                    />

                    <Text style={styles.mediaButtonText}>
                      Foto
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.mediaButton}
                    onPress={() =>
                      pickMedia('video')
                    }
                  >
                    <Feather
                      name="video"
                      size={18}
                      color={colors.ink}
                    />

                    <Text style={styles.mediaButtonText}>
                      Vídeo
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F8F6',
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 16,
  },

  eyebrow: {
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '600',
    color: colors.inkFaint,
    marginBottom: 3,
  },

  title: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '600',
    letterSpacing: -0.7,
    color: '#171918',
  },

  createButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.ink,
  },

  /* FILTER */

  filterContainer: {
    flexDirection: 'row',

    paddingHorizontal: 22,
    paddingBottom: 4,

    gap: 22,
  },

  filter: {
    paddingBottom: 12,
  },

  filterActive: {
    paddingBottom: 12,

    borderBottomWidth: 2,
    borderBottomColor: colors.amber,
  },

  filterText: {
    fontSize: 13,
    color: '#8A8E8B',
    fontWeight: '500',
  },

  filterActiveText: {
    fontSize: 13,
    color: '#171918',
    fontWeight: '600',
  },

  /* FEED */

  content: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 40,
  },

  post: {
    paddingTop: 22,
    paddingBottom: 24,

    borderBottomWidth: 1,
    borderBottomColor: '#E5E7E4',
  },

  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 38,
    height: 38,

    borderRadius: 19,

    backgroundColor: '#E4E8E2',

    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#303531',
    fontSize: 14,
    fontWeight: '600',
  },

  userInfo: {
    flex: 1,
    marginLeft: 11,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  postName: {
    color: '#171918',
    fontSize: 14,
    fontWeight: '600',
  },

  postType: {
    marginLeft: 8,

    fontSize: 9,
    letterSpacing: 1,

    color: '#999E9A',
    fontWeight: '600',
  },

  postTime: {
    color: '#A0A4A1',
    fontSize: 11,

    marginTop: 2,
  },

  moreButton: {
    padding: 5,
  },

  postBody: {
    color: '#303431',

    fontSize: 14.5,
    lineHeight: 22,

    marginTop: 14,
    marginBottom: 14,

    letterSpacing: -0.1,
  },

  media: {
    width: '100%',
    height: 235,

    borderRadius: 16,

    backgroundColor: '#E9ECE8',

    overflow: 'hidden',
  },

  playButton: {
    position: 'absolute',

    top: '50%',
    left: '50%',

    width: 42,
    height: 42,

    marginLeft: -21,
    marginTop: -21,

    borderRadius: 21,

    backgroundColor: 'rgba(0,0,0,0.55)',

    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ACTIONS */

  actions: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 15,
  },

  action: {
    flexDirection: 'row',
    alignItems: 'center',

    marginRight: 22,
  },

  actionText: {
    marginLeft: 6,

    color: '#858A86',
    fontSize: 11.5,
  },

  share: {
    marginLeft: 'auto',
    padding: 3,
  },

  bottomSpace: {
    height: 80,
  },

  /* COMPOSER */

  composerSafe: {
    flex: 1,
    backgroundColor: '#F7F8F6',
    marginTop: '50'
  },

  keyboard: {
    flex: 1,
  },

  composerHeader: {
    height: 58,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,

    borderBottomWidth: 1,
    borderBottomColor: '#E5E7E4',
  },

  composerTitle: {
    color: '#171918',
    fontSize: 14,
    fontWeight: '600',
  },

  cancel: {
    color: '#777C78',
    fontSize: 13,
  },

  publish: {
    color: colors.amber,
    fontSize: 13,
    fontWeight: '600',
  },

  publishDisabled: {
    color: '#B7BBB8',
  },

  composerBody: {
    padding: 22,
    paddingBottom: 50,
  },

  composerUser: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 24,
  },

  composerAvatar: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: '#E4E8E2',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 11,
  },

  composerName: {
    color: '#171918',
    fontSize: 13.5,
    fontWeight: '600',
  },

  composerVisibility: {
    color: '#9A9F9B',
    fontSize: 11,
    marginTop: 2,
  },

  input: {
    color: '#171918',

    fontSize: 18,
    lineHeight: 27,

    minHeight: 150,

    textAlignVertical: 'top',

    padding: 0,
  },

  previewWrap: {
    position: 'relative',

    marginTop: 10,
  },

  preview: {
    width: '100%',
    height: 220,

    borderRadius: 16,

    backgroundColor: '#E9ECE8',
  },

  removeMedia: {
    position: 'absolute',

    top: 10,
    right: 10,

    width: 30,
    height: 30,

    borderRadius: 15,

    backgroundColor: 'rgba(0,0,0,0.55)',

    alignItems: 'center',
    justifyContent: 'center',
  },

  mediaSection: {
    marginTop: 28,

    paddingTop: 20,

    borderTopWidth: 1,
    borderTopColor: '#E5E7E4',
  },

  mediaTitle: {
    color: '#707570',

    fontSize: 12,
    fontWeight: '500',

    marginBottom: 12,
  },

  mediaRow: {
    flexDirection: 'row',

    gap: 10,
  },

  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 16,
    paddingVertical: 11,

    borderRadius: 12,

    backgroundColor: '#ECEFEB',
  },

  mediaButtonText: {
    color: '#303431',

    fontSize: 12.5,
    fontWeight: '500',

    marginLeft: 7,
  },
});