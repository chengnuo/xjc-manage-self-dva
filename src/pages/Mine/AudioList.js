import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select,
  Upload,
  Tag,
} from 'antd';

const { Option } = Select;

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';


const FormItem = Form.Item;
const { Search, TextArea } = Input;
// 音频类
import { apiLocation } from '@/utils/utils';


import './selected.js'

@connect(({ minePlan, loading }) => ({
  minePlan,
  loading: loading.models.list,
}))
@Form.create()
class BasicList extends PureComponent {
  state = {
    visible: false,
    done: false,
    imageUrl: '',
  };

  componentDidMount() {
    console.log('1')
    // let m = document.getElementsByTagName('audio')[0];
    // m.play(); //歌曲的播放
    window.audioLoad();
  }


  render() {

    return (
      <PageHeaderWrapper>
        测试
        {/*<audio src={taHeTa} id="audio" controls="controls">Your browser does not support the audio element.</audio>*/}
        <div className="audioList">
          <div id="player">
            <audio controls id="audio">!audio not supported :(</audio>
          </div>
          <div id="playlist">
            <div id="playlistLayout"></div>
            <div className="info">
              {/*<div className="bg" id="bg_dark" title="use color for background"></div>*/}
              {/*<div className="bg" id="bg_pic" title="use image for background"></div>*/}
              {/*<small> view on <a target="_blank" href="https://github.com/wayou/selected/">GitHub</a></small>*/}
            </div>
          </div>
          <div id="lyricWrapper">
            <div id="lyricContainer">
            </div>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default BasicList;
