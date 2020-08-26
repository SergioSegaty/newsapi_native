import React, { useEffect, useState } from "react";
import { Text, View, Picker, TextInput } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import NewsCard from "../Components/NewsCard";
import { connect } from "react-redux";
import styled from "styled-components";
import Paises from "../Models/paises";

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

/**
 * Takes the query and fetches the getTop from NewsAPI.
 * @param {String} query
 * @param {*} props
 */
const _handleSelectChange = async (query, props) => {
  if(query === 'none'){
    return
  }
  props.dispatch({ type: "update/top", query: query });
};

_createId = async () => {
  return await nanoid();
};

/**
 * Fetches the Favorited Articles list from Redux and shows it.
 * @param {*} props
 */
const _handleFavClick = (props) => {
  props.dispatch({ type: "select/fav", route: '/fav' });
};

/**
 * Takes the query and fetches the getAll from newsAPI.
 * @param {String} query
 * @param {*} props
 */
const _handleSearchInput = async (query, props) => {
  if (query || query.length > 0) {
    props.dispatch({ type: "update/all", query: query });
  }
};

/**
 * The first fetch it gets the default from getTop, Brazil.
 * @param {*} props
 */
const populateReducer = async (props) => {
  props.dispatch({ type: "update/default" });
};

/**
 * It render the card based on the Item(News) that is passed to it.
 * @param {News} item
 */
const cardRenderer = ({ item }) => <NewsCard article={item} />;

function NewsView(props) {
  const [selectedValue, setSelectedValue] = useState("default");
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
            setSelectedValue("default");
          }}
          value={searchInput}
          placeholder="Search..."
        ></InputQuery>
        <FavButton
          title="Favoritos"
          color="red"
          onPress={() => {
            _handleFavClick(props);
            setSelectedValue("default");
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
          <Picker.Item label="Escolha" value={"none"} key="default" />

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
        contentContainerStyle={{ paddingBottom: 45 }}
        data={props.items}
        renderItem={cardRenderer}
        keyExtractor={(item) => item.id}
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
