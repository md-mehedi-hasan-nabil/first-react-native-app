import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  RefreshControl,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Home = ({ navigation }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English%20Premier%20League"
    )
      .then((response) => response.json())
      .then((data) => {
        setApiData(data.teams);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handlePress() {
    Alert.alert("Press", "my description");
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {!loading ? (
          apiData.map((data) => (
            <View style={styles.cardContainer} key={data.idTeam}>
              <View styles={styles.card}>
                <Text style={styles.cardTitle}>{data.strAlternate}</Text>
                <TouchableOpacity>
                  <Image
                    style={styles.logo}
                    source={{
                      uri: `${data.strStadiumThumb}`,
                    }}
                  />
                </TouchableOpacity>
                <Text numberOfLines={8} style={{ marginBottom: 10 }}>
                  {data.strStadiumDescription}
                </Text>
                <Button
                  title="Go to Details"
                  onPress={() => {
                    navigation.navigate("details", {
                      id: data.idTeam
                    });
                  }}
                />
                {/* <Button onPress={handlePress} title="more details" /> */}
              </View>
            </View>
          ))
        ) : (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: 10,
    borderTopColor: "#e5e6e9",
  },
  card: {
    backgroundColor: "#ffc048",
  },
  cardTitle: {
    backgroundColor: "#E6123B",
    color: "#fff",
    padding: 40,
    marginBottom: 10,
    borderRadius: 10,
  },
  logo: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  loader: {
    width: 100,
    height: 100,
    backgroundColor: "black",
  },
});

export default Home;
