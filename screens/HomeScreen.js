import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

const DAYS = [
  { day: 'L', date: 21, type: 'run' },
  { day: 'M', date: 22, type: 'gym' },
  { day: 'X', date: 23, type: 'today' },
  { day: 'J', date: 24, type: 'run' },
  { day: 'V', date: 25, type: 'rest' },
  { day: 'S', date: 26, type: 'hyrox' },
  { day: 'D', date: 27, type: 'rest' },
];

const WEEK_TRAINING = [
  {
    date: 21,
    day: 'Lunes',
    title: 'Rodaje suave',
    subtitle: '8 km · Z2',
    type: 'RUN',
    icon: 'walk-outline',
  },
  {
    date: 22,
    day: 'Martes',
    title: 'Fuerza tren superior',
    subtitle: 'Empuje · 45 min',
    type: 'GYM',
    icon: 'barbell-outline',
  },
  {
    date: 23,
    day: 'Miércoles',
    title: 'Intervalos',
    subtitle: '6 × 800 m · 4:00/km',
    type: 'RUN',
    icon: 'speedometer-outline',
  },
  {
    date: 24,
    day: 'Jueves',
    title: 'Rodaje tempo',
    subtitle: '7 km · Z3',
    type: 'RUN',
    icon: 'walk-outline',
  },
  {
    date: 25,
    day: 'Viernes',
    title: 'Descanso',
    subtitle: 'Recuperación',
    type: 'REST',
    icon: 'moon-outline',
  },
  {
    date: 26,
    day: 'Sábado',
    title: 'Hyrox',
    subtitle: 'Sled · SkiErg · Run',
    type: 'HYROX',
    icon: 'fitness-outline',
  },
  {
    date: 27,
    day: 'Domingo',
    title: 'Descanso',
    subtitle: 'Recuperación',
    type: 'REST',
    icon: 'moon-outline',
  },
];

const PEOPLE = [
  {
    name: 'Álex',
    what: 'Preparando 10K < 45 min',
  },
  {
    name: 'María',
    what: 'Bloque de Hyrox · semana 6',
  },
  {
    name: 'Daniel',
    what: 'Ironman 70.3 · misma fecha',
  },
];

export default function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState(23);

  const selectedTraining = WEEK_TRAINING.find(
    (item) => item.date === selectedDay
  );

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
              MIÉRCOLES, 23 SEPT
            </Text>

            <Text style={styles.greeting}>
              Buenos días, Pablo
            </Text>
          </View>

          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons
              name="notifications-outline"
              size={20}
              color={COLORS.ink}
            />

            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* GOAL */}

        <TouchableOpacity style={styles.goalCard}>
          <View style={styles.goalTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.goalLabel}>
                OBJETIVO ACTUAL
              </Text>

              <Text style={styles.goalTitle}>
                HYROX Madrid
              </Text>

              <Text style={styles.goalSubtitle}>
                Preparación · semana 8
              </Text>
            </View>

            <View style={styles.goalIcon}>
              <Ionicons
                name="trophy-outline"
                size={20}
                color={COLORS.accentDark}
              />
            </View>
          </View>

          <View style={styles.goalProgressRow}>
            <Text style={styles.goalDays}>
              47 días
            </Text>

            <Text style={styles.goalProgressText}>
              68% completado
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View style={styles.progressFill} />
          </View>
        </TouchableOpacity>

        {/* TODAY */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Entrenamiento de hoy
          </Text>

          <Text style={styles.sectionMeta}>
            MIÉ 23
          </Text>
        </View>

        <TouchableOpacity style={styles.todayCard}>

          <View style={styles.todayCardTop}>

            <View style={styles.trainingIcon}>
              <Ionicons
                name="speedometer-outline"
                size={23}
                color={COLORS.accentDark}
              />
            </View>

            <View style={styles.trainingType}>
              <Text style={styles.trainingTypeText}>
                RUNNING
              </Text>

              <Text style={styles.trainingDuration}>
                52 min
              </Text>
            </View>

            <View style={styles.todayArrow}>
              <Ionicons
                name="arrow-up-right"
                size={18}
                color={COLORS.inkDim}
              />
            </View>

          </View>

          <Text style={styles.todayTitle}>
            Intervalos
          </Text>

          <Text style={styles.todayDescription}>
            10 min suave · 6 × 800 m · 2 min recuperación ·
            10 min vuelta a la calma
          </Text>

          <View style={styles.todayStats}>

            <View style={styles.stat}>
              <Text style={styles.statValue}>
                8.4
              </Text>

              <Text style={styles.statLabel}>
                KM
              </Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statValue}>
                Z4
              </Text>

              <Text style={styles.statLabel}>
                INTENSIDAD
              </Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statValue}>
                4:00
              </Text>

              <Text style={styles.statLabel}>
                RITMO
              </Text>
            </View>

          </View>

          <View style={styles.startButton}>
            <Text style={styles.startButtonText}>
              Ver entrenamiento
            </Text>

            <Ionicons
              name="arrow-forward"
              size={16}
              color="#FFFFFF"
            />
          </View>

        </TouchableOpacity>

        {/* CALENDAR */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Esta semana
          </Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>
              Ver calendario
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendar}>

          {DAYS.map((item) => {

            const isSelected =
              selectedDay === item.date;

            return (
              <TouchableOpacity
                key={item.date}
                onPress={() => setSelectedDay(item.date)}
                style={[
                  styles.day,
                  isSelected && styles.daySelected,
                ]}
              >

                <Text
                  style={[
                    styles.dayName,
                    isSelected && styles.dayNameSelected,
                  ]}
                >
                  {item.day}
                </Text>

                <Text
                  style={[
                    styles.dayNumber,
                    isSelected && styles.dayNumberSelected,
                  ]}
                >
                  {item.date}
                </Text>

                <View
                  style={[
                    styles.dayIndicator,

                    item.type === 'rest' &&
                      styles.restIndicator,

                    item.type === 'gym' &&
                      styles.gymIndicator,

                    item.type === 'hyrox' &&
                      styles.hyroxIndicator,

                    isSelected &&
                      styles.selectedIndicator,
                  ]}
                />

              </TouchableOpacity>
            );
          })}

        </View>

        {/* SELECTED DAY */}

        {selectedTraining && (
          <View style={styles.selectedDayCard}>

            <View style={styles.selectedDayHeader}>

              <View style={{ flex: 1 }}>

                <Text style={styles.selectedDayLabel}>
                  {selectedTraining.day.toUpperCase()}
                </Text>

                <Text style={styles.selectedDayTitle}>
                  {selectedTraining.title}
                </Text>

              </View>

              <View style={styles.smallIcon}>
                <Ionicons
                  name={selectedTraining.icon}
                  size={19}
                  color={COLORS.inkDim}
                />
              </View>

            </View>

            <Text style={styles.selectedDaySubtitle}>
              {selectedTraining.subtitle}
            </Text>

            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {selectedTraining.type}
              </Text>
            </View>

          </View>
        )}

        {/* WEEK PROGRESS */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Progreso semanal
          </Text>
        </View>

        <View style={styles.weekProgressCard}>

          <View style={styles.weekProgressTop}>

            <View>
              <Text style={styles.weekProgressValue}>
                3 / 5
              </Text>

              <Text style={styles.weekProgressLabel}>
                entrenamientos completados
              </Text>
            </View>

            <Text style={styles.weekPercentage}>
              60%
            </Text>

          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: '60%' },
              ]}
            />
          </View>

          <View style={styles.progressBottom}>

            <Text style={styles.progressBottomText}>
              24.6 km realizados
            </Text>

            <Text style={styles.progressBottomText}>
              16.4 km restantes
            </Text>

          </View>

        </View>

        {/* COMMUNITY */}

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Tu comunidad
          </Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>
              Ver más
            </Text>
          </TouchableOpacity>

        </View>

        {PEOPLE.map((person) => (

          <TouchableOpacity
            key={person.name}
            style={styles.person}
          >

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {person.name.charAt(0)}
              </Text>
            </View>

            <View style={styles.personInfo}>

              <Text style={styles.personName}>
                {person.name}
              </Text>

              <Text style={styles.personWhat}>
                {person.what}
              </Text>

            </View>

            <Ionicons
              name="chevron-forward"
              size={16}
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

  /* HEADER */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  eyebrow: {
    color: COLORS.inkFaint,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.15,
    marginBottom: 5,
  },

  greeting: {
    color: COLORS.ink,
    fontSize: 27,
    fontWeight: '600',
    letterSpacing: -0.8,
  },

  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.line,

    alignItems: 'center',
    justifyContent: 'center',
  },

  notificationDot: {
    position: 'absolute',

    width: 6,
    height: 6,
    borderRadius: 3,

    backgroundColor: COLORS.amber,

    top: 9,
    right: 10,
  },

  /* GOAL */

  goalCard: {
    backgroundColor: COLORS.card,

    borderRadius: 18,

    borderWidth: 1,
    borderColor: COLORS.line,

    padding: 19,

    marginBottom: 29,
  },

  goalTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  goalLabel: {
    color: COLORS.inkFaint,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 5,
  },

  goalTitle: {
    color: COLORS.ink,
    fontSize: 19,
    fontWeight: '600',
    letterSpacing: -0.3,
  },

  goalSubtitle: {
    color: COLORS.inkFaint,
    fontSize: 11,
    marginTop: 3,
  },

  goalIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,

    backgroundColor: '#EDF5F2',

    alignItems: 'center',
    justifyContent: 'center',
  },

  goalProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 21,
    marginBottom: 8,
  },

  goalDays: {
    color: COLORS.ink,
    fontSize: 12,
    fontWeight: '600',
  },

  goalProgressText: {
    color: COLORS.inkFaint,
    fontSize: 11,
  },

  progressBackground: {
    height: 5,
    borderRadius: 3,

    backgroundColor: '#EDF0ED',

    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    width: '68%',

    borderRadius: 3,

    backgroundColor: COLORS.accentDark,
  },

  /* SECTIONS */

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 11,
  },

  sectionTitle: {
    color: COLORS.ink,

    fontSize: 16,
    fontWeight: '600',

    letterSpacing: -0.25,
  },

  sectionMeta: {
    color: COLORS.inkFaint,

    fontSize: 10,

    fontFamily: fonts.mono,
  },

  viewAll: {
    color: COLORS.accentDark,

    fontSize: 11,
    fontWeight: '600',
  },

  /* TODAY */

  todayCard: {
    backgroundColor: COLORS.card,

    borderRadius: 19,

    borderWidth: 1,
    borderColor: COLORS.line,

    padding: 20,

    marginBottom: 29,
  },

  todayCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  trainingIcon: {
    width: 46,
    height: 46,

    borderRadius: 14,

    backgroundColor: '#EDF5F2',

    alignItems: 'center',
    justifyContent: 'center',
  },

  trainingType: {
    marginLeft: 12,
  },

  trainingTypeText: {
    color: COLORS.ink,

    fontSize: 10,
    fontWeight: '700',

    letterSpacing: 1.05,
  },

  trainingDuration: {
    color: COLORS.inkFaint,

    fontSize: 11,

    marginTop: 3,
  },

  todayArrow: {
    marginLeft: 'auto',

    width: 32,
    height: 32,

    borderRadius: 16,

    backgroundColor: '#F3F5F3',

    alignItems: 'center',
    justifyContent: 'center',
  },

  todayTitle: {
    color: COLORS.ink,

    fontSize: 28,
    fontWeight: '600',

    letterSpacing: -0.8,

    marginTop: 20,
  },

  todayDescription: {
    color: COLORS.inkDim,

    fontSize: 12,
    lineHeight: 19,

    marginTop: 7,
  },

  todayStats: {
    flexDirection: 'row',

    gap: 38,

    marginTop: 22,
    paddingTop: 17,

    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },

  stat: {
    minWidth: 42,
  },

  statValue: {
    color: COLORS.ink,

    fontSize: 17,
    fontWeight: '600',
  },

  statLabel: {
    color: COLORS.inkFaint,

    fontSize: 8,
    fontWeight: '600',

    letterSpacing: 0.8,

    marginTop: 3,
  },

  startButton: {
    height: 46,

    backgroundColor: COLORS.ink,

    borderRadius: 12,

    marginTop: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 8,
  },

  startButtonText: {
    color: '#FFFFFF',

    fontSize: 13,
    fontWeight: '600',
  },

  /* CALENDAR */

  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.line,

    borderRadius: 18,

    paddingVertical: 9,
    paddingHorizontal: 6,

    marginBottom: 10,
  },

  day: {
    width: 40,
    height: 68,

    borderRadius: 13,

    alignItems: 'center',
    justifyContent: 'center',
  },

  daySelected: {
    backgroundColor: COLORS.ink,
  },

  dayName: {
    color: COLORS.inkFaint,

    fontSize: 9,
    fontWeight: '600',

    marginBottom: 5,
  },

  dayNameSelected: {
    color: '#FFFFFF99',
  },

  dayNumber: {
    color: COLORS.ink,

    fontSize: 15,
    fontWeight: '600',
  },

  dayNumberSelected: {
    color: '#FFFFFF',
  },

  dayIndicator: {
    width: 4,
    height: 4,

    borderRadius: 2,

    backgroundColor: COLORS.accentDark,

    marginTop: 6,
  },

  restIndicator: {
    backgroundColor: '#D8DDDA',
  },

  gymIndicator: {
    backgroundColor: '#8EB6AA',
  },

  hyroxIndicator: {
    backgroundColor: COLORS.amber,
  },

  selectedIndicator: {
    backgroundColor: COLORS.amber,
  },

  /* SELECTED DAY */

  selectedDayCard: {
    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.line,

    borderRadius: 15,

    padding: 16,

    marginBottom: 29,
  },

  selectedDayHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectedDayLabel: {
    color: COLORS.inkFaint,

    fontSize: 9,
    fontWeight: '600',

    letterSpacing: 1,

    marginBottom: 4,
  },

  selectedDayTitle: {
    color: COLORS.ink,

    fontSize: 17,
    fontWeight: '600',
  },

  selectedDaySubtitle: {
    color: COLORS.inkDim,

    fontSize: 12,

    marginTop: 7,
  },

  smallIcon: {
    width: 36,
    height: 36,

    borderRadius: 11,

    backgroundColor: '#F3F5F3',

    alignItems: 'center',
    justifyContent: 'center',
  },

  tag: {
    alignSelf: 'flex-start',

    marginTop: 12,

    paddingHorizontal: 8,
    paddingVertical: 4,

    borderRadius: 6,

    backgroundColor: '#EDF5F2',
  },

  tagText: {
    color: COLORS.accentDark,

    fontSize: 8,
    fontWeight: '700',

    letterSpacing: 0.8,
  },

  /* WEEK PROGRESS */

  weekProgressCard: {
    backgroundColor: COLORS.card,

    borderWidth: 1,
    borderColor: COLORS.line,

    borderRadius: 18,

    padding: 18,

    marginBottom: 29,
  },

  weekProgressTop: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 15,
  },

  weekProgressValue: {
    color: COLORS.ink,

    fontSize: 25,
    fontWeight: '600',

    letterSpacing: -0.5,
  },

  weekProgressLabel: {
    color: COLORS.inkFaint,

    fontSize: 11,

    marginTop: 2,
  },

  weekPercentage: {
    color: COLORS.accentDark,

    fontSize: 19,
    fontWeight: '600',
  },

  progressBottom: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: 10,
  },

  progressBottomText: {
    color: COLORS.inkFaint,

    fontSize: 10,
  },

  /* COMMUNITY */

  person: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingVertical: 12,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },

  avatar: {
    width: 38,
    height: 38,

    borderRadius: 19,

    backgroundColor: '#E5F0EC',

    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: COLORS.accentDark,

    fontSize: 13,
    fontWeight: '600',
  },

  personInfo: {
    flex: 1,

    marginLeft: 11,
  },

  personName: {
    color: COLORS.ink,

    fontSize: 13,
    fontWeight: '600',
  },

  personWhat: {
    color: COLORS.inkFaint,

    fontSize: 11,

    marginTop: 2,
  },
});