import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Button, ListItem, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import socketIOClient from "socket.io-client";

// Connection au backEnd via son url (tunnel)
var socket = socketIOClient("http://192.168.0.43:3000");  



function ChatScreen(props) {

const [currentMessage,setCurrentMessage] = useState("");
const [listMessage,setListMessage] = useState([]);



  useEffect(() => { 
    // Ecoute du message venant du backEnd
    socket.on('sendMessageToAll', (newMessage)=> {
      // console.log(newMessage);
      setListMessage([...listMessage, newMessage]);
    }); 
  }, [listMessage]);


// Ajout des messages dans la liste
var displayMessage = listMessage.map((newItem,i) => {
    var str     = newItem.msg;
    var newStr  = str.replace(/\:\)/gi, "\u263A");
    newStr  = newStr.replace(/\:\(/gi, "\u2639");
    newStr  = newStr.replace(/\:p/gi, "\uD83D\uDE1B");
// Modération du texte
    newStr = NewStr.replace(/[a-z]*fuck[a-z]*/gi);

// console.log(newStr);
  return <ListItem key={i} title={newStr} subtitle={newItem.pseudo}/>
});

  return (
    <View style={{flex:1}}>
       
        <ScrollView  style={{flex:1, marginTop: 15}}>
          <ListItem title="Y'a quelqu'un ici ?" subtitle="Jean-Claude"/>
          {displayMessage}
        </ScrollView >

        <KeyboardAvoidingView behavior="padding" enabled>
            <Input
                containerStyle = {{marginBottom: 5}}
                placeholder='Your message'
                onChangeText={textMessage => setCurrentMessage(textMessage)}
                value={currentMessage}
            />
            <Button
                icon={
                    <Icon
                    name="envelope-o"
                    size={20}
                    color="#ffffff"
                    />
                } 
                title="Send"
                buttonStyle={{backgroundColor: "#eb4d4b"}}
                type="solid"
                onPress={()=>{
                  socket.emit("sendMessage", {msg: currentMessage,pseudo: props.pseudoToDisplay});
                  // Réinitialiser le champ message
                  setCurrentMessage("");
                } }
            />
        </KeyboardAvoidingView>
        
    </View>
  );
}

function mapStateToProps(state) {
  // console.log(state);
  return { pseudoToDisplay: state.pseudo }
}
  
export default connect(
  mapStateToProps, 
  null
)(ChatScreen);
