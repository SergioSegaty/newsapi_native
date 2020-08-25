import React from "react";
import { Text, View, Image, Linking, Alert } from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import News from "../Models/news";

const NewsPhoto = styled.Image`
  margin: 5px 5px;
  height: 250px;
  width: 95%;
  border-radius: 5px;
`;

const Title = styled.Text`
  font-size: 20px;
  color: white;
`;

const ViewButtons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 50%;
  margin-top: 10px;
`;

const ButtonFav = styled.Button``;

const ButtonRedirect = styled.Button``;

const Author = styled.Text`
  font-size: 12px;
  align-self: flex-end;
  font-weight: bold;
  color: #564b4b;
`;

const Background = styled.View`
  background-color: grey;
  border-radius: 5px;
  margin: 5px;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Desc = styled.Text`
  /* background-color: #06113f; */
  font-size: 16px;
  color: white;
  border-radius: 3px;
  text-align: center;
`;

const Date = styled.Text`
  font-size:12px;
  color: white;
  text-align: right;
`


/**
 * It gets the props from Redux and the Article and saves it to the FavList.
 * 
 * @param {*} props 
 * @param {News} article 
 */
const _handleFavClick = (props, article) => {
  Alert.alert(
    "Adicionar aos Favoritos?",
    "",

    [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancelado");
        },
      },
      {
        text: "Ok",
        onPress: () => {
          props.dispatch({ type: "add/fav", item: article });
        },
      },
    ],
    { cancelable: true }
  );
};

/**
 * Redirects the click to the Article Url
 * 
 * @param {URL} url 
 */
const _handleRedirectClick = (url) => {
  Linking.openURL(url);
};

function NewsCard(props) {
  return (
    <Background>
      <Title> {props.article.title} </Title>
      <Date>{props.article.publishedAt}</Date>
      <NewsPhoto
        source={{
          uri: props.article.imageUrl,
        }}
      />
      {props.article.author ? (
        <Author>{props.article.author}</Author>
      ) : (
        <Author>{props.article.name}</Author>
      )}

      <Desc>{props.article.description}</Desc>
      <ViewButtons>
        <ButtonFav
          onPress={() => _handleFavClick(props, props.article)}
          title="Favoritos"
          color="#06113f"
        ></ButtonFav>
        <ButtonRedirect
          onPress={() => _handleRedirectClick(props.article.url)}
          title="Redirect"
          color="red"
        ></ButtonRedirect>
      </ViewButtons>
    </Background>
  );
}

const MapStateToProps = (state) => {
  return {
    ...state
  }
};

export default connect(MapStateToProps)(NewsCard);