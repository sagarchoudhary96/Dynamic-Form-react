import React, { Component } from 'react'
import {Route,withRouter, Switch} from 'react-router-dom'
import NavBar from './navBar'
import MainPage from './mainPage'

class App extends Component {
  state = {
    "title": "This is a title for the form Header",
    "questions": [
            {
                "id": 2447,
                "question_type": "TextQuestion",
                "prompt": "What is your first answer?",
                "is_required": false,
                "min_char_length": 15,
                "answer": ""

            },
          {
              "id": 2448,
              "question_type": "TextQuestion",
              "prompt": "What is your second answer?",
              "is_required": true,
              "min_char_length": 10,
              "answer": ""
          },
          {
              "id": 2500,
              "question_type": "TextQuestion",
              "prompt": "What is your third answer?",
              "is_required": true,
              "min_char_length": 1,
              "answer": ""
          },

          {
              "id": 2502,
              "question_type": "CheckBoxQuestion",
              "prompt": "Choose all the correct options.",
              "is_required": true,
              "answer":[{val: "option1",isChecked: false}, {val: "option2",isChecked: false}, {val: "option3",isChecked: false}]
          },
          {
              "id": 2504,
              "question_type": "RadioQuestion",
              "prompt": "Choose any one",
              "is_required": true,
              "answer":[{val: "option1",isChecked: false}, {val: "option2",isChecked: false}, {val: "option3",isChecked: false}]
          }
        ]
    }


  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="container">
         <Switch>
          <Route exact path='/' render={()=> (<MainPage title = {this.state.title} questions = {this.state.questions} />)}  />
         </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(App);
