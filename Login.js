import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { width } = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();
  const [isNewUser, setIsNewUser] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short').required('Required'),
  });

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    const action = isNewUser
      ? createUserWithEmailAndPassword
      : signInWithEmailAndPassword;

    action(auth, values.email, values.password)
      .then(() => {
        if (!isNewUser) navigation.replace('AppTabs');
        setIsNewUser(false);
      })
      .catch((err) => setErrors({ form: err.message }))
      .finally(() => setSubmitting(false));
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange('email')}
            value={values.email}
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            value={values.password}
          />
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
          {errors.form && <Text style={styles.error}>{errors.form}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
            <Text style={styles.buttonText}>{isNewUser ? 'Register' : 'Login'}</Text>
          </TouchableOpacity>

          <Text style={styles.toggleText} onPress={() => setIsNewUser(!isNewUser)}>
            {isNewUser ? 'Already have an account? Login' : "Don't have an account? Register"}
          </Text>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  error: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  button: {
    backgroundColor: '#000',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  toggleText: {
    color: '#007BFF',
    fontSize: 16,
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

export default Login;
