import React, { useEffect, useState } from "react";
import { Text, View, Picker, TextInput } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import NewsCard from "../Components/NewsCard";
import { connect } from "react-redux";
import { NewsAPI } from "../js/NewsAPI";
import styled from "styled-components";
import Paises from "../Models/paises";

const newsAPI = new NewsAPI();
const paises = Paises();

const CountryPicker = styled.Picker`
  height: 80%;
  width: 150px;
`;

const InputQuery = styled.TextInput`
  height: 80%;
  width: 150px;
  background-color: white;
  margin-left: 5px;
  text-align: center;
  margin-right: 5px;
`;

const FavButton = styled.Button`
  height: 40px;
  width: 50px;
  align-self: flex-end;
`;

const MenuView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const _handleSelectChange = async (query, props) => {
  let newList = await newsAPI.getTop(query);
  console.log(newList);
  props.dispatch({ type: "update/top", items: newList });
};

const _handleFavClick = (props) => {
  props.dispatch({type: 'select/fav'})
}

const _handleSearchInput = async (query, props) => {
  let newList = await newsAPI.getAll(query);
  props.dispatch({ type: "update/all", items: newList });
};

const populateReducer = async (props) => {
  let newList = await newsAPI.getTop();
  props.dispatch({ type: "update/items", items: newList });
};

const cardRenderer = ({ item }) => <NewsCard article={item} />;

function NewsView(props) {
  const [selectedValue, setSelectedValue] = useState("br");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (!props.loaded) {
      populateReducer(props);
    }
  });

  return (
    <View>
      <MenuView>
        <InputQuery
          onChangeText={(text) => setSearchInput(text)}
          onSubmitEditing={() => {
            _handleSearchInput(searchInput, props);
          }}
          value={searchInput}
          placeholder="Search..."
        ></InputQuery>
        <FavButton
          title='Favoritos'
          color='red'
          onPress={() => {
              _handleFavClick(props);
          }}
        ></FavButton>
        <CountryPicker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => {
            setSelectedValue(itemValue);
            _handleSelectChange(itemValue, props);
          }}
          itemStyle={{ backgrondColor: "white", color: "blue" }}
        >
          {paises.map((pais) => {
            return (
              <Picker.Item
                label={pais.nome}
                value={pais.sigla}
                key={pais.nome}
              />
            );
          })}
        </CountryPicker>
      </MenuView>
      <FlatList
      contentContainerStyle={{ paddingBottom: 45}}
        data={props.items}
        renderItem={cardRenderer}
        keyExtractor={(item) => {
          return item.url;
        }}
      />
    </View>
  );
}

const MapStateToProps = (state) => {
  return {
    ...state,
    items: state.items,
    route: state.route,
    query: state.query,
    loaded: state.loaded,
  };
};

export default connect(MapStateToProps)(NewsView);