import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUser } from '../context/UserContext';

type FormData = {
  firstName: string;
  lastName: string;
};

export default function SetupScreen() {
  const router = useRouter();
  const { setUserData } = useUser();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [photo, setPhoto] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1] as [number, number],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setUserData({
      firstName: data.firstName,
      lastName: data.lastName,
      photo: photo,
    });
    router.replace('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Setup Account</Text>

      <TouchableOpacity onPress={pickImage}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>Tap to pick photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>First Name</Text>
      <Controller
        control={control}
        name="firstName"
        rules={{ required: 'First name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter first name"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.firstName && <Text style={styles.error}>{errors.firstName.message as string}</Text>}

      <Text style={styles.label}>Last Name</Text>
      <Controller
        control={control}
        name="lastName"
        rules={{ required: 'Last name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter last name"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.lastName && <Text style={styles.error}>{errors.lastName.message as string}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 15,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
});
