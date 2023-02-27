import { useNavigation } from "@react-navigation/native";
import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert, Text, StyleSheet, TextInput, FlatList, Pressable, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe"; 
 




function MainScreen() {
  const API_KEY = "AIzaSyAIFB4U62Kc39uj42G0OoIzsAPPCA33i5Q";
  const [playing, setPlaying] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${API_KEY}`;

    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.items);
      })
      .catch(error => console.error(error));
    console.log(searchResults);
  };

    const navigation = useNavigation()
    return (
      <View style={styles.container}>
        <View style = {styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style = {styles.logoutButton}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchStyle}>
            <TextInput
                style={styles.input}
                placeholder="Search YouTube"
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery} 
            />

            <Pressable onPress={handleSearch} style={styles.button}>
                <Image source={require('../assets/search.png')} style={{ height: 35, width: 35 }} />
            </Pressable>

        </View>

        <Text style={styles.titleStyle} >Video Title: {videoTitle}</Text>
    
        <View style={{ height: 200 }}>
            <YoutubePlayer
                height={300}
                play={playing}
                videoId={videoId}
                onChangeState={onStateChange}
            />
        </View>
    
    
    
        <View style={styles.resultOuterView}>
            <FlatList
                data={searchResults}
                keyExtractor={item => item.id.videoId}
                renderItem={({ item }) => (
                    <View style={styles.result}>
                        <Pressable onPress={() => {
                            setVideoId(item.id.videoId);
                        }}>
                            <Text>{item.snippet.title}</Text>
                        </Pressable>
                    </View>
                )}
            />
          </View>
        </View>
    );
}



const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
    marginBottom: 10
  },
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
  },
  result: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    borderWidth: 3,
    borderColor: "gray",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 3,
    borderRadius: 4,
    elevation: 3,
  },

  logoutButton: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
  },

  resultOuterView: {
    borderWidth: 1,
    borderColor: "black",
  },
  searchStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    height: 50, 
    width: 120,
    marginBottom: 20,
    alignContent: 'left',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 3,
    borderRadius: 4,
    elevation: 3,
  },

});



export default MainScreen;