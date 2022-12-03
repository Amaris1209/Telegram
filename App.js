import { ScrollView,FlatList, StyleSheet, Text, View, Image,TextInput, TouchableOpacity, Platform, PermissionsAndroid} from 'react-native'
import React, { useState } from 'react'
import back from './Images/back.png'
import verified from './Images/verified.png'
import logosent from './Images/messagesend.png'
import mike from './Images/mike.png'
import clipper from './Images/clipper.png'
import smiley from './Images/smiley.jpg'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';





const App = () => {

  const [filePath,setFilepath]= useState([]);

  const requestExternalPermission = async ()=>{
    if (Platform.OS === 'android'){
      try{
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title : 'External Storage write permission',
            message : 'App Needs write Permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      catch(err){
        console.warn(err);
        alert('Write Permission err',err)
      }
      return false;
    } else return true;
  };

  

  const openPicker = async () => {
    let isStoragePermitted = await requestExternalPermission();
      if(isStoragePermitted){
    try {
      const response = await MultipleImagePicker.openPicker({
        mediaType:'image'
      });

      console.log('response: ', response);
      setFilepath(response);
      if(response.didCancel){
                alert('User Cancelled camera Picker')
                return;
              } else if (response.errorCode == 'camera_unavailable'){
                alert('Camera not available');
                return;
              } else if (response.errorCode == 'permission'){
                alert('Permission not satisfied');
                return;
              } else if (response.errorCode == 'others'){
                alert(response.errorMessage);
                return;
              }

    } catch (e) {
      console.log(e.code, e.message);
    }


  }}

console.log('here&there',filePath)

  const [stats, setStats] = useState([
    {
      uri: 'https://www.iconsdb.com/icons/preview/white/document-xxl.png',
      title: "Files",

    },
    {
      uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcAqAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABwgBBQYEAwL/xAA/EAABAwICBQoCCAQHAAAAAAABAAIDBAUGEQcSITFBExQiUVJhcYGRoWKxFyMyQnKTwdEVM5KyFiU0Q2OC4f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCDURZQYRFnig9tmtNbe7jFQW2F01RIdgG5o4kngB1qcMLaKbPa4mS3houNYRm4P/lNPc3j5r26KsLR4fw/HUzxAXGtaJJXEbWNO1rP18V2qD4U1FSUkYjpaWGFgGQbHGGgDyXmuVitN0YWXG3UtQ3/AJIhmPA7wtgiCHMbaJeRhkrcLl7w0Fz6J7s3ZfAd58Cokc0tcWuBDgciDwVvlCOmvCsdDWx36hi1Yat2pUho2Nk4O7s9vn4oIuRYRAWV7bRaLheaoU1so5amY8I25hveTuA7ypBtuhi8Tx61wr6WjPYaDKR47ggjFFK9RoSrGxk017glfwa+AsB88yuHxJg2+YbJNyonchwqIunH/UN3nkg59ZWEQZRYRBlYREBERAWww9Rivv1vpHjNs1Sxjh1guGfstethh6sFBfbfVuIDYahj3E9QcM/ZBbDIDYBkBsCJmDtG47iiAiIgLl9JtGytwNdWPG2KLlm+LSCuoXL6TaxlFgW7PedskQiaO9xA/VBWhbrCGHKrFF6it9L0WnpTS5ZiNnE/+LSjep90J2aOhwsbi5n19fISSRt1Gkho+Z80HX4esNuw9b20VsgbGwDpvy6ch63HitmiIC/E0Uc8L4Z42SRPGTmPbrBw6iF+0QQJpUwGzD0wulqa7+GzPyfHv5B54fhPD0UdK2d6tsF4tNXbqpucVRGWHuPA+RyKqjUwPpqiWnlGUkTyxw7wcig+SIiAiIgIiICyFhEFitFWKWYgw/HSzyf5jRNEcrSdr2j7L/kD3hdsqm2a7VtkuEVfbZ3Q1EZ2EbiOII4juU4YV0rWa6RMhvBFtrNxLznE49Ydw8CgkJF56euo6lgkp6qCVh2hzJGuHsV57jfbTbIzJX3KlgaO3KM/Teg2ChLTVimOvrIrFQyh8NK7XqXNOx0nBufdt8z3L1Y30tCeCShwwHtDwQ+teNV2XwDh4lRI9xe4ucSSTmSTtJQYVn9H+X+CLJq7uaMVYAp+0K3llfhXmDpM6igeWlpO3UcSWn5jyQSCiIgIiIMjeqsYz5MYsu/I5anO5MsvxbVZq83KG0WqquFUcoqeMvPf1DzOxVQqZ31VRLUSnOSV5e89ZJzKD5IiICIiAiIgIvtSUs9bUx01JE+aeQ6rI2DMuPgpewjofjEbKnFEhc8jPmcLsgPxOH6eqCIKeCapkEVPFJLIdzI2lxPkFvqXA+KKtmtBZKvL426nzyVkbZabfaYRDbaKCmjHCJgHqd5817EFbfo3xgwB7bPKD1NlZn/cvBW4MxLRNLqmy1jQN5bHr/LNWhWUFQZWPikcyVrmPaci1wyIX4Vr7vYbTeojHdLfT1AI2OczpDwdvUXYs0PmNj6nDM7n5beZznb/ANXfofVBEK3uDcSVOF71FcKfpM+xPFnskYd48epairpZ6Ookp6uF8M0ZyfHI0gtPgvigtfYL3QYgtzK62TiSJ32h95h6nDgVsVU+z3m42SqFVaquWmm3EsOxw6iNx81IVt003OJgZcrbTVJG98bjGfTaEE3L8ySMijdJK9rI2jNznHIAeKh2r02TFmVHZY2v65ZiQPIBcNibG18xL9XcKotps8xTwjUj8xx80HS6VMeMv8v8JtLybbC/N8o/33jq+EcOs7VG6ysICIiAiIgL70dJPW1UNLSROlnmeGRsbvcSviFNWhTCbaekOIq2POaYFtIHfdZnkXeJI2d3ig6XR7gemwrQtlmaya6TNzmmA+xn9xvd38V2CIgIiICIiAuBx3pLosPOfQ2wMrLkNjtv1cJ+Ijee5a/Stj42lr7JZpcq5zcqiZp/ktI+yPiPsokw7Ybhia6No7fGXyOOtJI7cwcXOKD5Xe6XHENzNVXyOqaqTJo1W8OAAC6ywaKMQXRrZaxsduhduM+1/wDSNvrkpawdga04Wha6GMVFcR06uRvS7w3shdQgjG36GLPExpr7hV1L8tvJgRt/U+62jNE2E2jbT1Lu81Dl3SII+qdD+GJWEQuroXHcWzB2XqFzd20KTt1n2i7Mk7MVTHqn+obPZTKiCq9/wvecPvyutBJCwnJso6THeDhsWoyyVu6iCGphfBUxMlheMnRvaC1w7wolx3ooZqSV+F2kEdJ9CTsP4D+hQQ6i/T2Oje5j2lrmnItcMiD1L8oCIiDcYTsr7/iGitjM9WaQco4fdYNrj6BWlp4Y6aCOCFoZHGwMY0cABsUR6BrMM7hepAcwObReznH+0eql9AREQEREBc5j7EzMLYelrBkaqT6qmYeLzx8BvXSKu2lrERveKJIIX50lBnCwA5guH2neuzyQctS09dfLsyCLXqKyrlyzJ2uceJVk8F4YpcK2eOjhyfO4B1RNltkfx8hwXB6D8MhkEuIauPpyZxUuY3N+87zOzyKlpAREQEREBERAQbERBGmlTADLvDLebPEG3CNutPE0f6hoG8fEPdQWRlvVv1BWmLB4tVxF6oI8qOseeWa0bI5Ttz7g755oI0REQWa0bW0WvBVrh1dWSSLlpOvWft+WS6ZV+i0uYmiiZGxtAGMaGtHIHYB5r9fS/ijqoPyD+6Cf0UAfS/ijqoPyD+6fS/ijqoPyD+6Cf0UAfS/ijqoPyD+6fS/ijqoPyD+6CZcZ3gWHDFfcc+nHHlEOt7ui33KrLbKOa6XKnooc3TVMrWA79pO9b/E2Pr5iW3tobi6nbAHh5EMeqSRuz2lbnQjaee4rkrntBZQQl4z7bui321vRBOdroYbZbqagpm6sNPGI2jwC9KIgIiICIiAiIgIiIC8N9tVPe7RU22sZrQ1DNU/Cd4I7wcivciCpd3t09pudVb6sZTU8hY7vy4+e9ZUm6drByVTSX6BuTZQKecAfeGZa7zGzyCIIlREQEREBERAU56DqeCkw1VVb3DlampIzyOeq0AAepKyiCRudQdv2Kc6g7fsURA51B2/YpzqDt+xREDnUHb9inOoO37FEQOdQdv2Kc6g7fsURA51B2/YpzqDt+xREDnUHb9inOoO37FEQaTGlFT33C9wt5eNd8RdESDkHt2t9x7oiIP/Z',
      title: "Contacts",

    },
    {
      uri: "https://www.iconsdb.com/icons/preview/white/bank-cards-xxl.png",
      title: "Payments",

    },
    {
      uri: "http://clipart-library.com/img/1818891.png",
      title: "Snaps",

    },
  ])

  


  const [messages, setMessages] = useState([
    {
      name: "url",
      text: "Gallery",
      date: '10/7/2002'

    },
    {
      name: "url",
      text: "Gallery",
      date: '10/7/2002'

    },
    {
      name: "url",
      text: "Gallery",
      date: '10/7/2002'

    },
    {
      name: "url",
      text: "Gallery",
      date: '10/7/2002'

    },
    {
      name: "url",
      text: "Gallery",
      date: '10/7/2002'

    },
  ])
  const [inboxtext, setInboxtext] = useState([
    {
      text: "Hello , how are you ?",
      time: '22:00'

    },
    {
      text: "Bitte Accept my job Application ",
      time: '12:00'

    },
    {
      text: "I hope i satisfied you ",
      time: '10:00'

    },
    {
      text: "I tried my best in this little time",
      time: '07:00'

    },
    
  ])


  const renderItem = ({ item, index }) => {
    return (
      <ScrollView scrollEnabled={true} style={{display:'flex',flexDirection:'column',paddingLeft:wp('15%')}}>
        <TouchableOpacity
          onPress={() => onDelete(item)}
          activeOpacity={0.9}
          style={styles.buttonDelete}
        >
          <Text style={styles.titleDelete}>X</Text>
        </TouchableOpacity>
        <Image
          source={{
            uri:
              item?.type === 'video'
                ? item?.thumbnail ?? ''
                : 'file://' + (item?.crop?.cropPath ?? item.path),
          }}
          style={{backgroundColor:'#1E1E1E',width:250,height:150,border:"solid",borderRadius:15}}
        />
        
      </ScrollView>
    );
  };
  const onDelete = (value) => {
    const data = filePath.filter(
      (item) =>
        item?.localIdentifier &&
        item?.localIdentifier !== value?.localIdentifier
    );
    setFilepath(data);
  };


  return (
    // <ScrollView>
      <View style={styles.maincontainer}>

        <View style={styles.headercontainer} >
          <View style={styles.backbutton}>
          <TouchableOpacity style={styles.backbutton}><Image style={styles.backimg} source={back} />
            <Text style={styles.headertext2} >Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headertitle}>
            <Text style={styles.headertext}>Telegram</Text>
            <Image source={verified} style={styles.verificaion} />
          </View>
          <TouchableOpacity>
          <Image source={logosent} style={styles.contacts} />
           </TouchableOpacity>
        </View>

        {/* Messages Area  */}

        {/* {messages.map((messages,index)=>{
          return(
            <>
      <View style={styles.messagecontainer}>
         <Image style={styles.messagesender} source={logosent} /> 
          <View style={styles.messcontent}>
            <Text style={styles.contentext}>{messages.name}</Text>
            <Text style={styles.contentext2}>{messages.text}</Text>

            </View> 
            </View>
      
            </>
          )
        })}
       */}
        {/* Messages inp Area  */}
        <>
          <ScrollView scrollEnabled={true} 
          
          style={styles.scrollmsg}>
        {inboxtext.map((text, index) => {
          return (

            <>
              <View style={styles.inboxholder}>
                <Image source={logosent} style={styles.sendersimg} />
                <View style={styles.tel_inbox}>
                  <Text style={styles.sendermsg} >
                    {text.text} </Text>
                  <Text style={styles.sendermsg2}>
                    {text.time}
                  </Text>
                </View>
              </View>
            </>
          )

        })}
     
        
</ScrollView>

</>
<FlatList
        style={styles.newList}        
        data={filePath}
        keyExtractor={(item, index) => (item?.filename ?? item?.path) + index}
        renderItem={renderItem}

/>

        {/* INPUT OF NATIVE */}

        <View style={styles.input_holder}>
       <TouchableOpacity
       
       >
        <Image  source={smiley} style={styles.input_contacts}/>
        </TouchableOpacity>
{/* contacts */}
       {/* <TouchableOpacity>
        <Image  source={logosent} style={styles.input_holder_location} />
        </TouchableOpacity> */}
{/* gallery */}

        <TextInput
        style={styles.input_native}
        
        placeholder="Message"
        placeholderTextColor="gray"

        multiline={true}
      />
      <TouchableOpacity   onPress={()=>openPicker('photo')}
>
  <Image source={clipper}
  activeOpacity={0.5}
  style={styles.input_holder_gallery} />
  </TouchableOpacity>
      <TouchableOpacity><Image source={mike} style={styles.input_contacts2} /></TouchableOpacity>

        </View>

        <View style={styles.bottomNav}>
          <View style={styles.bottomSelection}>
            {stats.map((stat, index) => {
              return (
                <>
                <View style={styles.nav_holder}> 
                  <Image style={styles.bottom_logo} 
                 source={{uri:stat.uri}}

                  />
                  <Text style={styles.logo_title}>{stat.title}</Text>
                  </View>
                </>
              )
            })}
          </View>
        </View>
        

      </View>
    // </ScrollView>

  )
}

export default App


const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: 'white',
    height: hp('100%'),
    //paddingTop:15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'

  },
  headercontainer: {
    height: 50,
    width: wp("100%"),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor:'white',
    backgroundColor:'#1E1E1E',
    // marginTop: 5,
    border: 'solid',
    borderBottomColor: 'black',




  },
  inboxholder: {

    height: 70,
    width: wp("100%"),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid',
    borderRadius: 15,
    marginTop: 5,


  },
  sendermsg: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    paddingLeft: 5,
    height: 'auto',
    width: 'auto'
  },
  sendermsg2: {
    color: 'gray',
    fontSize: 12,
    paddingRight: 15,
    paddingTop: 25
  }
  ,
  scrollmsg:{
    height:hp('25%'),
    // width:wp('100%'),
    backgroundColor:'black',

  }
  ,
  sendersimg: {
    width: 25,
    height: 25,
    marginTop: 15
  },
  tel_inbox: {
    backgroundColor: 'rgb(40,40,40)',
    width: ("85%"),
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: 'solid',
    borderRadius: 20,
    paddingLeft: 7,
    marginLeft: 5,


  },
  backbutton: {
    height: 5,
    width: wp("20%"),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'


  },
  backimg: {
    height: 30,
    width: 30
  },
  headertitle: {
    height: 50,
    width: wp("30%"),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',



  },
  headertext: {
    // backgroundColor:'green',
    fontSize: 18,
    color: 'white',
    fontWeight: '700',


  },
  headertext2: {
    // backgroundColor:'green',
    fontSize: 15,
    color: '#3B65F5',
    fontWeight: '700',
    height: 30,
    paddingTop: 5,



  },
  verificaion: {
    height: 15,
    width: 15
  },
  contacts: {
    height: 40,
    width: 40,
    // backgroundColor: '#1D181E',
    marginRight: 10,
  },
  messagecontainer: {
    height: 70,
    width: wp("100%"),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    border: 'solid',
    borderRadius: 15,
    marginTop: 5

  },
  messagesender: {
    width: 50,
    height: 50,
  },
  messcontent: {

    // backgroundColor:'pink',
    width: ("85%"),
    height: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    border: 'solid',
    borderRadius: 15,
    paddingLeft: 7,



  },
  contentext: {
    fontSize: 18,
    fontWeight: '700',

  },
  contentext2: {
    fontSize: 16,
    fontWeight: '500',

  },
  input_holder:{
    // backgroundColor:'white',
    backgroundColor:'#1E1E1E',
    width:wp('100%'),
    height:50,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    // border:'solid',
    // borderRadius:15,
    position:'absolute',
    bottom:88,
    // backgroundColor:'gray'
  },
  input_contacts:{
    width:25,
    height:25,
    marginLeft:14
  },
  input_contacts2:{
    width:25,
    height:25,
    marginRight:10
  },
  input_holder_gallery:{
    width:25,
    height:25
  },
  input_holder_location:{
    width:30,
    height:30
  },
  input_native:{
    width:('60%'),
    height:('100%'),
    // border:'solid',
    // borderColor:'lightgray',
    // borderWidth:1,
    // borderRadius:15,
    paddingLeft:10,
    color:'white'
  },
  bottomNav: {
    // backgroundColor:'white',
    width:wp('100%'),
    height:48,
    position:'absolute',
    bottom:40
  },
  bottomSelection: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    height:('110%'),
  },
  nav_holder:{
    width:('25%'),
    height:('100%'),
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    border:'solid',
    // borderColor:'lightgray',
    borderTopColor:'lightgray',
    borderWidth:0.5,
    backgroundColor:'#1E1E1E',
    paddingTop:5
  },

  bottom_logo: {
    height:20,
    width:20,
    
  },
  logo_title: {
    color:'white',
    fontSize:10
  },
  buttonDelete:{
    width:7,
    height:7
  },
  titleDelete:{
    width:20,
    height:20,
    color:'black',
    backgroundColor:'white',
    marginLeft:wp('70%'),
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    border:'solid',
    borderRadius:15,
    paddingLeft:5
  }
  ,
  newList:{
    backgroundColor:'black',
    width:wp('100%'),
    height:hp('20%'),
    marginBottom:138
    

  }


})