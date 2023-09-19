import { View, Text, StyleSheet, SafeAreaView } from 'react-native'


const mystyles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 12,
      paddingHorizontal:10,
      backgroundColor: '#f4f7fc',
    },
    title: {
      color: '#1f65ff',
      textAlign: 'left',
      fontSize: 24,
      fontWeight: 'bold',
    },
    modalBackGround: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderRadius: 20,
      elevation: 20,
    },
    header: {
      width: '100%',
      height: 40,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    
  })


  export default mystyles