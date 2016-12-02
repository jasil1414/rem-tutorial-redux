import React from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';
class App extends React.Component{
  render(){
    return (
      <div>
        <div className="containerFluid">
          <NavigationBar />
          </div>
          <div className="container">
          <FlashMessagesList />
          {this.props.children}
        </div>
      </div>
          );
  }
}

export default App;
