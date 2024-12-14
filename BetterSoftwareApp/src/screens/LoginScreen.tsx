import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, Switch, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../../types';

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadRememberedEmail = async () => {
      const savedEmail = await AsyncStorage.getItem('rememberedEmail');
      if (savedEmail) setRememberMe(true);
    };
    loadRememberedEmail();
  }, []);

  const handleLogin = async (values: any) => {
    if (rememberMe) await AsyncStorage.setItem('rememberedEmail', values.email);
    else await AsyncStorage.removeItem('rememberedEmail');
    // Display success message
    window.alert('Login Successful!');
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
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
          <View style={styles.rememberMeContainer}>
            <Text style={styles.rememberMeText}>Remember Me</Text>
            <Switch
              value={rememberMe}
              onValueChange={(value) => setRememberMe(value)}
            />
          </View>
          <CustomButton title="Login" onPress={handleSubmit} />
          <View style={styles.switchContainer}>
              <Button
                  title="Don't have an account? SignUp"
                  onPress={() => navigation.navigate('SignUp')} 
              />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  rememberMeContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  rememberMeText: { fontSize: 16, marginRight: 10 },
  switchContainer: { marginTop: 20, alignItems: 'center' },
});

export default LoginScreen;
