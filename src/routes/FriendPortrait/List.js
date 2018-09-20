import React, { PureComponent } from 'react';
import { Card, Col, Row } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import xujunchao from './../../assets/images/xujunchao.jpeg'; // xujunchao

const { Meta } = Card;



export default class Test extends PureComponent {

  render() {

    return (
      <div>
        <PageHeaderLayout>
          <Row gutter={16}>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={xujunchao} />}
              >
                <Meta
                  title="许俊超"
                  description="1号画像"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={xujunchao} />}
              >
                <Meta
                  title="许俊超"
                  description="1号画像"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={xujunchao} />}
              >
                <Meta
                  title="许俊超"
                  description="1号画像"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={xujunchao} />}
              >
                <Meta
                  title="许俊超"
                  description="1号画像"
                />
              </Card>
            </Col>
          </Row>


        </PageHeaderLayout>
      </div>
    );
  }
}
