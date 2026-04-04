import { Redirect, useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

export default function Index() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();
  const { userData } = useUser();
  const { theme, isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });
    return unsub;
  }, []);

  if (loggedIn === null) return null;
  if (!loggedIn) return <Redirect href="/login" />;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
        <Text style={{ color: theme.text }}>{isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}</Text>
      </TouchableOpacity>

      {userData.photo ? (
        <Image source={{ uri: userData.photo }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarPlaceholderText}>No Photo</Text>
        </View>
      )}

      <Text style={[styles.title, { color: theme.text }]}>
        Welcome, {userData.firstName} {userData.lastName}!
      </Text>

      <Text style={[styles.subtitle, { color: theme.subText }]}>You are now logged in.</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/login')}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarPlaceholderText: {
    color: '#888',
    fontSize: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ffb6c1',
    padding: 12,
    borderRadius: 5,
    width: 150,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
