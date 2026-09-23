import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!email.trim() || !password) {
      Alert.alert('Faltan datos', 'Introduce email y contraseña.');
      return;
    }
    if (mode === 'register' && (!name.trim() || !username.trim())) {
      Alert.alert('Faltan datos', 'Introduce nombre y username.');
      return;
    }

    try {
      setBusy(true);
      if (mode === 'login') {
        await login(email.trim(), password);
      } else {
        await register({ name: name.trim(), username: username.trim(), email: email.trim(), password });
      }
    } catch (error) {
      Alert.alert('No se ha podido continuar', error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.eyebrow}>ASCENT</Text>
          <Text style={styles.title}>{mode === 'login' ? 'Bienvenido de nuevo' : 'Empieza tu recorrido'}</Text>
          <Text style={styles.subtitle}>
            {mode === 'login' ? 'Entra para continuar con tu entrenamiento.' : 'Crea tu perfil y empieza a construir tu camino.'}
          </Text>

          {mode === 'register' && (
            <>
              <TextInput style={styles.input} placeholder="Nombre" placeholderTextColor="#969D98" value={name} onChangeText={setName} />
              <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#969D98" autoCapitalize="none" value={username} onChangeText={setUsername} />
            </>
          )}

          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#969D98" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="#969D98" secureTextEntry value={password} onChangeText={setPassword} />

          <TouchableOpacity style={styles.primary} onPress={submit} disabled={busy}>
            <Text style={styles.primaryText}>{busy ? 'Cargando…' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.switch} onPress={() => setMode(mode === 'login' ? 'register' : 'login')}>
            <Text style={styles.switchText}>
              {mode === 'login' ? '¿Todavía no tienes cuenta? Crear cuenta' : 'Ya tengo una cuenta · Entrar'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: '#F7F8F6' },
  content: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  eyebrow: { color: '#969D98', fontSize: 10, fontWeight: '700', letterSpacing: 2, marginBottom: 8 },
  title: { color: '#171918', fontSize: 34, lineHeight: 39, fontWeight: '600', letterSpacing: -0.8 },
  subtitle: { color: '#69706B', fontSize: 13, lineHeight: 19, marginTop: 8, marginBottom: 28 },
  input: { height: 50, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E7EAE7', borderRadius: 14, paddingHorizontal: 15, color: '#171918', fontSize: 13, marginBottom: 10 },
  primary: { height: 50, borderRadius: 14, backgroundColor: '#171918', alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  primaryText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  switch: { alignItems: 'center', paddingVertical: 18 },
  switchText: { color: '#46766A', fontSize: 11.5, fontWeight: '600' },
});
