import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapViewDirections from "react-native-maps-directions";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2 - 70,
  },
});

const GOOGLE_MAPS_APIKEY = "Api Key";

export default class ThirdOperationPage extends React.Component {
  constructor() {
    super();
    this.mapRef = null;
    this.mapRef2 = null;
    this.state = {
      minOrigin: null,
      minDestination: null,
      maxOrigin: null,
      maxDestination: null,
    };
  }
  componentDidMount() {
    this._isMounted = true;

    this.setArticleOne();
  }
  setArticleOne = () => {
    fetch("http://yazlabproje.somee.com/api/OperationThree")
      .then((response) => response.json())
      .then((json) => {
        //this.setState({minOrigin: {latitude:parseFloat(json.minTripStartCoordinate.lat),longitude:parseFloat(json.minTripStartCoordinate.lng)}}});

        this.setState({
          minOrigin: {
            latitude: json.minTripStartCoordinate.lat,
            longitude: json.minTripStartCoordinate.lng,
          },
          minDestination: {
            latitude: json.minTripFnishCoordinate.lat,
            longitude: json.minTripFnishCoordinate.lng,
          },
          maxOrigin: {
            latitude: json.maxTripStartCoordinate.lat,
            longitude: json.maxTripStartCoordinate.lng,
          },
          maxDestination: {
            latitude: json.maxTripFnishCoordinate.lat,
            longitude: json.maxTripFnishCoordinate.lng,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  setScreen = (X, Y, prop) => {
    let asd = [X, Y];
    prop.fitToCoordinates(asd);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.minOrigin != null && (
          <>
            <Text
              style={{
                marginTop: 40,
                marginBottom: 10,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              En Kısa Mesafeli Yol
            </Text>
            <MapView
              onLayout={() => {
                this.setScreen(
                  this.state.minOrigin,
                  this.state.minDestination,
                  this.mapRef
                );
              }}
              ref={(ref) => {
                this.mapRef = ref;
              }}
              style={styles.map}
            >
              <MapViewDirections
                origin={this.state.minOrigin}
                destination={this.state.minDestination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="red"
              />
            </MapView>
            <Text
              style={{
                marginTop: 20,
                marginBottom: 8,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              En Uzun Mesafeli Yol
            </Text>
            <MapView
              onLayout={() => {
                this.setScreen(
                  this.state.maxOrigin,
                  this.state.maxDestination,
                  this.mapRef2
                );
              }}
              ref={(ref2) => {
                this.mapRef2 = ref2;
              }}
              style={styles.map}
            >
              <MapViewDirections
                origin={this.state.maxOrigin}
                destination={this.state.maxDestination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="red"
              />
            </MapView>
          </>
        )}
      </View>
    );
  }
}
