/*
 *    Copyright 2016 Rethink Robotics
 *
 *    Copyright 2016 Chris Smith
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

var NSEC_TO_SEC = 1e-9;
var USEC_TO_SEC = 1e-6;
var MSEC_TO_SEC = 1e-3;

module.exports = {
  rosTimeToDate: function rosTimeToDate(rosTime) {
    var date = new Date();
    // setTime takes in ms since epoch
    date.setTime(rosTime.secs * 1000 + Math.floor(rosTime.nsecs * USEC_TO_SEC));
    return date;
  },
  dateToRosTime: function dateToRosTime(date) {
    var secs = Math.floor(date * MSEC_TO_SEC);
    var nsecs = date % 1000 * 1000000;
    return { 'secs': secs, 'nsecs': nsecs };
  },
  now: function now() {
    return this.dateToRosTime(Date.now());
  },
  epoch: function epoch() {
    return {
      secs: 0,
      nsecs: 0
    };
  },
  isZeroTime: function isZeroTime(t) {
    return t.secs === 0 && t.nsecs === 0;
  },
  toNumber: function toNumber(t) {
    return this.toSeconds(t);
  },
  toSeconds: function toSeconds(t) {
    return t.secs + t.nsecs * NSEC_TO_SEC;
  },
  timeComp: function timeComp(a, b) {
    return Math.sign(this.toNumber(a) - this.toNumber(b));
  }
};