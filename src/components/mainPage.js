import React, {Component} from 'react'
import TextQuestion from './textQuestion'
import CheckBoxQuestion from './checkBoxQuestion'
import RadioQuestion from './radioQuestion'
import {PropTypes} from 'prop-types'
import {ToastContainer, ToastStore} from 'react-toasts'


class MainPage extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    questions: PropTypes.array.isRequired
  }

  state = {
    questions: this.props.questions,
    title: this.props.title,
    current: 0,
    total: this.props.questions.length,
    btnEnabled: false,

  }

  handleButton = (val) => {
    console.log("handling button")
    this.setState({btnEnabled: val})
  }

  nextQues = () => {
    console.log("next ques")
    this.setState((state)=> (
      {
        ...state,
        current: state.current+1
      })
    )
  }

  prevQues = () => {
    this.setState((state)=> (
      {
        ...state,
        current: state.current-1
      })
    )
  }

  handleAnswer = (answer,index) => {
    console.log(index, this.state.current)
    const { questions,current } = this.state
    console.log(questions)
    questions[current].answer = answer


    this.setState({
      questions
    },()=> {
      this.handleButton(true)
      ToastStore.info('Answer Submitted');
    })
  }


  render () {
    const current = this.state.current
    const total = this.state.total
    const currentQuestion = this.state.questions[current]
    const isbtnEnabled = this.state.btnEnabled

    return (
      <div>
      <div className="row">
        <div className="col s12 center">
          <h1>{this.state.title}</h1>
        </div>
      </div>
          {current < total
          ? (<div>
            {currentQuestion.question_type === "TextQuestion" && <TextQuestion question={currentQuestion} handleBtn = {this.handleButton} handleSubmit={this.handleAnswer}/>}
            {currentQuestion.question_type === "CheckBoxQuestion" && <CheckBoxQuestion question={currentQuestion} handleBtn = {this.handleButton} handleSubmit={this.handleAnswer} />}
            {currentQuestion.question_type === "RadioQuestion" && <RadioQuestion question={currentQuestion}  handleBtn = {this.handleButton} handleSubmit={this.handleAnswer} />}
            {current > 0 && <a className="waves-effect waves-light btn-large btn-color prev-btn" onClick={this.prevQues}>Previous Question</a>}
            {isbtnEnabled
              ? <a className="waves-effect waves-light btn-large btn-color" onClick={this.nextQues}>Next Question</a>
            :<a className="waves-effect waves-light btn-large btn-color disabled">Next Question</a>
          }
          </div>
        ) :<span>THANKS FOR THE RESPONSE!</span>
        }

        <ToastContainer store={ToastStore}/>
      </div>
    )
  }
}

export default MainPage
