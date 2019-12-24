import {connect} from 'dva';
import React, {Component} from 'react';
import {Timeline,Radio,Button} from 'antd';
import BScroll from '@better-scroll/core'
import styles from './Users.css';

@connect(({myprogramsmysql, loading}) => ({
  myprogramsmysql,
  loading: loading.models.myprogramsmysql,
}))

class MyprogramMysql extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'myprogramsmysql/fetchTags',
      payload: 1,
    });

  }
  componentDidUpdate(){
    const content = document.querySelector('.wrappermysql');
    let scroll = new BScroll(content);
    // console.log(scroll,'scroll');
  }
  onChange = e => {
    console.log('radio checked', e.target.value);
    const {dispatch} = this.props;
    const  id  = e.target.value;
    dispatch({
      type: 'myprogramsmysql/changeStates',
      payload: id,
    });
  };

  render() {
    const {myprogramsmysql, loading} = this.props;
    const {tags} = myprogramsmysql;

    const listItems = tags.map((tags) =>
      <Timeline.Item color={tags.color}  style={{height: '100px'}} >
        <p>
          {tags.program_name}
          <br></br>

          {tags.program_datetime}
          <br></br>

          {tags.program_title}
        </p>
      </Timeline.Item>

    );
    return (
      <div>
        <Button type="primary" className={styles.button}>复位</Button>
        <div className="wrappermysql" style={{ padding: 24, background: '#e6f7ff', height: 800 ,overflow: "scroll"}}>
          <Timeline className="content">
            {listItems}
          </Timeline>
        </div>
      </div>
    );
  }
}

export default MyprogramMysql;
