/**
 * Created by jessietang on 2017/6/5.
 */
var MessageBox = React.createClass({
    getInitialState: function(){
        return {
            isVisible: true,
            titleMessage: 'hello (from state)!'
        }
    },
    changeColor: function(){
        this.setState({
            isVisible: !this.state.isVisible
        });
    },
    render: function(){
        var displayColor = {
          color: this.state.isVisible ? 'red' : 'blue'
        };
        return (
            <h1 style={displayColor} onClick={this.changeColor}>{this.state.titleMessage}</h1>
        )
    }
});

var ClickApp = React.createClass({
    getInitialState: function(){
        return {
            clickTimes: 0
        }
    },
    handleClick: function(){
        this.setState({
            clickTimes: this.state.clickTimes+1
        })
    },
    render: function(){
        return (
            <div>
                <button onClick={this.handleClick}>click me</button>
                <p>you had clicked me {this.state.clickTimes} times.</p>
            </div>
        )
    }
});

ReactDOM.render(
    <MessageBox/>,
    document.getElementById('app')
);

ReactDOM.render(
    <ClickApp/>,
    document.getElementById('clickApp')
)