import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const DNA = [
  'Constancia',
  'Fondista',
  'Fuerza sólida',
  'Madrugador',
];

const ACTIVITIES = [
  {
    type: 'RUN',
    title: 'Intervalos',
    detail: '6 × 800 m · 8.4 km',
    date: 'Hoy · 18:42',
    icon: 'speedometer-outline',
  },
  {
    type: 'GYM',
    title: 'Fuerza tren superior',
    detail: '45 min · 8 ejercicios',
    date: 'Ayer · 19:10',
    icon: 'barbell-outline',
  },
  {
    type: 'RUN',
    title: 'Rodaje suave',
    detail: '8 km · 5:12/km',
    date: 'Lun · 08:21',
    icon: 'walk-outline',
  },
];

const POSTS = [
  {
    id: '1',
    text: '6 × 800 m hoy. Las últimas dos han costado, pero justo por eso tocaba hacerlas.',
    time: 'Hace 2h',
  },
  {
    id: '2',
    text: 'Semana 8 de preparación para Hyrox. Cada vez queda menos.',
    time: 'Hace 2 días',
  },
];

const FRIENDS = [
  {
    name: 'Álex',
    detail: '10K · sub 45 min',
    initials: 'A',
  },
  {
    name: 'María',
    detail: 'Hyrox · semana 6',
    initials: 'M',
  },
  {
    name: 'Daniel',
    detail: 'Ironman 70.3',
    initials: 'D',
  },
  {
    name: 'Carlos',
    detail: 'Maratón Madrid',
    initials: 'C',
  },
];

const COMMUNITIES = [
  {
    name: 'Hyrox Madrid',
    members: '2.4K atletas',
    icon: 'fitness-outline',
  },
  {
    name: 'Hybrid Athletes',
    members: '8.7K atletas',
    icon: 'barbell-outline',
  },
  {
    name: 'Running España',
    members: '12.3K atletas',
    icon: 'walk-outline',
  },
];

const WEEK_STATS = [
  { n: '32', l: 'km carrera' },
  { n: '124', l: 'km bici' },
  { n: '4.2', l: 'km nado' },
  { n: '3', l: 'fuerza' },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Actividad');

  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top', 'left', 'right']}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}

        <View style={styles.profileHeader}>

          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarLetter}>
                P
              </Text>
            </View>

            <View style={styles.onlineDot} />
          </View>

          <View style={styles.profileIdentity}>

            <Text style={styles.name}>
              Pablo Mestre
            </Text>

            <Text style={styles.username}>
              @pablomestre
            </Text>

            <Text style={styles.tag}>
              HYBRID ATHLETE
            </Text>

          </View>

          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons
              name="settings-outline"
              size={19}
              color={COLORS.inkDim}
            />
          </TouchableOpacity>

        </View>

        {/* BIO */}

        <Text style={styles.bio}>
          Running · Hyrox · Gym
          {'\n'}
          Entrenando para ser mejor que ayer.
        </Text>

        {/* SOCIAL STATS */}

        <View style={styles.socialStats}>

          <View style={styles.socialStat}>
            <Text style={styles.socialNumber}>
              47
            </Text>

            <Text style={styles.socialLabel}>
              Actividades
            </Text>
          </View>

          <View style={styles.socialDivider} />

          <View style={styles.socialStat}>
            <Text style={styles.socialNumber}>
              284
            </Text>

            <Text style={styles.socialLabel}>
              Seguidores
            </Text>
          </View>

          <View style={styles.socialDivider} />

          <View style={styles.socialStat}>
            <Text style={styles.socialNumber}>
              193
            </Text>

            <Text style={styles.socialLabel}>
              Siguiendo
            </Text>
          </View>

        </View>

        {/* EDIT PROFILE */}

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>
            Editar perfil
          </Text>
        </TouchableOpacity>

        {/* ATHLETE DNA */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Mi perfil deportivo
          </Text>
        </View>

        <View style={styles.dnaRow}>

          {DNA.map((item) => (
            <View
              key={item}
              style={styles.dnaChip}
            >
              <Text style={styles.dnaText}>
                {item}
              </Text>
            </View>
          ))}

        </View>

        {/* MAIN GOAL */}

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Objetivo actual
          </Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>
              Ver objetivos
            </Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.goalCard}>

          <View style={styles.goalTop}>

            <View style={styles.goalIcon}>
              <Ionicons
                name="trophy-outline"
                size={20}
                color={COLORS.accentDark}
              />
            </View>

            <View style={styles.goalInfo}>

              <Text style={styles.goalType}>
                OBJETIVO PRINCIPAL
              </Text>

              <Text style={styles.goalName}>
                HYROX Madrid
              </Text>

              <Text style={styles.goalDate}>
                47 días restantes
              </Text>

            </View>

            <Ionicons
              name="chevron-forward"
              size={17}
              color={COLORS.inkFaint}
            />

          </View>

          <View style={styles.goalProgressRow}>

            <View style={styles.goalProgressBackground}>
              <View
                style={[
                  styles.goalProgressFill,
                  { width: '68%' },
                ]}
              />
            </View>

            <Text style={styles.goalPercentage}>
              68%
            </Text>

          </View>

        </TouchableOpacity>

        {/* TABS */}

        <View style={styles.tabs}>

          <TouchableOpacity
            onPress={() => setActiveTab('Actividad')}
            style={[
              styles.tab,
              activeTab === 'Actividad' &&
                styles.tabActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Actividad' &&
                  styles.tabTextActive,
              ]}
            >
              Actividad
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('Posts')}
            style={[
              styles.tab,
              activeTab === 'Posts' &&
                styles.tabActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Posts' &&
                  styles.tabTextActive,
              ]}
            >
              Posts
            </Text>
          </TouchableOpacity>

        </View>

        {/* ACTIVITY */}

        {activeTab === 'Actividad' && (
          <>

            <View style={styles.sectionHeader}>

              <Text style={styles.sectionTitle}>
                Actividad reciente
              </Text>

              <TouchableOpacity>
                <Text style={styles.viewAll}>
                  Ver todo
                </Text>
              </TouchableOpacity>

            </View>

            {ACTIVITIES.map((activity) => (

              <TouchableOpacity
                key={activity.title}
                style={styles.activity}
              >

                <View style={styles.activityIcon}>
                  <Ionicons
                    name={activity.icon}
                    size={19}
                    color={COLORS.accentDark}
                  />
                </View>

                <View style={styles.activityInfo}>

                  <Text style={styles.activityTitle}>
                    {activity.title}
                  </Text>

                  <Text style={styles.activityDetail}>
                    {activity.detail}
                  </Text>

                </View>

                <Text style={styles.activityDate}>
                  {activity.date}
                </Text>

              </TouchableOpacity>

            ))}

            {/* WEEK */}

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Esta semana
              </Text>
            </View>

            <View style={styles.weekCard}>

              {WEEK_STATS.map((stat, index) => (

                <View
                  key={stat.l}
                  style={[
                    styles.weekStat,
                    index !== WEEK_STATS.length - 1 &&
                      styles.weekStatBorder,
                  ]}
                >

                  <Text style={styles.weekNumber}>
                    {stat.n}
                  </Text>

                  <Text style={styles.weekLabel}>
                    {stat.l}
                  </Text>

                </View>

              ))}

            </View>

          </>
        )}

        {/* POSTS */}

        {activeTab === 'Posts' && (
          <>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Mis posts
              </Text>
            </View>

            {POSTS.map((post) => (

              <View
                key={post.id}
                style={styles.post}
              >

                <View style={styles.postHeader}>

                  <View style={styles.postAvatar}>
                    <Text style={styles.postAvatarText}>
                      P
                    </Text>
                  </View>

                  <View style={styles.postUser}>

                    <Text style={styles.postName}>
                      Pablo Mestre
                    </Text>

                    <Text style={styles.postTime}>
                      {post.time}
                    </Text>

                  </View>

                </View>

                <Text style={styles.postText}>
                  {post.text}
                </Text>

                <View style={styles.postActions}>

                  <View style={styles.postAction}>
                    <Ionicons
                      name="heart-outline"
                      size={17}
                      color={COLORS.inkDim}
                    />

                    <Text style={styles.postActionText}>
                      Me gusta
                    </Text>
                  </View>

                  <View style={styles.postAction}>
                    <Ionicons
                      name="chatbubble-outline"
                      size={16}
                      color={COLORS.inkDim}
                    />

                    <Text style={styles.postActionText}>
                      Comentar
                    </Text>
                  </View>

                </View>

              </View>

            ))}

          </>
        )}

        {/* FRIENDS */}

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Amigos
          </Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>
              Ver todos
            </Text>
          </TouchableOpacity>

        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.friendsRow}
        >

          {FRIENDS.map((friend) => (

            <TouchableOpacity
              key={friend.name}
              style={styles.friend}
            >

              <View style={styles.friendAvatar}>
                <Text style={styles.friendInitial}>
                  {friend.initials}
                </Text>
              </View>

              <Text style={styles.friendName}>
                {friend.name}
              </Text>

              <Text
                style={styles.friendDetail}
                numberOfLines={1}
              >
                {friend.detail}
              </Text>

            </TouchableOpacity>

          ))}

        </ScrollView>

        {/* COMMUNITIES */}

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Comunidades
          </Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>
              Ver todas
            </Text>
          </TouchableOpacity>

        </View>

        {COMMUNITIES.map((community) => (

          <TouchableOpacity
            key={community.name}
            style={styles.community}
          >

            <View style={styles.communityIcon}>
              <Ionicons
                name={community.icon}
                size={19}
                color={COLORS.accentDark}
              />
            </View>

            <View style={styles.communityInfo}>

              <Text style={styles.communityName}>
                {community.name}
              </Text>

              <Text style={styles.communityMembers}>
                {community.members}
              </Text>

            </View>

            <Ionicons
              name="chevron-forward"
              size={17}
              color={COLORS.inkFaint}
            />

          </TouchableOpacity>

        ))}

        <View style={{ height: 35 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const COLORS = {
  background: '#F7F8F6',
  card: '#FFFFFF',

  ink: '#171A18',
  inkDim: '#69706B',
  inkFaint: '#969D98',

  line: '#E7EAE7',
  lineStrong: '#D9DEDA',

  accent: '#B8D8CD',
  accentDark: '#46766A',

  amber: '#D6A94A',
};

const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },

  /* PROFILE HEADER */

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 16,
  },

  avatarContainer: {
    position: 'relative',
  },

  avatar: {
    width: 66,
    height: 66,

    borderRadius: 33,

    backgroundColor: '#E5F0EC',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#DCE8E3',
  },

  avatarLetter: {
    color: COLORS.accentDark,

    fontSize: 24,
    fontWeight: '600',
  },

  onlineDot: {
    position: 'absolute',

    width: 11,
    height: 11,

    borderRadius: 6,

    backgroundColor: COLORS.accentDark,

    borderWidth: 2,
    borderColor: COLORS.background,

    right: 1,
    bottom: 2,
  },

  profileIdentity: {
    flex: 1,

    marginLeft: 13,
  },

  name: {
    color: COLORS.ink,

    fontSize: 23,
    fontWeight: '600',

    letterSpacing: -0.5,
  },

  username: {
    color: COLORS.inkFaint,

    fontSize: 11,

    marginTop: 1,
  },

  tag: {
    color: COLORS.accentDark,

    fontSize: 8.5,
    fontWeight: '700',

    letterSpacing: 1,

    marginTop: 5,
  },

  settingsButton: {
    width: 38,
    height: 38,

    borderRadius: 19,

    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.line,

    alignItems: 'center',
    justifyContent: 'center',
  },

  /* BIO */

  bio: {
    color: COLORS.inkDim,

    fontSize: 12.5,
    lineHeight: 19,

    marginBottom: 18,
  },

  /* SOCIAL STATS */

  socialStats: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 15,

    borderTopWidth: 1,
    borderBottomWidth: 1,

    borderColor: COLORS.line,
  },

  socialStat: {
    flex: 1,
    alignItems: 'center',
  },

  socialNumber: {
    color: COLORS.ink,

    fontSize: 18,
    fontWeight: '600',
  },

  socialLabel: {
    color: COLORS.inkFaint,

    fontSize: 10,

    marginTop: 2,
  },

  socialDivider: {
    width: 1,
    height: 25,

    backgroundColor: COLORS.line,
  },

  /* EDIT */

  editButton: {
    height: 42,

    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.line,

    borderRadius: 12,

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 14,
    marginBottom: 29,
  },

  editButtonText: {
    color: COLORS.ink,

    fontSize: 12.5,
    fontWeight: '600',
  },

  /* SECTIONS */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 11,
  },

  sectionTitle: {
    color: COLORS.ink,

    fontSize: 16,
    fontWeight: '600',

    letterSpacing: -0.25,
  },

  viewAll: {
    color: COLORS.accentDark,

    fontSize: 11,
    fontWeight: '600',
  },

  /* DNA */

  dnaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    gap: 7,

    marginBottom: 29,
  },

  dnaChip: {
    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.line,

    borderRadius: 10,

    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  dnaText: {
    color: COLORS.inkDim,

    fontSize: 11,
    fontWeight: '500',
  },

  /* GOAL */

  goalCard: {
    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.line,

    borderRadius: 18,

    padding: 17,

    marginBottom: 29,
  },

  goalTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  goalIcon: {
    width: 43,
    height: 43,

    borderRadius: 13,

    backgroundColor: '#EDF5F2',

    alignItems: 'center',
    justifyContent: 'center',
  },

  goalInfo: {
    flex: 1,

    marginLeft: 11,
  },

  goalType: {
    color: COLORS.inkFaint,

    fontSize: 8,
    fontWeight: '700',

    letterSpacing: 1,

    marginBottom: 3,
  },

  goalName: {
    color: COLORS.ink,

    fontSize: 16,
    fontWeight: '600',
  },

  goalDate: {
    color: COLORS.inkFaint,

    fontSize: 10.5,

    marginTop: 2,
  },

  goalProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 17,
  },

  goalProgressBackground: {
    flex: 1,

    height: 5,

    borderRadius: 3,

    backgroundColor: '#EDF0ED',

    overflow: 'hidden',

    marginRight: 10,
  },

  goalProgressFill: {
    height: '100%',

    borderRadius: 3,

    backgroundColor: COLORS.accentDark,
  },

  goalPercentage: {
    color: COLORS.accentDark,

    fontSize: 11,
    fontWeight: '600',
  },

  /* TABS */

  tabs: {
    flexDirection: 'row',

    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,

    marginBottom: 24,
  },

  tab: {
    paddingBottom: 11,

    marginRight: 24,
  },

  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.ink,
  },

  tabText: {
    color: COLORS.inkFaint,

    fontSize: 12.5,
    fontWeight: '500',
  },

  tabTextActive: {
    color: COLORS.ink,

    fontWeight: '600',
  },

  /* ACTIVITY */

  activity: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 13,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },

  activityIcon: {
    width: 40,
    height: 40,

    borderRadius: 12,

    backgroundColor: '#EDF5F2',

    alignItems: 'center',
    justifyContent: 'center',
  },

  activityInfo: {
    flex: 1,

    marginLeft: 11,
  },

  activityTitle: {
    color: COLORS.ink,

    fontSize: 13,
    fontWeight: '600',
  },

  activityDetail: {
    color: COLORS.inkFaint,

    fontSize: 10.5,

    marginTop: 3,
  },

  activityDate: {
    color: COLORS.inkFaint,

    fontSize: 9.5,
  },

  /* WEEK */

  weekCard: {
    flexDirection: 'row',

    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.line,

    borderRadius: 17,

    paddingVertical: 16,

    marginBottom: 29,
  },

  weekStat: {
    flex: 1,

    alignItems: 'center',
  },

  weekStatBorder: {
    borderRightWidth: 1,
    borderRightColor: COLORS.line,
  },

  weekNumber: {
    color: COLORS.ink,

    fontSize: 17,
    fontWeight: '600',
  },

  weekLabel: {
    color: COLORS.inkFaint,

    fontSize: 9.5,

    marginTop: 3,
  },

  /* POSTS */

  post: {
    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.line,

    borderRadius: 17,

    padding: 16,

    marginBottom: 11,
  },

  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  postAvatar: {
    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor: '#E5F0EC',

    alignItems: 'center',
    justifyContent: 'center',
  },

  postAvatarText: {
    color: COLORS.accentDark,

    fontSize: 12,
    fontWeight: '600',
  },

  postUser: {
    marginLeft: 9,
  },

  postName: {
    color: COLORS.ink,

    fontSize: 12.5,
    fontWeight: '600',
  },

  postTime: {
    color: COLORS.inkFaint,

    fontSize: 9.5,

    marginTop: 2,
  },

  postText: {
    color: COLORS.inkDim,

    fontSize: 13,
    lineHeight: 20,

    marginTop: 13,
  },

  postActions: {
    flexDirection: 'row',

    marginTop: 14,

    paddingTop: 12,

    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },

  postAction: {
    flexDirection: 'row',
    alignItems: 'center',

    marginRight: 22,
  },

  postActionText: {
    color: COLORS.inkFaint,

    fontSize: 10.5,

    marginLeft: 6,
  },

  /* FRIENDS */

  friendsRow: {
    paddingBottom: 29,
  },

  friend: {
    width: 91,

    alignItems: 'center',

    marginRight: 12,
  },

  friendAvatar: {
    width: 52,
    height: 52,

    borderRadius: 26,

    backgroundColor: '#E5F0EC',

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 7,
  },

  friendInitial: {
    color: COLORS.accentDark,

    fontSize: 17,
    fontWeight: '600',
  },

  friendName: {
    color: COLORS.ink,

    fontSize: 11.5,
    fontWeight: '600',
  },

  friendDetail: {
    color: COLORS.inkFaint,

    fontSize: 9,

    marginTop: 2,

    maxWidth: 85,
  },

  /* COMMUNITIES */

  community: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 12,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },

  communityIcon: {
    width: 40,
    height: 40,

    borderRadius: 12,

    backgroundColor: '#EDF5F2',

    alignItems: 'center',
    justifyContent: 'center',
  },

  communityInfo: {
    flex: 1,

    marginLeft: 11,
  },

  communityName: {
    color: COLORS.ink,

    fontSize: 12.5,
    fontWeight: '600',
  },

  communityMembers: {
    color: COLORS.inkFaint,

    fontSize: 10,

    marginTop: 2,
  },

});