import React, { Component } from "react";
import { View, Text } from "react-native";

const monthNames = new Array(
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık"
);
export default class FirstOperationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: Array,
    };
  }
  componentDidMount() {
    this._isMounted = true;

    this.setArticleOne();
  }
  setArticleOne = () => {
    fetch("http://yazlabproje.somee.com/api/OperationOne")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ dataList: json });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  splitDate(str) {
    var res = str.split("-");
    return (
      <Text>
        Seyahat Tarihi = {res[2]} {monthNames[Number(res[1]) - 1]} {res[0]}
      </Text>
    );
  }
  getData() {
    return (
      <View>
        {Object.values(this.state.dataList).map((value, key) => (
          <View
            key={key}
            style={{
              borderWidth: 2,
              borderStyle: "solid",
              margin: 3,
              padding: 8,
              marginHorizontal: 10,
              backgroundColor: "white",
              borderColor: "grey",
              borderRadius: 5,
            }}
          >
            <Text>
              Toplam Yolcu Sayısı Yolcu sayısı = {value.passenger_count}
            </Text>
            {this.splitDate(
              value.tpep_pickup_datetime.replace("T00:00:00", "")
            )}
          </View>
        ))}
      </View>
    );
  }

  render() {
    return (
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#E1EFFF" }}
      >
        <Text
          style={{
            fontWeight: "bold",
            marginHorizontal: 20,
            fontSize: 20,
            textAlign: "center",
            marginVertical: 10,
            marginBottom: 20,
            marginTop: 50,
          }}
        >
          {" "}
          En Fazla Yolcu Taşınan Beş Gün Ve Toplam Yolcu Sayıları{" "}
        </Text>
        {this.state.dataList != null && this.getData()}
      </View>
    );
  }
}
