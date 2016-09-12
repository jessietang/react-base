/**
 * Created by jessietang on 9/2/2016.
 */

/*jsx中input tag一定要close*/
/*直接写checked的话，不能更改， 除非加上onChange事件*/
/*value={this.state.inputValue} 必须给input添加onChange事件才能修改*/
var FormApp = React.createClass({
    getInitialState: function(){
        return {
            inputValue:'input value...',
            selectValue:'B',
            radioValue: 'B',
            textAreaValue:'textarea value...'
        }
    },
    handleSubmit: function(e){
        e.preventDefault();
        console.log("submitting...");
        console.log(e);
        console.log(e.target);
    },
    handleInput: function(e){
        this.setState({
            inputValue: e.target.value
        });
    },
    handleSelect: function(e){
        this.setState({
            selectValue: e.target.value
        });
    },
    handleTextArea: function(e){
        this.setState({
            textAreaValue: e.target.value
        });
    },
    render: function(){
        return (
            <form onSubmit={this.handleSubmit}>
                <h4>input</h4>
                <input type="text" onChange={this.handleInput} value={this.state.inputValue}/>
                <h4>select</h4>
                <select value={this.state.selectValue} onChange={this.handleSelect}>
                    <option defaultValue="A">A</option>
                    <option defaultValue="B">B</option>
                    <option defaultValue="C">C</option>
                    <option defaultValue="D">D</option>
                    <option defaultValue="E">E</option>
                </select>
                <h4>checkbox</h4>
                <input type="checkbox" value="A"/>
                <input type="checkbox" defaultChecked value="B"/>
                <input type="checkbox" value="C"/>
                <input type="checkbox" value="D"/>
                <h4>radio</h4>
                <input type="radio" name="goodRadio" defaultChecked value="A"/>
                <input type="radio" name="goodRadio" value="B"/>
                <input type="radio" name="goodRadio" value="C"/>
                <input type="radio" name="goodRadio" value="D"/>
                <h4>textArea</h4>
                <textarea cols="30" rows="10" value={this.state.textAreaValue} onChange={this.handleTextArea}></textarea>

                <button type="submit">submit all</button>
            </form>
        )
    }
});


ReactDOM.render(
    <FormApp/>,
    document.getElementById('app')
);