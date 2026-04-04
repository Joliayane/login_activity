import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { useTheme } from '../context/ThemeContext';

WebBrowser.maybeCompleteAuthSession();

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const password = watch('password');

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => router.push('/setup'))
        .catch((error) => Alert.alert('Google Sign Up Failed', error.message));
    }
  }, [response]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push('/setup');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
        <Text style={{ color: theme.text }}>{isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>Register</Text>

      <Text style={[styles.label, { color: theme.text }]}>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' }
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { borderColor: theme.inputBorder, backgroundColor: theme.inputBackground, color: theme.text }]}
            placeholder="Enter your email"
            placeholderTextColor={theme.subText}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message as string}</Text>}

      <Text style={[styles.label, { color: theme.text }]}>Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: { value: 6, message: 'At least 6 characters' }
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { borderColor: theme.inputBorder, backgroundColor: theme.inputBackground, color: theme.text }]}
            placeholder="Enter your password"
            placeholderTextColor={theme.subText}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message as string}</Text>}

      <Text style={[styles.label, { color: theme.text }]}>Confirm Password</Text>
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: 'Please confirm your password',
          validate: (val) => val === password || 'Passwords do not match'
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { borderColor: theme.inputBorder, backgroundColor: theme.inputBackground, color: theme.text }]}
            placeholder="Confirm your password"
            placeholderTextColor={theme.subText}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message as string}</Text>}

      <TouchableOpacity style={[styles.button, { backgroundColor: '#ffb6c1' }]} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={[styles.orText, { color: theme.subText }]}>- OR -</Text>

    <TouchableOpacity
  style={styles.googleButton}
  onPress={() => promptAsync()}
  disabled={!request}
>
  <AntDesign name="google" size={20} color="red" />
  <Text style={styles.googleButtonText}>Sign in with Google</Text>
</TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={[styles.linkText, { color: theme.linkColor }]}>Already have an account? Login</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    fontSize: 14,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  button: {
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 13,
  },
googleButton: {
  borderWidth: 1,
  borderColor: '#ccc',
  padding: 12,
  borderRadius: 5,
  marginBottom: 15,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
},
  googleButtonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    fontSize: 13,
  },
});