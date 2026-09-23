import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const WEEK_CHECK = [
  { label: '2 rodajes', done: true },
  { label: '2 salidas bici', done: true },
  { label: '2 nados', done: true },
  { label: 'Tirada larga bici', done: false },
];

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

export default function JourneyScreen() {
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

        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>
              TU PROGRESO
            </Text>

            <Text style={styles.title}>
              Objetivos
            </Text>

            <Text style={styles.subtitle}>
              Sigue avanzando hacia lo que te has propuesto.
            </Text>
          </View>
        </View>

        {/* ACTIVE OBJECTIVES */}

        <View style={styles.focusRow}>
          <View style={styles.focusDot} />

          <Text style={styles.focusText}>
            2 objetivos activos
          </Text>
        </View>

        {/* GOAL 1 */}

        <TouchableOpacity
          style={styles.goalCard}
          activeOpacity={0.85}
        >
          <View style={styles.goalHeader}>

            <View style={styles.goalHeaderLeft}>

              <View style={styles.goalIcon}>
                <Ionicons
                  name="bicycle-outline"
                  size={19}
                  color={COLORS.accentDark}
                />
              </View>

              <View>
                <Text style={styles.goalEyebrow}>
                  TRIATLÓN
                </Text>

                <Text style={styles.goalName}>
                  70.3 Valencia
                </Text>
              </View>

            </View>

            <View style={styles.arrowButton}>
              <Ionicons
                name="arrow-up-right"
                size={17}
                color={COLORS.inkDim}
              />
            </View>

          </View>

          <View style={styles.progressHeader}>

            <View>
              <Text style={styles.progressNumber}>
                67%
              </Text>

              <Text style={styles.progressLabel}>
                progreso del objetivo
              </Text>
            </View>

            <Text style={styles.daysLeft}>
              68 días
            </Text>

          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: '67%',
                  backgroundColor: COLORS.accentDark,
                },
              ]}
            />
          </View>

          <Text style={styles.goalDate}>
            142 de 210 días · 18 abr 2027
          </Text>

          {/* STATS */}

          <View style={styles.statGrid}>

            <Stat
              n="126"
              u="km nado"
            />

            <Stat
              n="2.840"
              u="km bici"
            />

            <Stat
              n="412"
              u="km carrera"
            />

            <Stat
              n="38"
              u="sesiones gym"
            />

          </View>

          {/* WEEKLY CHECK */}

          <View style={styles.weekSection}>

            <View style={styles.weekSectionHeader}>
              <Text style={styles.weekTitle}>
                Esta semana
              </Text>

              <Text style={styles.weekCount}>
                3 / 4
              </Text>
            </View>

            <View style={styles.weekCheck}>

              {WEEK_CHECK.map((item) => (

                <View
                  key={item.label}
                  style={styles.weekRow}
                >

                  <View
                    style={[
                      styles.mark,
                      item.done && styles.markDone,
                    ]}
                  >
                    {item.done && (
                      <Ionicons
                        name="checkmark"
                        size={10}
                        color="#FFFFFF"
                      />
                    )}
                  </View>

                  <Text
                    style={[
                      styles.weekLabel,
                      item.done &&
                        styles.weekLabelDone,
                    ]}
                  >
                    {item.label}
                  </Text>

                </View>

              ))}

            </View>

          </View>

          {/* NOTE */}

          <View style={styles.noteBlock}>

            <View style={styles.noteIcon}>
              <Ionicons
                name="chatbubble-outline"
                size={13}
                color={COLORS.amber}
              />
            </View>

            <Text style={styles.noteText}>
              "La bici es ahora mismo mi punto débil."
            </Text>

          </View>

        </TouchableOpacity>

        {/* GOAL 2 */}

        <TouchableOpacity
          style={styles.goalCard}
          activeOpacity={0.85}
        >

          <View style={styles.goalHeader}>

            <View style={styles.goalHeaderLeft}>

              <View
                style={[
                  styles.goalIcon,
                  styles.goalIconRunning,
                ]}
              >
                <Ionicons
                  name="walk-outline"
                  size={19}
                  color={COLORS.accentDark}
                />
              </View>

              <View>
                <Text style={styles.goalEyebrow}>
                  RUNNING
                </Text>

                <Text style={styles.goalName}>
                  10K sub 45'
                </Text>
              </View>

            </View>

            <View style={styles.arrowButton}>
              <Ionicons
                name="arrow-up-right"
                size={17}
                color={COLORS.inkDim}
              />
            </View>

          </View>

          <View style={styles.progressHeader}>

            <View>
              <Text style={styles.progressNumber}>
                72%
              </Text>

              <Text style={styles.progressLabel}>
                progreso del objetivo
              </Text>
            </View>

            <Text style={styles.daysLeft}>
              173 días
            </Text>

          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: '72%',
                  backgroundColor: COLORS.accentDark,
                },
              ]}
            />
          </View>

          <Text style={styles.goalDate}>
            15 mar 2027
          </Text>

          <View style={styles.runningStats}>

            <View style={styles.runningStat}>

              <Text style={styles.runningValue}>
                4:22
              </Text>

              <Text style={styles.runningLabel}>
                RITMO ACTUAL
              </Text>

            </View>

            <View style={styles.statDivider} />

            <View style={styles.runningStat}>

              <Text style={styles.runningValue}>
                4:03
              </Text>

              <Text style={styles.runningLabel}>
                RITMO OBJETIVO
              </Text>

            </View>

          </View>

        </TouchableOpacity>

        {/* ADD GOAL */}

        <TouchableOpacity
          style={styles.addGoal}
          activeOpacity={0.75}
        >

          <View style={styles.addIcon}>
            <Ionicons
              name="add"
              size={18}
              color={COLORS.inkDim}
            />
          </View>

          <View style={styles.addTextContainer}>
            <Text style={styles.addTitle}>
              Añadir objetivo
            </Text>

            <Text style={styles.addSubtitle}>
              Maratón, Hyrox, triatlón o cualquier reto.
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={17}
            color={COLORS.inkFaint}
          />

        </TouchableOpacity>

        <View style={{ height: 35 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ n, u }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statN}>
        {n}
      </Text>

      <Text style={styles.statU}>
        {u}
      </Text>
    </View>
  );
}

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

  /* HEADER */

  header: {
    marginBottom: 5,
  },

  eyebrow: {
    color: COLORS.inkFaint,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 4,
  },

  title: {
    color: COLORS.ink,
    fontSize: 30,
    lineHeight: 35,
    fontWeight: '600',
    letterSpacing: -0.8,
  },

  subtitle: {
    color: COLORS.inkFaint,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    maxWidth: 300,
  },

  /* FOCUS */

  focusRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 15,
    marginBottom: 18,
  },

  focusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,

    backgroundColor: COLORS.accentDark,

    marginRight: 8,
  },

  focusText: {
    color: COLORS.inkDim,
    fontSize: 12,
    fontWeight: '500',
  },

  /* GOAL */

  goalCard: {
    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.line,

    borderRadius: 19,

    padding: 19,

    marginBottom: 14,
  },

  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 21,
  },

  goalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  goalIcon: {
    width: 42,
    height: 42,

    borderRadius: 13,

    backgroundColor: '#EDF5F2',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 11,
  },

  goalIconRunning: {
    backgroundColor: '#EDF5F2',
  },

  goalEyebrow: {
    color: COLORS.inkFaint,

    fontSize: 8,
    fontWeight: '700',

    letterSpacing: 1.1,

    marginBottom: 3,
  },

  goalName: {
    color: COLORS.ink,

    fontSize: 18,
    fontWeight: '600',

    letterSpacing: -0.25,
  },

  arrowButton: {
    width: 32,
    height: 32,

    borderRadius: 16,

    backgroundColor: '#F3F5F3',

    alignItems: 'center',
    justifyContent: 'center',
  },

  /* PROGRESS */

  progressHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'flex-end',

    marginBottom: 9,
  },

  progressNumber: {
    color: COLORS.ink,

    fontSize: 23,
    fontWeight: '600',

    letterSpacing: -0.5,
  },

  progressLabel: {
    color: COLORS.inkFaint,

    fontSize: 10,

    marginTop: 1,
  },

  daysLeft: {
    color: COLORS.inkDim,

    fontSize: 11,
    fontWeight: '500',

    marginBottom: 2,
  },

  progressBackground: {
    height: 5,

    borderRadius: 3,

    backgroundColor: '#EDF0ED',

    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',

    borderRadius: 3,
  },

  goalDate: {
    color: COLORS.inkFaint,

    fontSize: 10.5,

    marginTop: 8,
  },

  /* STATS */

  statGrid: {
    flexDirection: 'row',

    marginTop: 20,
    paddingTop: 17,

    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },

  stat: {
    width: '25%',
  },

  statN: {
    color: COLORS.ink,

    fontSize: 17,
    fontWeight: '600',

    letterSpacing: -0.3,
  },

  statU: {
    color: COLORS.inkFaint,

    fontSize: 9.5,

    marginTop: 3,
  },

  /* WEEK */

  weekSection: {
    marginTop: 20,

    paddingTop: 17,

    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },

  weekSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 12,
  },

  weekTitle: {
    color: COLORS.ink,

    fontSize: 12.5,
    fontWeight: '600',
  },

  weekCount: {
    color: COLORS.accentDark,

    fontSize: 11,
    fontWeight: '600',
  },

  weekCheck: {
    gap: 9,
  },

  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mark: {
    width: 17,
    height: 17,

    borderRadius: 8.5,

    borderWidth: 1.2,
    borderColor: COLORS.lineStrong,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 9,
  },

  markDone: {
    borderColor: COLORS.accentDark,
    backgroundColor: COLORS.accentDark,
  },

  weekLabel: {
    color: COLORS.ink,

    fontSize: 12.5,
  },

  weekLabelDone: {
    color: COLORS.inkDim,
  },

  /* NOTE */

  noteBlock: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 18,

    paddingTop: 14,

    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },

  noteIcon: {
    width: 28,
    height: 28,

    borderRadius: 9,

    backgroundColor: '#FAF5E9',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 9,
  },

  noteText: {
    flex: 1,

    color: COLORS.inkDim,

    fontSize: 11.5,
    fontStyle: 'italic',
    lineHeight: 17,
  },

  /* RUNNING STATS */

  runningStats: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 19,
    paddingTop: 17,

    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },

  runningStat: {
    flex: 1,
  },

  runningValue: {
    color: COLORS.ink,

    fontSize: 22,
    fontWeight: '600',

    letterSpacing: -0.5,
  },

  runningLabel: {
    color: COLORS.inkFaint,

    fontSize: 8.5,
    fontWeight: '600',

    letterSpacing: 0.7,

    marginTop: 3,
  },

  statDivider: {
    width: 1,
    height: 30,

    backgroundColor: COLORS.line,

    marginHorizontal: 20,
  },

  /* ADD GOAL */

  addGoal: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#F0F3F0',

    borderRadius: 16,

    padding: 15,

    marginTop: 2,
  },

  addIcon: {
    width: 34,
    height: 34,

    borderRadius: 11,

    backgroundColor: COLORS.card,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 11,
  },

  addTextContainer: {
    flex: 1,
  },

  addTitle: {
    color: COLORS.ink,

    fontSize: 12.5,
    fontWeight: '600',
  },

  addSubtitle: {
    color: COLORS.inkFaint,

    fontSize: 10.5,

    marginTop: 2,
  },

});