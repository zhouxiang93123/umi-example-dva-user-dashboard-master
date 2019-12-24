import { connect } from 'dva';
import { Component } from 'react';
import { Timeline } from 'antd';

@connect(({ myprograms, loading }) => ({
  myprograms,
  loading: loading.models.myprograms,
}))

class Myprogram extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    console.log("sss")
    dispatch({
      type: 'myprograms/fetchTags',
      payload: 1,
    });
  }

    render() {
      const { myprograms, loading } = this.props;
    const { tags } = myprograms;
    const listItems = tags.map((tags) =>
      <Timeline.Item color={tags.color} >
        <p>
          {tags.program_name}
          <br></br>
          {tags.program_title}
        </p>
      </Timeline.Item>
    );
      return (
          <Timeline>
            {listItems}
          </Timeline>
      );
    }
  }

export default Myprogram;