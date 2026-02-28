import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from '../context/UserContext';

export default function HomeScreen() {
  const router = useRouter();
  const { userData } = useUser();

  return (
    <View style={styles.container}>

      {userData.photo ? (
        <Image source={{ uri: userData.photo }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarPlaceholderText}>No Photo</Text>
        </View>
      )}

      <Text style={styles.title}>
        Welcome, {userData.firstName} {userData.lastName}!
      </Text>

      <Text style={styles.subtitle}>You are now logged in.</Text>

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
    backgroundColor: '#fff',
    padding: 20,
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
    color: 'gray',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ff99c4',
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
