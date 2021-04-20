import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";

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

export default class SecondOperationPage extends React.Component {
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
    fetch("http://yazlabproje.somee.com/api/OperationTwo")
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
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: "white",
              borderColor: "grey",
              borderRadius: 5,
            }}
          >
            <Text>
              Günlük kazanılan ortalama ücret ={" "}
              {Number(value.total_amount).toFixed(2)} ${" "}
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
      <ScrollView
        style={{ width: "100%", height: "100%", backgroundColor: "#E1EFFF" }}
      >
        <Text
          style={{
            fontWeight: "bold",
            marginHorizontal: 30,
            fontSize: 20,
            textAlign: "center",
            marginVertical: 10,
            marginBottom: 20,
            marginTop: 50,
          }}
        >
          Günlük Seyahat başına düşen Ortalama Alınan Ücretlere Göre En Az Ücret
          Alınan İki Tarih Arasındaki Günlük Alınan Ortalama Ücretler{" "}
        </Text>
        {this.state.dataList != null && this.getData()}
      </ScrollView>
    );
  }
}
