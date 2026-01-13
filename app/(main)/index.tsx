import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        display: 'flex',
        gap: 50
      }}
    >
      <View style={styles.welcomeTitleContainer}>
        <Text style={styles.welcomeTitle}>Bem Vindo ao <Text style={{ color: 'red' }}>Youtube</Text> Stats</Text>
        <Text style={styles.welcomeTitleBody}>Veja quanto vale o seu trabalho!</Text>
        <Text style={{ 
          fontSize: 15,
          textAlign: "center"
        }}>
          Cole o link do seu video e afogue-se nas espetaculares estatísticas do seu trabalho!
        </Text>
      </View>

      <View style={{
        display: 'flex',
        gap: 20
      }}>
        <View style={styles.iconContainer}>
          <Ionicons style={{
            textAlign: 'center'
          }} name="logo-youtube" color={'red'} size={200}/>
        </View>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={ () => router.push('/home') }
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcomeTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 10
  },
  welcomeTitle: {
    fontSize:50,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center'
  },
  welcomeTitleBody: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500'
  },
  iconContainer: {
    width: 300,
    height: 300,
    padding: 10,
    borderWidth: 5,
    borderColor: 'red',
    borderRadius: '50%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: 'red',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 100,
    borderRadius: 50,
  },
  loginButtonText: {
    fontWeight: 'bold',
    color: '#f4f4f4',
    textAlign: 'center',
    fontSize: 30,
    fontStyle: 'italic'
  }
})