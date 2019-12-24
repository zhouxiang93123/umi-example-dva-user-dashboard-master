import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button ,Card,Row,Col,Badge} from 'antd';
import { routerRedux, Redirect } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../constants';
import UserModal from './UserModal';
import React from 'react';
import { Timeline } from 'antd';
import Clock from './Clock';
import Myprogram from './Myprogram';
import MyprogramMysql from "./MyprogramMysql";
function Users({ dispatch, list: dataSource,programe, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page },
    }));
  }

  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>

      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOk={createHandler}>
            <Button type="primary">Create User</Button>
          </UserModal>
        </div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />

          <React.Fragment>
            <Row gutter={24}>
              <Col xl={7} lg={24} md={24} sm={24} xs={24}>
                <Clock name="系统时间"/>
                <h2 className={styles.title}>
                  网上节目表
                </h2>
                <div className={styles.badge}>
                  <Badge status="processing" text="一般" />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Badge status="success" text="安全" />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Badge status="error" text="严重危害" />
                </div>
                  <div className={styles.time}>
                    <div id="components-timeline-demo-color">
                      <MyprogramMysql/>
                    </div>
                  </div>
              </Col>
              <Col xl={7} lg={24} md={24} sm={24} xs={24}>
                <Clock name="节目时间"/>
                <h2 className={styles.title}>
                  实时节目表
                </h2>
                <div className={styles.badge}>
                  <Badge status="processing" text="一般" />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Badge status="success" text="安全" />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Badge status="error" text="严重危害" />
                </div>
                  <div className={styles.time}>
                    <div id="components-timeline-demo-color">
                      <Myprogram/>
                    </div>
                  </div>
              </Col>

            </Row>

          </React.Fragment>


      </div>

    </div>

  );
}

function mapStateToProps(state) {
  const { list,programe, total, page } = state.users;
  return {
    list,
    programe,
    total,
    page,
    loading: state.loading.models.users,
  };
}

export default connect(mapStateToProps)(Users);
