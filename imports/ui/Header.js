import React from 'react';
import {Text, View} from 'react-native';

const Header = (props)=>{
  const styles = {
    viewStyle:{
      backgroundColor: '#e6e6e6',
      justifyContent:'center',
      alignItems: 'center',
      height:60,
      shadowColor: '#676767',
      shadowOffset:{width:0, height:100},
      shadowOpacity:0.9,
      elevation:2,
      position:'relative'
    },
    textStyle :{
      fontSize:20
    }
  }

  return(
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}> {props.headerText} </Text>
        </View>
  );

};



export default Header;
