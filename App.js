/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';


export default class App extends Component {

  constructor(){
    super();
    this.state = {
      resultText: "",
      calcResult: ""
    }
    this.operations = ['del', '+', '-', '*', '/'];
  }
  
  calculateResult(){
    const text = this.state.resultText;
    if(this.operations.lastIndexOf(text.split('').pop())>0){
      alert('Bad input!');
      return ;
    }
    this.setState({
      calcResult: eval(text)
    });
  }

  buttonPress(text){
    if(text == '='){
      this.calculateResult();
    }else{
      if(text=='.'){
        if(this.state.resultText.split('').pop()!='.'){
          this.setState({
            resultText: this.state.resultText+text
          });
        }
      }else{
        this.setState({
          resultText: this.state.resultText+text
        });
      }
    }
  }
  
  operate(operation){
    switch (operation) {
      case 'del':
        this.setState({
          resultText: this.state.resultText.slice(0, this.state.resultText.length-1)
        });
        break; 
      default:
        if(this.state.resultText=='') break;
        if(this.operations.indexOf(this.state.resultText.split('').pop()) > 0) break;
        this.setState({
          resultText: this.state.resultText+operation
        });
        break;
    }
  }

  render() {
    let rows = [];
    let nums = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['0', '.', '=']];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity style={styles.button} onPress={()=>{this.buttonPress(nums[i][j])}}><Text style={styles.buttonText}>{nums[i][j]}</Text></TouchableOpacity>
        );
      }
      rows.push(
        <View style={styles.row}>
              {row}
        </View>
      );
    }
    
    let ops = [];
    for (let i = 0; i < 5; i++) {
      ops.push(<TouchableOpacity style={styles.button} onPress={()=>this.operate(this.operations[i])}><Text style={styles.operationText}>{this.operations[i]}</Text></TouchableOpacity>);
      
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calcResult}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
            
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result:{
    flex:2,
    backgroundColor: '#D4D4D4',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation:{
    flex:1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons:{
    flex: 7,
    flexDirection: 'row'
  },
  numbers:{
    flex: 3,
    backgroundColor: '#162021'
  },
  operations:{
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#8588FF'
  },
  row:{
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  resultText:{
    fontSize: 45,
    color: 'black',
    marginRight: 15
  },
  calculationText:{
    fontSize: 25,
    color: 'black',
    marginRight: 15
  },
  button:{
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText:{
    fontSize: 25,
    color: 'white'
  },
  operationText:{
    fontSize: 25,
    color: 'white'
  }
});
