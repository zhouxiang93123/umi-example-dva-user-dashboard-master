import {connect} from 'dva';
import React, {Component} from 'react';
import {Timeline,Radio,Button} from 'antd';
import BScroll from '@better-scroll/core'
import styles from './Users.css';

@connect(({myprograms, loading}) => ({
  myprograms,
  loading: loading.models.myprograms,
}))

class Myprogram extends Component {
  constructor(props) {
    super(props);
    // 必须存在this.state中
    this.state = {
      myscroll:0
    }

  }
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'myprograms/fetchTags',
      payload: 1,
    });

  }
  componentDidUpdate(){
    const  options = {
      startY: -400,
    }
    options.probeType=3;
    const content = document.querySelector('.wrapper');
    this.state.myscroll = new BScroll(content,options);

    console.log(this.state.myscroll,'scroll');


  }
  onChange = e => {
    console.log('radio checked', e.target.value);
    const {dispatch} = this.props;
    const  id  = e.target.value;
    dispatch({
      type: 'myprograms/changeStates',
      payload: id,
    });
  };

  onClick = e => {
    this.state.myscroll.scrollTo(0, -100,1000)
  };

  render() {
    const {myprograms, loading} = this.props;
    const {tags} = myprograms;
    const listItems = tags.map((tags) =>
      <Timeline.Item color={tags.color} style={{height: '100px'}}>
        <p>
          {tags.program_name}
          <br></br>
          {tags.program_title}
        </p>

        <Radio.Group onChange={this.onChange} value={parseInt(tags.values)}>
          <Radio value={parseInt(tags.nums)*2}>正确</Radio>
          <Radio value={parseInt(tags.nums)*2+1}>错误</Radio>

        </Radio.Group>
      </Timeline.Item>
    );
    return (
      <div>
        <Button type="primary" className={styles.button} onClick={this.onClick}>复位</Button>
        <div className="wrapper" style={{ padding: 24, background: '#e6f7ff', height: 800 ,overflow: "scroll"}}>
          <Timeline className="content">
            {listItems}
          </Timeline>
        </div>
      </div>


    );
  }
}

export default Myprogram;
