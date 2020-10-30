import React, {useState, useEffect} from 'react';
import { AsyncStorage, StyleSheet, ImageBackground, Text, View } from 'react-native';

import {Button, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';

function HomeScreen({ navigation, onSubmitPseudo }) {

    const [pseudo, setPseudo] = useState('');
    const [updateDisplayUser, setUpdateDisplayUser] = useState('');
    
    useEffect(() => {
    
        AsyncStorage.getItem("userPseudo",
        function(err, userData) { 
          // console.log(userData)
          setUpdateDisplayUser(userData);
    
        } 
      )
    }, []
  )
    var displayUserPseudo;

    if (!updateDisplayUser) {
      displayUserPseudo = <Input
      containerStyle = {{marginBottom: 25, width: '70%'}}
      inputStyle={{marginLeft: 10}}
      placeholder='John'
      leftIcon={
          <Icon
          name='user'
          size={24}
          color="#eb4d4b"
          />
      }
      onChangeText={(val) => setPseudo(val)}
  />
    }
     else {
      displayUserPseudo = <View>
        <Text style={{marginBottom: 30, color: "white", fontWeight:"bold"}}> WELCOME BACK {updateDisplayUser}</Text>
        </View>;
     }
      return (
      <ImageBackground source={require('../assets/map-unsplash.png')} style={styles.container}>

          {displayUserPseudo}

          <Button
              icon={
                  <Icon
                  name="arrow-right"
                  size={20}
                  color="#eb4d4b"
                  />
              }

              title="Go to Map"
              type="solid"
              onPress={() => {onSubmitPseudo(pseudo); AsyncStorage.setItem("userPseudo", pseudo); navigation.navigate('Map')}}
              
          />
          <Button title="Clear" type="outline" style={{marginTop: 50}}  onPress={() => { AsyncStorage.clear()}}/>
          

        </ImageBackground>
        );
    }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


function mapDispatchToProps(dispatch) {
    return {
      onSubmitPseudo: function(pseudo) { 
        
        dispatch( {type: 'savePseudo', pseudoData: pseudo }) 
      }
    }
  }
  
  export default connect(
      null, 
      mapDispatchToProps
  )(HomeScreen);