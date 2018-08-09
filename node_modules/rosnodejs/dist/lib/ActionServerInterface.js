/*
 *    Copyright 2017 Rethink Robotics
 *
 *    Copyright 2017 Chris Smith
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var timeUtils = require('../utils/time_utils.js');
var msgUtils = require('../utils/message_utils.js');
var EventEmitter = require('events');

var GoalID = null;
var goalCount = 0;

var ActionServerInterface = function (_EventEmitter) {
  _inherits(ActionServerInterface, _EventEmitter);

  function ActionServerInterface(options) {
    _classCallCheck(this, ActionServerInterface);

    var _this = _possibleConstructorReturn(this, (ActionServerInterface.__proto__ || Object.getPrototypeOf(ActionServerInterface)).call(this));

    if (GoalID === null) {
      GoalID = msgUtils.requireMsgPackage('actionlib_msgs').msg.GoalID;
    }

    _this._actionType = options.type;

    _this._actionServer = options.actionServer;

    var nh = options.nh;
    _this._nh = nh;

    var goalOptions = Object.assign({ queueSize: 50 }, options.goal);
    _this._goalSub = nh.subscribe(_this._actionServer + '/goal', _this._actionType + 'ActionGoal', function (msg) {
      _this._handleGoal(msg);
    }, goalOptions);

    var cancelOptions = Object.assign({ queueSize: 50 }, options.cancel);
    _this._cancelSub = nh.subscribe(_this._actionServer + '/cancel', 'actionlib_msgs/GoalID', function (msg) {
      _this._handleCancel(msg);
    }, cancelOptions);

    var statusOptions = Object.assign({ queueSize: 50 }, options.status);
    _this._statusPub = nh.advertise(_this._actionServer + '/status', 'actionlib_msgs/GoalStatusArray', statusOptions);

    var feedbackOptions = Object.assign({ queueSize: 50 }, options.feedback);
    _this._feedbackPub = nh.advertise(_this._actionServer + '/feedback', _this._actionType + 'ActionFeedback', feedbackOptions);

    var resultOptions = Object.assign({ queueSize: 50 }, options.result);
    _this._resultPub = nh.advertise(_this._actionServer + '/result', _this._actionType + 'ActionResult', resultOptions);
    return _this;
  }

  _createClass(ActionServerInterface, [{
    key: 'getType',
    value: function getType() {
      return this._actionType;
    }
  }, {
    key: 'generateGoalId',
    value: function generateGoalId() {
      var now = timeUtils.now();
      return new GoalID({
        id: this._nh.getNodeName() + '-' + goalCount++ + '-' + now.sec + '.' + now.nsec,
        stamp: now
      });
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
      return Promise.all([this._goalSub.shutdown(), this._cancelSub.shutdown(), this._statusPub.shutdown(), this._feedbackPub.shutdown(), this._resultPub.shutdown()]);
    }
  }, {
    key: '_handleGoal',
    value: function _handleGoal(msg) {
      this.emit('goal', msg);
    }
  }, {
    key: '_handleCancel',
    value: function _handleCancel(msg) {
      this.emit('cancel', msg);
    }
  }, {
    key: 'publishResult',
    value: function publishResult(resultMsg) {
      this._resultPub.publish(resultMsg);
    }
  }, {
    key: 'publishFeedback',
    value: function publishFeedback(feedbackMsg) {
      this._feedbackPub.publish(feedbackMsg);
    }
  }, {
    key: 'publishStatus',
    value: function publishStatus(statusMsg) {
      this._statusPub.publish(statusMsg);
    }
  }]);

  return ActionServerInterface;
}(EventEmitter);

module.exports = ActionServerInterface;