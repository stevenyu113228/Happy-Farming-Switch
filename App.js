import React, { Component } from 'react';
import { Text, View ,Switch , Button } from 'react-native';

export default class farm extends Component {
  state = {
    value1:false,
    value2:false,
    value3:false,
    value4:false,
    value5:false,
    time:""
  }

  componentDidMount() {
    this.refresh()
    this.timer = setInterval(() => this.refresh(), 5000);
  }
  

  refresh = () => {
    let time = "刷新時間： " + new Date().getHours().toString() + ":";
    time += new Date().getMinutes().toString() + ":";
    time += new Date().getSeconds().toString();

    fetch('http://hostname/benson/message2.php')
    .then((response)=> response.text())
    .then((res)=> {
      this.setState({
        value1:res[0]==1,
        value2:res[1]==1,
        value3:res[2]==1,
        value4:res[3]==1,
        value5:res[4]==1,
        time: time
      },() => console.log('Get Success'))}
    );
    
    
  }

  render() {

    send_req = () => {
      let url = "http://hostname/benson/control_message.php?";
      url += "1=" + (this.state.value1==false?'0':'1') + '&';
      url += "2=" + (this.state.value2==false?'0':'1') + '&';
      url += "3=" + (this.state.value3==false?'0':'1') + '&';
      url += "4=" + (this.state.value4==false?'0':'1') + '&';
      url += "5=" + (this.state.value5==false?'0':'1') ;
      console.log(url);
      fetch(url);

    }


    set_data = (i,n) =>{
      let time = "刷新時間： " + new Date().getHours().toString() + ":";
      time += new Date().getMinutes().toString() + ":";
      time += new Date().getSeconds().toString();

      switch(i){
        case 1:
          this.setState({value1:n, time:time},()=>send_req());
          break;
        case 2:
          this.setState({value2:n, time:time},()=>send_req());
          break;
        case 3:
          this.setState({value3:n, time:time},()=>send_req());
          break;
        case 4:
          this.setState({value4:n, time:time},()=>send_req());
          break;
        case 5:
          this.setState({value5:n, time:time},()=>send_req());
          break;
      }
    }



    return (
        <View style={{ flex: 1, alignItems: "center",justifyContent: 'space-evenly' }}>

          
          <View style={this.StyleSheet.viewA}>
          <Text style={this.StyleSheet.text}>溫室1      </Text>
          <Switch
            value={this.state.value1}
            style={this.StyleSheet.switch}
            onValueChange={(value)=>{set_data(1,value)}}
            />
          </View>

          <View style={this.StyleSheet.viewA}>
          <Text style={this.StyleSheet.text}>溫室2      </Text>
          <Switch
            value={this.state.value2}
            style={this.StyleSheet.switch}
            onValueChange={(value)=>{set_data(2,value)}}
          />
          </View>  

          <View style={this.StyleSheet.viewA}>
          <Text style={this.StyleSheet.text}>溫室3      </Text>
          <Switch
            value={this.state.value3}
            style={this.StyleSheet.switch}
            onValueChange={(value)=>{set_data(3,value)}}
            />
          </View>  


          <View style={this.StyleSheet.viewA}>
          <Text style={this.StyleSheet.text}>溫室4      </Text>
          <Switch
            value={this.state.value4}
            style={this.StyleSheet.switch}
            onValueChange={(value)=>{set_data(4,value)}}
            />
          </View>  

          <View style={this.StyleSheet.viewA}>
          <Text style={this.StyleSheet.text}>溫室5      </Text>
          <Switch
            value={this.state.value5}
            style={this.StyleSheet.switch}
            onValueChange={(value)=>{set_data(5,value)}}
          />
          </View>  


          <Text>{this.state.time}</Text>
        </View>
    );
  }
  StyleSheet = {
    switch:{transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]},
    text:{fontSize:20},
    viewA:{flexDirection:'row',}
  }
}