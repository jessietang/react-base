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
            selectValue:'C',
            radioValue: 'B',
            checkValues: ['B'],
            textAreaValue:'textarea value...'
        }
    },
    handleSubmit: function(e){
        e.preventDefault();
        console.log("submitting...");
        console.log(e);
        console.log(e.target);
        var formData = {
            input: this.refs.myInput.value,
            select: this.refs.mySelect.value,
            textarea: this.refs.myTextArea.value,
            checkbox:this.state.checkValues,
            radio:this.state.radioValue
        };
        /*console.log(this.refs.myInput.value);
        console.log(this.refs.mySelect.value);
        console.log(this.refs.myTextArea.value);*/
        console.log(formData);
        this.refs.myRadio.saySth();
    },
    handleRadio: function(e){
        this.setState({
            radioValue: e.target.value
        });
    },
    handleCheck: function(e){
        var checkValues = this.state.checkValues.slice(0);
        var nowValue = e.target.value;
        var index = checkValues.indexOf(nowValue);
        if(index == -1){
            checkValues.push(nowValue);
        }else{
            checkValues.splice(nowValue,1);
        }
        console.log(checkValues);
        this.setState({
            checkValues: checkValues
        });
    },
    render: function(){
        return (
            <form onSubmit={this.handleSubmit}>
                <h4>input</h4>
                <input type="text" ref={function(comp){comp.focus()}} defaultValue={this.state.inputValue}/>

                <input type="text" ref="myInput" defaultValue={this.state.inputValue}/>


                <h4>select</h4>
                <select defaultValue={this.state.selectValue} ref="mySelect">
                    <option defaultValue="A">A</option>
                    <option defaultValue="B">B</option>
                    <option defaultValue="C">C</option>
                    <option defaultValue="D">D</option>
                    <option defaultValue="E">E</option>
                </select>

                <CheckBox handleCheck={this.handleCheck}/>

                <RadioBox ref="myRadio" handleRadio={this.handleRadio}/>

                <textarea cols="30" rows="10" defaultValue={this.state.textAreaValue} ref="myTextArea"></textarea>

                <button type="submit">submit all</button>
            </form>
        )
    }
});


var CheckBox = React.createClass({
    render: function(){
        return (
            <div>
                <h4>checkbox</h4>
                <input onChange={this.props.handleCheck} type="checkbox" value="A"/>A
                <input onChange={this.props.handleCheck} type="checkbox" defaultChecked value="B"/>B
                <input onChange={this.props.handleCheck} type="checkbox" value="C"/>C
                <input onChange={this.props.handleCheck} type="checkbox" value="D"/>D
            </div>
        )
    }
});


var RadioBox = React.createClass({
    saySth: function(){
        alert('yoyoyo');
    },
    render: function(){
        return (
            <div>
                <h4>radio</h4>
                <input onChange={this.props.handleRadio} type="radio" name="goodRadio" defaultChecked value="A"/>
                <input onChange={this.props.handleRadio} type="radio" name="goodRadio" value="B"/>
                <input onChange={this.props.handleRadio} type="radio" name="goodRadio" value="C"/>
                <input onChange={this.props.handleRadio} type="radio" name="goodRadio" value="D"/>
            </div>
        )
    }
});


ReactDOM.render(
    <FormApp/>,
    document.getElementById('app')
);

/*
<h4>select</h4>
<select defaultValue={this.state.selectValue} ref="mySelect">
    <option defaultValue="A">A</option>
    <option defaultValue="B">B</option>
    <option defaultValue="C">C</option>
    <option defaultValue="D">D</option>
    <option defaultValue="E">E</option>
    </select>*/



/*
<h4>checkbox</h4>
<input onChange={this.handleCheck} type="checkbox" value="A"/>A
    <input onChange={this.handleCheck} type="checkbox" defaultChecked value="B"/>B
    <input onChange={this.handleCheck} type="checkbox" value="C"/>C
    <input onChange={this.handleCheck} type="checkbox" value="D"/>D*/
