/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const DEVICE = Dimensions.get('window');

const Login = ({login}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <StatusBar backgroundColor="red" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <View style={styles.top}>
          <Image style={styles.image} source={require('../images/logo.jpg')} />
        </View>
        <View style={styles.bottom}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          />
          {/* <TouchableOpacity onPress={() => login()} style={styles.button}>
            <Text style={styles.textButton}>LOGIN</Text>
          </TouchableOpacity> */}
          <TouchableWithoutFeedback
            onPress={() => {
              setIsLoading(true);
              setTimeout(() => {
                login();
              }, 1200);
            }}>
            <View style={styles.button}>
              {isLoading ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <Text style={styles.textButton}>LOGIN</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.container2}>
            <TouchableOpacity>
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.text}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE.height,
    width: DEVICE.width,
  },
  top: {
    height: DEVICE.height / 1.85,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BA1414',
    // position: 'absolute',
  },
  image: {
    width: DEVICE.width / 2,
    height: DEVICE.width / 2,
    borderRadius: 5,
  },
  bottom: {
    height: DEVICE.height / 2,
    width: DEVICE.width,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  input: {
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    width: DEVICE.width / 1.2,
    height: DEVICE.height / 12,
    padding: 10,
    paddingLeft: 25,
    margin: 10,
    color: '#BA1414',
    fontWeight: 'bold',
  },
  button: {
    width: DEVICE.width / 1.2,
    height: DEVICE.height / 10,
    backgroundColor: '#BA1414',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  textButton: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  container2: {
    width: DEVICE.width / 1.2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    paddingHorizontal: 5,
  },
  text: {
    color: '#BA1414',
    fontSize: 13,
    textDecorationLine: 'underline',
    textDecorationStyle: 'dashed',
    textDecorationColor: '#BA1414',
  },
});

export default Login;
