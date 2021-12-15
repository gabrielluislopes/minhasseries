import React from 'react';
import {StyleSheet, View, Text, FlatList, ActivityIndicator} from 'react-native';
import AddCard from '../components/AddCard';
import SerieCard from '../components/SerieCard';
import { connect } from 'react-redux';
import { watchSeries } from '../actions/seriesAction';

const isLeft = number => number % 2 === 0;

class SeriesPage extends React.Component{
  componentDidMount() {
    this.props.watchSeries();
  }

  render(){

    if (this.props.series === null) {
      return <AddCard
              onNavigate={() => this.props.navigation.navigate('NewSerieScreen')}
            />
    } 

    return (
      <View>
        <FlatList
          data={[...this.props.series, {isLast: true}]}
          renderItem={({item, index}) => {
            return(

              item.isLast ?
                <AddCard
                  onNavigate={() => this.props.navigation.navigate('NewSerieScreen')}
                />
                :
                <SerieCard
                  serie={item}
                  isLeft={isLeft(index)}
                  onNavigate={() => this.props.navigation.navigate('SerieDetail', {serie: item})}
                />
            );
          }}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => {
  const {listaSeries} = state;

  if (listaSeries === null) {
    return {series: listaSeries};
  }
  const keys = Object.keys(listaSeries);
  const listaSeriesWithId = keys.map(key => {
    return {...listaSeries[key], id: key}
  })

  return {series : listaSeriesWithId};
}

export default connect(mapStateToProps, {watchSeries})(SeriesPage);
