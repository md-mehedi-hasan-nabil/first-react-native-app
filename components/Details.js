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

const About = ({ route, navigation }) => {
  const [detailsData, setDetailsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${route.params.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDetailsData(data.teams);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {!loading ? (
          detailsData.map((data) => (
            <View style={styles.cardContainer} key={data.idTeam}>
              <View styles={styles.card}>
                <Image
                  style={styles.logo}
                  source={{
                    uri: `${data.strTeamBadge}`,
                  }}
                />
                <Text style={styles.cardTitle}>{data.strAlternate}</Text>
                <TouchableOpacity>
                  <Image
                    style={styles.bannerImage}
                    source={{
                      uri: `${data.strTeamFanart3}`,
                    }}
                  />
                </TouchableOpacity>
                <Text style={{ marginBottom: 10 }}>
                  {data.strStadiumDescription}
                </Text>
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
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
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
    marginLeft: "36%",
    marginBottom: 10,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  loader: {
    width: 100,
    height: 100,
    backgroundColor: "black",
  },
  bannerImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
});

export default About;
