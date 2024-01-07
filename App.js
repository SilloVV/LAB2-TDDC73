import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,Image, View, TextInput, ScrollView,Button, TouchableOpacity} from 'react-native';
import React, { useState, useRef , useEffect }from 'react';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import DropDownPicker from 'react-native-dropdown-picker';
import FlipCard from 'react-native-flip-card';

export default function App() {

  const [number, setnumber] = useState ('#### #### #### ####');
  const [name, setname] = useState ('MOM');
    const [open1, setOpen1] = useState(false);
    const [selectedYear,setSelectedYear] = useState('YY');
    const [items1,setItems1] = useState([
      {label: '2023', value: '23'},
      {label: '2024', value: '24'},
      {label: '2025', value: '25'},
      {label: '2026', value: '26'},
      {label: '2027', value: '27'},
      {label: '2028', value: '28'},
      {label: '2029', value: '29'},
      {label: '2030', value: '30'},
    ]);

    const [open2, setOpen2] = useState(false);
    const [selectedMonth,setSelectedMonth] = useState('MM');

    const [items2,setItems2] = useState([
      {label: 'January', value: '01'},
      {label: 'February', value: '02'},
      {label: 'March', value: '03'},
      {label: 'April', value: '04'},
      {label: 'May', value: '05'},
      {label: 'June', value: '06'},
      {label: 'July', value: '07'},
      {label: 'August', value: '08'},
    ]);


   
      

    const [cvv, setcvv] = useState ('');
   
    const [isFlipped, setFlip] = useState(false);

    const [cardType,setcardType] =useState(require('./assets/images/visa.png'));

    //big function to handle the displayed number on the card  and the mask 
    const handleImageChange = (number) => {

    

      let trimmedNumber = number.replace(/[^\d]/g, ''); // to delete the letters or spaces in the input
      
      let DisplayedNumber = '';

      let mask = '#### #### #### ####';
  
  // Mask for AMEX
      if (trimmedNumber.startsWith('34') || trimmedNumber.startsWith('37')) {
        mask = '#### ###### #####'; // Masque AMEX
      }

  // to replace the mask by the numbers while keeping the spaces
  for (let i = 0, j = 0; i < mask.length; i++) {
    if (mask[i] === ' ') {
      DisplayedNumber += ' '; // here is where the spaces are added
    } else {
      DisplayedNumber += j < trimmedNumber.length ? trimmedNumber[j] : '#'; 
      if (j < trimmedNumber.length) j++;
    }
  }

  
  setnumber(DisplayedNumber);

      if (trimmedNumber.length >= 0) {
        switch (trimmedNumber[0]) {
          //visa case
          case '4':
            setcardType(require('./assets/images/visa.png'));
          
            
            break;
            //mastercard case
          case '5': 
            setcardType(require('./assets/images/mastercard.png'));
          

            break;

            //discover case
          case '6':
            setcardType(require('./assets/images/discover.png'));
            
            break;
          case'3':
            setcardType(require('./assets/images/amex.png'));
            
            break;

          default:
            setcardType(require('./assets/images/visa.png')); 
            setnumber('#### #### #### ####');
            break;

          
        }

      } 
       
    
    };
  
  
  return (
    <View style={styles.container}>
      <View style={styles.flipCardContainer}>

            <FlipCard
                flip={isFlipped}
                flipHorizontal={true}
                flipVertical={false}
                style={styles.cardImageRecto}>
              <View style={styles.containerRecto}>
                <Image source={require('./assets/images/6.jpeg')}  />
                <Image source={require('./assets/images/chip.png')} style={styles.cardChip}/>
                <Image source={cardType} style={styles.carddiscover}/>
                <Text style={styles.inputNumberONCard}> {number} </Text>
                <Text style={styles.cardHolder}> Card holder </Text>
                <Text style={styles.inputNameONCard}> {name.toUpperCase()} </Text>
                <View style={styles.expirescontainer}><Text style={styles.expires}> Expires </Text></View>
                
                <Text style={styles.dateONCard}>{selectedMonth} / {selectedYear}</Text>
                
                </View>

              <View>
                <Image source={require('./assets/images/6.jpeg')} style={styles.cardImageVerso} />
                <Image source={cardType} style={styles.carddiscoververso}/>
                <Image source={require('./assets/images/Solid_black.png')} style={styles.bandenoir}/>
                <Text style={styles.cvvVerso}> CVV </Text>
                <Image source={require('./assets/images/Solid_white.png')} style={styles.bandeblanche}/>
                <Text style={styles.cvvOnVerso}>{cvv} </Text>


                </View> 
                  
            </FlipCard>
      </View>
      
      
      <View style={styles.box}>
        <Text style ={styles.cardnumber} > Card Number </Text>
        <TextInput style = {styles.numCardInput}
            maxLength={25}
            keyboardType='numeric'
            onChangeText={handleImageChange}
        />
        <Text style ={styles.cardname} > Card Name </Text>
        <TextInput style = {styles.CardNameInput}
        onChangeText={(name) => setname(name)}
        />

      <Text style= {styles.Date}> Date of expiration</Text>

      <View>

        <DropDownPicker
                placeholder="Month"
                open={open2}
                value={selectedMonth}
                items={items2}
                setOpen={setOpen2}
                setValue={setSelectedMonth}
                setItems={setItems2}
                selectedValue={selectedMonth}
                style={styles.containerpicker1}  
                maxHeight={85}
                dropDownContainerStyle={{ width: 115, marginLeft :20, top :65 }}
                      />
        </View>
        <View style={styles.pickersContainer}> 
              
              <DropDownPicker
                placeholder="Year"
                open={open1}
                value={selectedYear}
                items={items1}
                setOpen={setOpen1}
                setValue={setSelectedYear}
                setItems={setItems1}
                selectedValue={selectedYear}
                style={styles.containerpicker2} 
                maxHeight={85}
                dropDownContainerStyle={{ width: 115, marginLeft :140, top :65 }}
                
                />
               
              </View>

        <Text style ={styles.cvv} > CVV </Text>
        
        <TextInput style = {styles.cvvinput}
              onChangeText={(cvv) => setcvv(cvv)}
              onFocus={() => setFlip(true)}
              onBlur={() => setFlip(false)}
              keyboardType='numeric'
              maxLength={number.startsWith('3') ? 4:3 }
              
              />  

        <TouchableOpacity style= {styles.submitcontainer}>
          <Text style={styles.submit}> Submit</Text>
        </TouchableOpacity>
        
                 
        
            
                        
      </View>
      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0ffff',


  },
  
  box : {
    backgroundColor: '#fffaf0',
    width : 330,
    height: 500,
    marginTop: 190,
    marginLeft : 40,
    borderRadius : 20,
    position : 'absolute',
    zIndex:1,
  },
  cardnumber: {
    marginTop : 140,
    marginLeft : 10,
    

  },
  numCardInput : {
    backgroundColor: '#fffaf0',
    borderWidth : 1,
    borderColor : '#dcdcdc',
    width : 270,
    height: 34,
    marginLeft: 20,
    marginTop : 10,
    borderRadius : 7,
   
  },

  cardname : {

    marginTop : 25,
    marginLeft : 10,
    
  },

  CardNameInput : {
    backgroundColor: '#fffaf0',
    borderWidth : 1,
    borderColor : '#dcdcdc',
    width : 270,
    height: 36,
   
    marginLeft: 20,
    marginTop : 15,
    borderRadius : 7,
  },
  
  Date : {
    marginTop : 15,
    marginLeft : 10,
    
  },

  containerpicker1 : {
      height: 40, 
      width: 115 ,
      flex:1,
      marginTop : -12,
      marginLeft:20,
      top:25 ,
      backgroundColor : '#fffaf0',
      borderColor : '#dcdcdc',

     },

    containerpicker2 : {
      height: 40,
      width: 115 ,
      flex:1,
      marginTop : -4,
      marginLeft:140,
      top:17,
      backgroundColor : '#fffaf0',
      borderColor : '#dcdcdc',
      },

      flipCardContainer:{
        zIndex:2,
        transform: [{ scale: 0.55 }],
        marginLeft : -115,
        Top : 100,
        
        

        
      },

      containerRecto: {
        zIndex:2,
        
        
       
      },

    cardImageRecto : {

      
       top:100,
       left:30,
      borderRadius : 10,
      
       zIndex:2,
      },

      cardChip : {
        height:60,
        width:70,
        top:-400,
        left:45,
        borderRadius:14,
        zIndex:3,

      },

      carddiscover : {
        height:150,
        width:245,
        top:5,
        left:470,
        transform: [{ scale: 0.55 }],
        position: 'absolute',
        borderRadius:14,
        zIndex:3,
        resizeMode: 'contain', 
      },

      inputNumberONCard : {
        borderWidth : 2,
        borderColor : '#f8f8ff',
        color : '#f8f8ff',
        width : 450,
        height: 70,
        
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 50,
        marginTop : -320,
        paddingTop:19,
        paddingLeft:10,
        borderRadius : 7,
        zIndex:3,
      },

      cardHolder : {
        
        position : 'absolute',
        paddingTop : 270,
        
        marginLeft : 50,
        fontSize : 20,
        color : '#dcdcdc',
        
        zIndex:3,
      },

      inputNameONCard : {
        borderWidth : 2,
        borderColor : '#f8f8ff',
        color : '#f8f8ff',
        width : 300,
        height: 70,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 50,
        marginTop :70,
        paddingTop : 19,
        paddingLeft : 10,
        borderRadius : 7,
        zIndex:3,
      },

      expirescontainer : {
        width : 100,
        height:35,
        position : 'absolute',
        marginTop : 270,
        marginLeft : 490,
        zIndex : 2,
        
      },

      expires: {
        
        color : '#dcdcdc',
        fontSize : 20,
        zIndex:2,
      },

      dateONCard : {
        borderWidth : 2,
        borderColor : '#f8f8ff',
        color : '#f8f8ff',
        width : 100,
        height: 70,
        fontSize: 20,
        paddingTop : 25,
        paddingLeft : 12,
        marginLeft: 490,
        marginTop : -70,
        borderRadius : 7,
        zIndex:3,
      },

      cvv: {
          position : 'absolute',
          marginTop : 320,
          marginLeft : 280,
      },


      cvvinput : {
        height: 50,
        width: 55 ,
        flex:1,
        marginTop : 345,
        marginLeft:270,

        position : 'absolute',
        backgroundColor : '#fffaf0',
        borderColor : '#dcdcdc',
        paddingLeft:10,
        borderWidth : 1,
        borderRadius : 7,
      },

      carddiscoververso : {
        transform: [{ scale: 0.70 }],
        height:155,
        width:195,
        top:290,
        left:445,
        opacity : 0.5,
        position: 'absolute',
        borderRadius:14,
        zIndex:3,
        resizeMode: 'contain', 
      },

      bandenoir : {
        height:70,
        width:675,
        top:70,
        left:0,
        position: 'absolute',
        
        zIndex:3,
      },

      bandeblanche :{
        height:70,
        width:675,
        top:220,
        left:0,
        position: 'absolute',
        
        zIndex:3,
      },

      cvvVerso : {
        fontSize : 25,
        top:175,
        left:580,
       
        position: 'absolute',
        color : '#dcdcdc',
        zIndex:3,
      },

      cvvOnVerso: {
        fontSize : 25,
        top:235,
        left:580,
        position: 'absolute',
        color : '#000000',
        zIndex:3,
      },

      submitcontainer : {
        height :50,
        width : 220,
        borderRadius : 7,
        backgroundColor : '#6495ed',
        position : 'absolute',
        top : 430,
        left : 55,


      },

      submit : {
        fontSize : 25,
        color : '#ffffff',
        paddingTop : 5,
        paddingLeft : 60,
      },

    }
)
  
  
