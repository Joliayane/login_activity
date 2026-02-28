import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const password = watch('password');

  const onSubmit = (data: FormData) => {
    console.log(data);
    router.push('/setup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' }
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message as string}</Text>}

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: { value: 6, message: 'At least 6 characters' }
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message as string}</Text>}

      <Text style={styles.label}>Confirm Password</Text>
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: 'Please confirm your password',
          validate: (val) => val === password || 'Passwords do not match'
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message as string}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
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
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
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
    backgroundColor: '#ff99c4',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 13,
  },
});
