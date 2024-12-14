import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types'; // Make sure the path is correct

const SignUpScreen = () => {
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignUp'>>(); // Specify the type

  const validatePasswordStrength = (password: string) => {
    if (password.length < 6) setPasswordStrength('Weak');
    else if (password.length < 10) setPasswordStrength('Moderate');
    else setPasswordStrength('Strong');
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
      .test('password-strength', 'Weak password', (value) => {
        validatePasswordStrength(value || '');
        return true;
      }),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSignUp = (values: any) => {
    window.alert('Sign Up Successful');
    navigation.navigate('Login'); // Navigate to Login after successful sign up
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSignUp}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <CustomInput
            label="Name"
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            error={errors.name}
          />
          <CustomInput
            label="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
          />
          <CustomInput
            label="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            secureTextEntry
          />
          <Text style={styles.passwordStrength}>Password Strength: {passwordStrength}</Text>
          <CustomInput
            label="Confirm Password"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            error={errors.confirmPassword}
            secureTextEntry
          />
          <CustomButton title="Sign Up" onPress={handleSubmit} />

          <View style={styles.switchContainer}>
            <Button
              title="Already have an account? Login"
              onPress={() => navigation.navigate('Login')} // Navigate to Login if the user already has an account
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  passwordStrength: { marginBottom: 10, fontSize: 18, color: 'blue' },
  switchContainer: { marginTop: 20, alignItems: 'center' },
});

export default SignUpScreen;
