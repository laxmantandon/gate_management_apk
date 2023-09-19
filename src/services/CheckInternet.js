import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

const CheckInternet = () => {
    const [isOffline, setOfflineStatus] = useState(false);

    useEffect(() => {
        // NetInfo.addEventListener(networkState => {
        //   console.log("Connection type - ", networkState.type);
        //   console.log("Is connected? - ", networkState.isConnected);
        // });

        // NetInfo.fetch().then(networkState => {
        //   console.log("Connection type - ", networkState.type);
        //   console.log("Is connected? - ", networkState.isConnected);
        // });
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setOfflineStatus(offline);
        });
        // fetchUsers();
        return () => removeNetInfoSubscription();
    }, [])

    
const Button = ({children, ...props}) => (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
  
  const NoInternetModal = ({show, onRetry, isRetrying}) => (
    <Modal isVisible={show} style={styles.modal} animationInTiming={600}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Connection Error</Text>
        <Text style={styles.modalText}>
          Oops! Looks like your device is not connected to the Internet.
        </Text>
        <Button onPress={onRetry} disabled={isRetrying}>
          Try Again
        </Button>
      </View>
    </Modal>
  );
    

  return (
    <View>
     <NoInternetModal
        show={isOffline}
        onRetry={fetchUsers}
        isRetrying={isLoading}
    />
    </View>
  )
}

export default CheckInternet


const styles = StyleSheet.create({
    // ...
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContainer: {
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 40,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: '600',
    },
    modalText: {
      fontSize: 18,
      color: '#555',
      marginTop: 14,
      textAlign: 'center',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#000',
      paddingVertical: 12,
      paddingHorizontal: 16,
      width: '100%',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 20,
    },
  });
  